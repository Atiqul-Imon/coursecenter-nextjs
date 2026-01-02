import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { uploadImage, getFileIdFromUrl, deleteImage } from "@/lib/imagekit"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        university: true,
        categories: true,
      },
    })

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(course)
  } catch (error) {
    console.error("Error fetching course:", error)
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const formData = await request.formData()

    // Check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id },
    })

    if (!existingCourse) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      )
    }

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
    const removeImage = formData.get("removeImage") === "true"

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
    
    // Check if slug already exists (excluding current course)
    if (slug !== existingCourse.slug) {
      const slugExists = await prisma.course.findUnique({
        where: { slug },
      })

      if (slugExists) {
        return NextResponse.json(
          { error: "A course with this title already exists" },
          { status: 400 }
        )
      }
    }

    // Handle image upload/removal
    let finalImageUrl: string | null = existingCourse.image

    if (removeImage && existingCourse.image) {
      // Delete old image from ImageKit
      const fileId = await getFileIdFromUrl(existingCourse.image)
      if (fileId) {
        try {
          await deleteImage(fileId)
        } catch (error) {
          console.error("Error deleting old image:", error)
        }
      }
      finalImageUrl = null
    } else if (imageFile) {
      // Delete old image if exists
      if (existingCourse.image) {
        const fileId = await getFileIdFromUrl(existingCourse.image)
        if (fileId) {
          try {
            await deleteImage(fileId)
          } catch (error) {
            console.error("Error deleting old image:", error)
          }
        }
      }
      // Upload new image
      finalImageUrl = await uploadImage(imageFile, "courses")
    } else if (imageUrl && imageUrl !== existingCourse.image) {
      // Image URL provided (already uploaded to ImageKit)
      finalImageUrl = imageUrl
    }

    // Update course
    const course = await prisma.course.update({
      where: { id },
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

    // Update categories
    // Delete existing categories
    await prisma.courseCategory.deleteMany({
      where: { courseId: id },
    })

    // Create new categories
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

    // Fetch updated course with relations
    const updatedCourse = await prisma.course.findUnique({
      where: { id: course.id },
      include: {
        university: true,
        categories: true,
      },
    })

    return NextResponse.json({
      success: true,
      course: updatedCourse,
    })
  } catch (error) {
    console.error("Error updating course:", error)
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id },
    })

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      )
    }

    // Delete image from ImageKit if exists
    if (course.image) {
      const fileId = await getFileIdFromUrl(course.image)
      if (fileId) {
        try {
          await deleteImage(fileId)
        } catch (error) {
          console.error("Error deleting image:", error)
        }
      }
    }

    // Delete course (categories will be deleted automatically due to cascade)
    await prisma.course.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting course:", error)
    return NextResponse.json(
      { error: "Failed to delete course" },
      { status: 500 }
    )
  }
}

