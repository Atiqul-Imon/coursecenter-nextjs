import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

// Simple file upload handler - in production, use cloud storage (S3, Cloudinary, etc.)
async function saveImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Create uploads directory if it doesn't exist
  const uploadsDir = join(process.cwd(), "public", "uploads", "applications")
  if (!existsSync(uploadsDir)) {
    await mkdir(uploadsDir, { recursive: true })
  }

  // Generate unique filename
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  const extension = file.name.split(".").pop()
  const filename = `${timestamp}-${randomString}.${extension}`
  const filepath = join(uploadsDir, filename)

  // Save file
  await writeFile(filepath, buffer)

  // Return public URL
  return `/uploads/applications/${filename}`
}

export async function POST(request: NextRequest) {
  try {
    // Get auth token from header
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    
    // Verify JWT token
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    
    const courseId = formData.get("courseId") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const personalStatement = formData.get("personalStatement") as string
    const intakeMonth = formData.get("intakeMonth") as string
    const intakeYear = parseInt(formData.get("intakeYear") as string)
    const imageFile = formData.get("image") as File | null

    // Validate required fields
    if (!courseId || !firstName || !lastName || !email || !phone || !personalStatement || !intakeMonth || !intakeYear) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Get user from token
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Verify email matches
    if (user.email !== email) {
      return NextResponse.json(
        { error: "Email mismatch" },
        { status: 400 }
      )
    }

    // Verify course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    })

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      )
    }

    // Save image if provided
    let imageUrl: string | null = null
    if (imageFile) {
      imageUrl = await saveImage(imageFile)
    }

    // Create application
    const application = await prisma.application.create({
      data: {
        studentId: user.id,
        courseId: course.id,
        personalStatement,
        intakeMonth,
        intakeYear,
        status: "PENDING",
        submittedAt: new Date(),
      },
    })

    // Create document entry for the image if provided
    if (imageUrl) {
      await prisma.document.create({
        data: {
          applicationId: application.id,
          type: "OTHER",
          fileName: imageFile!.name,
          fileUrl: imageUrl,
          fileSize: imageFile!.size,
          mimeType: imageFile!.type,
        },
      })
    }

    return NextResponse.json({
      success: true,
      application: {
        id: application.id,
        status: application.status,
      },
    })
  } catch (error) {
    console.error("Error creating application:", error)
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    )
  }
}

