import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/db"
import { formatDate } from "@/lib/utils"
import { ArrowLeft, Download, Mail, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

async function getApplicant(id: string) {
  try {
    const applicant = await prisma.applicant.findUnique({
      where: { id },
      include: {
        course: {
          include: {
            university: true,
          },
        },
      },
    })
    
    if (!applicant) return null
    
    // Fetch preferred course and university names
    let preferredCourseName = null
    let preferredUniversityName = null
    
    if (applicant.preferredCourse) {
      const course = await prisma.course.findUnique({
        where: { id: applicant.preferredCourse },
        select: { title: true },
      })
      preferredCourseName = course?.title || null
    }
    
    if (applicant.preferredUniversity) {
      const university = await prisma.university.findUnique({
        where: { id: applicant.preferredUniversity },
        select: { name: true },
      })
      preferredUniversityName = university?.name || null
    }
    
    return {
      ...applicant,
      preferredCourseName,
      preferredUniversityName,
    }
  } catch (error) {
    console.error("Error fetching applicant:", error)
    return null
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "APPROVED":
    case "ACCEPTED":
      return "default"
    case "REJECTED":
      return "destructive"
    case "PENDING":
    case "UNDER_REVIEW":
      return "secondary"
    default:
      return "outline"
  }
}

export default async function ApplicantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const applicant = await getApplicant(id)

  if (!applicant) {
    notFound()
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/applications">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Applicant Details</h1>
          <p className="text-muted-foreground">View complete application information</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Full Name</label>
              <p className="text-lg font-semibold">
                {applicant.firstName} {applicant.lastName}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${applicant.email}`} className="text-blue-600 hover:underline">
                  {applicant.email}
                </a>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${applicant.phone}`} className="text-blue-600 hover:underline">
                  {applicant.phone}
                </a>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <div className="mt-1">
                <Badge variant={getStatusColor(applicant.status)}>
                  {applicant.status}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Submitted</label>
              <p>{formatDate(applicant.createdAt)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Course & University Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Course & University Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Preferred Course</label>
              <p className="text-lg font-semibold">
                {(applicant as any).preferredCourseName || (applicant.course?.title) || "Not specified"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Preferred University</label>
              <p>
                {(applicant as any).preferredUniversityName || (applicant.course?.university?.name) || "Not specified"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Marketing Consent</label>
              <p>
                <Badge variant={applicant.marketingConsent ? "default" : "outline"}>
                  {applicant.marketingConsent ? "Yes, I consent" : "No, I do not agree"}
                </Badge>
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Privacy Policy Consent</label>
              <p>
                <Badge variant={applicant.privacyConsent ? "default" : "destructive"}>
                  {applicant.privacyConsent ? "Agreed" : "Not Agreed"}
                </Badge>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Image */}
      {applicant.imageUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-96 rounded-lg overflow-hidden border">
              <Image
                src={applicant.imageUrl}
                alt={`${applicant.firstName} ${applicant.lastName}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            <div className="mt-4">
              <Button asChild>
                <a href={applicant.imageUrl} download target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Download Image
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notes Section (for admin to add notes) */}
      {applicant.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Admin Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{applicant.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

