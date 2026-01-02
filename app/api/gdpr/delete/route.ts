import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const { email, confirm } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    if (confirm !== "DELETE") {
      return NextResponse.json(
        { error: "Please type 'DELETE' to confirm data deletion" },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Create GDPR request record first
    const verificationToken = crypto.randomBytes(32).toString("hex")
    const gdprRequest = await prisma.gDPRRequest.create({
      data: {
        requestType: "deletion",
        email,
        userId: user?.id || null,
        status: "PROCESSING",
        verified: false,
        verificationToken,
      },
    })

    // Delete user data (cascade will handle related records)
    if (user) {
      // Delete user (cascade will delete student, admin, applications, etc.)
      await prisma.user.delete({
        where: { id: user.id },
      })
    }

    // Delete applicants by email
    await prisma.applicant.deleteMany({
      where: { email },
    })

    // Delete consent records
    await prisma.consentRecord.deleteMany({
      where: { email },
    })

    // Update GDPR request as completed
    await prisma.gDPRRequest.update({
      where: { id: gdprRequest.id },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
        verified: true,
        responseData: {
          deleted: true,
          deletedAt: new Date().toISOString(),
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: "Your data has been deleted successfully. This action cannot be undone.",
    })
  } catch (error) {
    console.error("Error deleting user data:", error)
    return NextResponse.json(
      { error: "Failed to delete data. Please try again." },
      { status: 500 }
    )
  }
}


