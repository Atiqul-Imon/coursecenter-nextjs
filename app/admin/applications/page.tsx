import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/db"
import { formatDate } from "@/lib/utils"
import { Eye, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

async function getApplicants() {
  try {
    const applicants = await prisma.applicant.findMany({
      include: {
        course: {
          include: {
            university: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })
    
    // Fetch preferred course and university names
    const applicantsWithPreferences = await Promise.all(
      applicants.map(async (applicant) => {
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
      })
    )
    
    return applicantsWithPreferences
  } catch (error) {
    console.error("Error fetching applicants:", error)
    return []
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

export default async function AdminApplicationsPage() {
  const applicants = await getApplicants()

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Applicants</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Review and manage all course applications</p>
      </div>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">All Applicants ({applicants.length})</CardTitle>
          <CardDescription className="text-xs sm:text-sm">View and manage course applications</CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          {applicants.length === 0 ? (
            <div className="py-8 sm:py-12 text-center px-4">
              <p className="text-sm sm:text-base text-muted-foreground">No applications found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[150px]">Applicant</TableHead>
                      <TableHead className="min-w-[150px]">Contact</TableHead>
                      <TableHead className="min-w-[150px]">Preferred Course</TableHead>
                      <TableHead className="min-w-[150px]">Preferred University</TableHead>
                      <TableHead className="min-w-[100px]">Status</TableHead>
                      <TableHead className="min-w-[80px]">Image</TableHead>
                      <TableHead className="min-w-[100px]">Submitted</TableHead>
                      <TableHead className="text-right min-w-[120px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicants.map((applicant) => (
                      <TableRow key={applicant.id}>
                        <TableCell className="min-w-[150px]">
                          <div className="font-medium text-sm sm:text-base">
                            {applicant.firstName} {applicant.lastName}
                          </div>
                        </TableCell>
                        <TableCell className="min-w-[150px]">
                          <div className="text-xs sm:text-sm">{applicant.email}</div>
                          <div className="text-xs sm:text-sm text-muted-foreground">{applicant.phone}</div>
                        </TableCell>
                        <TableCell className="font-medium text-xs sm:text-sm min-w-[150px]">
                          {(applicant as any).preferredCourseName || (applicant.course?.title) || "Not specified"}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm min-w-[150px]">
                          {(applicant as any).preferredUniversityName || (applicant.course?.university?.name) || "Not specified"}
                        </TableCell>
                        <TableCell className="min-w-[100px]">
                          <Badge variant={getStatusColor(applicant.status)} className="text-xs">
                            {applicant.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="min-w-[80px]">
                          {applicant.imageUrl ? (
                            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded overflow-hidden">
                              <Image
                                src={applicant.imageUrl}
                                alt={`${applicant.firstName} ${applicant.lastName}`}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>
                          ) : (
                            <span className="text-xs sm:text-sm text-muted-foreground">No image</span>
                          )}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm text-muted-foreground min-w-[100px]">
                          {formatDate(applicant.createdAt)}
                        </TableCell>
                        <TableCell className="text-right min-w-[120px]">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" asChild className="h-9 w-9 sm:h-10 sm:w-10 min-h-[44px] min-w-[44px]">
                              <Link href={`/admin/applications/${applicant.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            {applicant.imageUrl && (
                              <Button variant="ghost" size="icon" asChild className="h-9 w-9 sm:h-10 sm:w-10 min-h-[44px] min-w-[44px]">
                                <a href={applicant.imageUrl} download target="_blank" rel="noopener noreferrer">
                                  <Download className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

