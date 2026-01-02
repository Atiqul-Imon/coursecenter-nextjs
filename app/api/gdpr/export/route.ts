import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        student: true,
        admin: true,
        applications: {
          include: {
            course: {
              include: {
                university: true,
              },
            },
          },
        },
        consultations: true,
        messagesFrom: true,
        messagesTo: true,
      },
    })

    // Find applicants by email
    const applicants = await prisma.applicant.findMany({
      where: { email },
      include: {
        course: {
          include: {
            university: true,
          },
        },
      },
    })

    // Find consent records
    const consents = await prisma.consentRecord.findMany({
      where: { email },
      orderBy: { timestamp: "desc" },
    })

    // Compile all user data
    const userData = {
      personalInformation: user ? {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      } : null,
      studentProfile: user?.student || null,
      applications: user?.applications || [],
      applicants: applicants,
      consultations: user?.consultations || [],
      messages: {
        sent: user?.messagesFrom || [],
        received: user?.messagesTo || [],
      },
      consentHistory: consents,
      exportDate: new Date().toISOString(),
    }

    // Create GDPR request record
    const verificationToken = crypto.randomBytes(32).toString("hex")
    await prisma.gDPRRequest.create({
      data: {
        requestType: "access",
        email,
        userId: user?.id || null,
        status: "COMPLETED",
        completedAt: new Date(),
        verified: true,
        verificationToken,
        responseData: {
          exported: true,
          recordCount: {
            applications: user?.applications.length || 0,
            applicants: applicants.length,
            consultations: user?.consultations.length || 0,
            messages: (user?.messagesFrom.length || 0) + (user?.messagesTo.length || 0),
            consents: consents.length,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: userData,
      message: "Your data has been exported successfully.",
    })
  } catch (error) {
    console.error("Error exporting user data:", error)
    return NextResponse.json(
      { error: "Failed to export data. Please try again." },
      { status: 500 }
    )
  }
}

