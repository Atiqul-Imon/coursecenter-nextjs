import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { uploadImage } from "@/lib/imagekit"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const courseId = formData.get("courseId") as string | null
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const preferredCourse = formData.get("preferredCourse") as string | null
    const preferredUniversity = formData.get("preferredUniversity") as string | null
    const marketingConsent = formData.get("marketingConsent") === "true"
    const privacyConsent = formData.get("privacyConsent") === "true"
    const imageFile = formData.get("image") as File | null

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !preferredCourse || !preferredUniversity) {
      return NextResponse.json(
        { message: "All required fields must be filled" },
        { status: 400 }
      )
    }

    if (!privacyConsent) {
      return NextResponse.json(
        { message: "You must agree to the Privacy Policy" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      )
    }

    // Verify course exists if courseId is provided
    if (courseId) {
      const course = await prisma.course.findUnique({
        where: { id: courseId },
      })

      if (!course) {
        return NextResponse.json(
          { message: "Course not found" },
          { status: 404 }
        )
      }
    }

    // Verify preferred course exists
    if (preferredCourse) {
      const course = await prisma.course.findUnique({
        where: { id: preferredCourse },
      })

      if (!course) {
        return NextResponse.json(
          { message: "Preferred course not found" },
          { status: 404 }
        )
      }
    }

    // Verify preferred university exists
    if (preferredUniversity) {
      const university = await prisma.university.findUnique({
        where: { id: preferredUniversity },
      })

      if (!university) {
        return NextResponse.json(
          { message: "Preferred university not found" },
          { status: 404 }
        )
      }
    }

    // Upload image to ImageKit if provided
    let imageUrl: string | null = null
    if (imageFile) {
      try {
        imageUrl = await uploadImage(imageFile, "applicants")
      } catch (error) {
        console.error("Error uploading image:", error)
        // Continue without image if upload fails
      }
    }

    // Create applicant
    const applicant = await prisma.applicant.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        courseId: courseId || null,
        preferredCourse: preferredCourse || null,
        preferredUniversity: preferredUniversity || null,
        marketingConsent,
        privacyConsent,
        imageUrl,
        status: "PENDING",
      },
    })

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully!",
      applicant: {
        id: applicant.id,
        status: applicant.status,
      },
    }, { status: 201 })
  } catch (error) {
    console.error("Error creating applicant:", error)
    return NextResponse.json(
      { message: "Failed to submit application. Please try again." },
      { status: 500 }
    )
  }
}
