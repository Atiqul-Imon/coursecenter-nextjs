import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { uploadImage } from "@/lib/imagekit"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export async function GET(request: NextRequest) {
  try {
    const courses = await prisma.course.findMany({
      where: { isActive: true },
      select: {
        id: true,
        title: true,
        slug: true,
        level: true,
        duration: true,
        image: true,
        shortDescription: true,
        isActive: true,
        university: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(courses)
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const shortDescription = formData.get("shortDescription") as string
    const universityId = formData.get("universityId") as string | null
    const level = formData.get("level") as string
    const duration = parseInt(formData.get("duration") as string)
    const tuitionFeeStr = formData.get("tuitionFee") as string
    const tuitionFee = tuitionFeeStr ? parseFloat(tuitionFeeStr) : null
    const currency = (formData.get("currency") as string) || "GBP"
    const intakeMonths = (formData.get("intakeMonths") as string)?.split(",").map(m => m.trim()).filter(Boolean) || []
    const entryRequirements = formData.get("entryRequirements") as string
    const language = (formData.get("language") as string) || "English"
    const isActive = formData.get("isActive") === "true"
    const categories = (formData.get("categories") as string)?.split(",").filter(Boolean) || []
    const imageFile = formData.get("image") as File | null
    const imageUrl = formData.get("imageUrl") as string | null

    // Validate required fields
    if (!title || !level || !duration) {
      return NextResponse.json(
        { error: "Title, level, and duration are required fields" },
        { status: 400 }
      )
    }

    // Check if university exists (if provided)
    if (universityId) {
      const university = await prisma.university.findUnique({
        where: { id: universityId },
      })

      if (!university) {
        return NextResponse.json(
          { error: "University not found" },
          { status: 404 }
        )
      }
    }

    // Generate slug
    const slug = slugify(title)
    
    // Check if slug already exists
    const existingCourse = await prisma.course.findUnique({
      where: { slug },
    })

    if (existingCourse) {
      return NextResponse.json(
        { error: "A course with this title already exists" },
        { status: 400 }
      )
    }

    // Handle image - either from file upload or already uploaded URL
    let finalImageUrl: string | null = null
    if (imageFile) {
      finalImageUrl = await uploadImage(imageFile, "courses")
    } else if (imageUrl) {
      finalImageUrl = imageUrl
    }

    // Create course
    const course = await prisma.course.create({
      data: {
        title,
        slug,
        description,
        shortDescription,
        universityId: universityId || null,
        level: level as any,
        duration,
        tuitionFee: tuitionFee || null,
        currency,
        intakeMonths,
        entryRequirements,
        language,
        image: finalImageUrl,
        isActive,
      },
    })

    // Create categories
    if (categories.length > 0) {
      await Promise.all(
        categories.map((category) =>
          prisma.courseCategory.create({
            data: {
              courseId: course.id,
              category: category.trim(),
            },
          })
        )
      )
    }

    // Fetch course with relations
    const createdCourse = await prisma.course.findUnique({
      where: { id: course.id },
      include: {
        university: true,
        categories: true,
      },
    })

    return NextResponse.json({
      success: true,
      course: createdCourse,
    })
  } catch (error) {
    console.error("Error creating course:", error)
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    )
  }
}

