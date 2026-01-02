import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const universities = await prisma.university.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
      },
    })

    return NextResponse.json(universities)
  } catch (error) {
    console.error("Error fetching universities:", error)
    return NextResponse.json(
      { error: "Failed to fetch universities" },
      { status: 500 }
    )
  }
}


