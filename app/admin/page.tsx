import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/empty-state"
import { prisma } from "@/lib/db"
import { FileText, Calendar, BookOpen, Users, ArrowRight, Plus, Eye } from "lucide-react"
import { AdminStatCard } from "@/components/admin/AdminStatCard"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

async function getStats() {
  try {
    const [users, courses, applicants, consultations] = await Promise.all([
      prisma.user.count(),
      prisma.course.count({ where: { isActive: true } }),
      prisma.applicant.count(),
      prisma.consultation.count(),
    ])

    const pendingApplicants = await prisma.applicant.count({
      where: { status: "PENDING" },
    })

    const upcomingConsultations = await prisma.consultation.count({
      where: {
        status: { in: ["SCHEDULED", "CONFIRMED"] },
        scheduledAt: { gte: new Date() },
      },
    })

    return {
      users,
      courses,
      applicants,
      consultations,
      pendingApplicants,
      upcomingConsultations,
    }
  } catch (error) {
    console.error("Error fetching stats:", error)
    return {
      users: 0,
      courses: 0,
      applicants: 0,
      consultations: 0,
      pendingApplicants: 0,
      upcomingConsultations: 0,
    }
  }
}

async function getRecentApplicants() {
  try {
    const applicants = await prisma.applicant.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        course: {
          select: {
            title: true,
            slug: true,
          },
        },
      },
    })
    return applicants
  } catch (error) {
    console.error("Error fetching recent applicants:", error)
    return []
  }
}

async function getUpcomingConsultations() {
  try {
    const consultations = await prisma.consultation.findMany({
      take: 5,
      where: {
        scheduledAt: { gte: new Date() },
        status: { in: ["SCHEDULED", "CONFIRMED"] },
      },
      orderBy: { scheduledAt: "asc" },
      include: {
        student: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })
    return consultations
  } catch (error) {
    console.error("Error fetching upcoming consultations:", error)
    return []
  }
}

async function getRecentCourses() {
  try {
    const courses = await prisma.course.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        level: true,
        isActive: true,
        createdAt: true,
        _count: {
          select: { applications: true },
        },
      },
    })
    return courses
  } catch (error) {
    console.error("Error fetching recent courses:", error)
    return []
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "APPROVED":
    case "ACCEPTED":
      return "bg-green-100 text-green-800 border-green-300"
    case "REJECTED":
      return "bg-red-100 text-red-800 border-red-300"
    case "PENDING":
    case "UNDER_REVIEW":
      return "bg-yellow-100 text-yellow-800 border-yellow-300"
    default:
      return "bg-gray-100 text-gray-800 border-gray-300"
  }
}

function getConsultationStatusColor(status: string) {
  switch (status) {
    case "CONFIRMED":
      return "bg-green-100 text-green-800 border-green-300"
    case "SCHEDULED":
      return "bg-blue-100 text-blue-800 border-blue-300"
    case "COMPLETED":
      return "bg-gray-100 text-gray-800 border-gray-300"
    case "CANCELLED":
      return "bg-red-100 text-red-800 border-red-300"
    default:
      return "bg-gray-100 text-gray-800 border-gray-300"
  }
}

export default async function AdminDashboard() {
  const [stats, recentApplicants, upcomingConsultations, recentCourses] = await Promise.all([
    getStats(),
    getRecentApplicants(),
    getUpcomingConsultations(),
    getRecentCourses(),
  ])

  const statCards = [
    {
      title: "Total Users",
      value: stats.users,
      description: "Registered users",
      iconName: "Users",
      color: "text-[#1E3A8A]",
      bgColor: "bg-[#1E3A8A]/10",
    },
    {
      title: "Active Courses",
      value: stats.courses,
      description: "Available courses",
      iconName: "BookOpen",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Applicants",
      value: stats.applicants,
      description: `${stats.pendingApplicants} pending`,
      iconName: "FileText",
      color: "text-[#F59E0B]",
      bgColor: "bg-[#F59E0B]/10",
    },
    {
      title: "Consultations",
      value: stats.consultations,
      description: `${stats.upcomingConsultations} upcoming`,
      iconName: "Calendar",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Welcome back! Here's an overview of your platform.</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <AdminStatCard key={stat.title} stat={stat} index={index} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Button asChild variant="outline" className="h-auto py-4 border-gray-300 min-h-[44px]">
          <Link href="/admin/courses/new" className="flex flex-col items-center gap-2">
            <Plus className="h-5 w-5 text-[#1E3A8A]" />
            <span className="font-semibold text-gray-900">New Course</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-4 border-gray-300 min-h-[44px]">
          <Link href="/admin/applications" className="flex flex-col items-center gap-2">
            <FileText className="h-5 w-5 text-[#1E3A8A]" />
            <span className="font-semibold text-gray-900">View Applications</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-4 border-gray-300 min-h-[44px]">
          <Link href="/admin/consultations" className="flex flex-col items-center gap-2">
            <Calendar className="h-5 w-5 text-[#1E3A8A]" />
            <span className="font-semibold text-gray-900">Consultations</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-4 border-gray-300 min-h-[44px]">
          <Link href="/admin/analytics" className="flex flex-col items-center gap-2">
            <Users className="h-5 w-5 text-[#1E3A8A]" />
            <span className="font-semibold text-gray-900">Analytics</span>
          </Link>
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Applicants */}
        <Card className="border-gray-300 shadow-lg">
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">Recent Applicants</CardTitle>
                <CardDescription className="text-xs sm:text-sm text-gray-600 mt-1">
                  Latest application submissions
                </CardDescription>
              </div>
              {recentApplicants.length > 0 && (
                <Button asChild variant="ghost" size="sm" className="text-[#1E3A8A] hover:text-[#1E40AF] min-h-[44px]">
                  <Link href="/admin/applications">
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {recentApplicants.length === 0 ? (
              <div className="py-12 text-center px-4">
                <EmptyState
                  icon={FileText}
                  title="No applicants yet"
                  description="Applicants will appear here once they start submitting applications."
                />
                <Button asChild className="mt-4 min-h-[44px] bg-[#F59E0B] hover:bg-[#D97706] text-white">
                  <Link href="/admin/applications">
                    View Applications
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {recentApplicants.map((applicant) => (
                  <Link
                    key={applicant.id}
                    href={`/admin/applications/${applicant.id}`}
                    className="block p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {applicant.firstName} {applicant.lastName}
                          </p>
                          <Badge
                            variant="outline"
                            className={`text-xs ${getStatusColor(applicant.status)}`}
                          >
                            {applicant.status}
                          </Badge>
                        </div>
                        {applicant.course && (
                          <p className="text-xs text-gray-600 truncate">{applicant.course.title}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">{formatDate(applicant.createdAt)}</p>
                      </div>
                      <Eye className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Consultations */}
        <Card className="border-gray-300 shadow-lg">
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">Upcoming Consultations</CardTitle>
                <CardDescription className="text-xs sm:text-sm text-gray-600 mt-1">
                  Scheduled consultation sessions
                </CardDescription>
              </div>
              {upcomingConsultations.length > 0 && (
                <Button asChild variant="ghost" size="sm" className="text-[#1E3A8A] hover:text-[#1E40AF] min-h-[44px]">
                  <Link href="/admin/consultations">
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {upcomingConsultations.length === 0 ? (
              <div className="py-12 text-center px-4">
                <EmptyState
                  icon={Calendar}
                  title="No consultations scheduled"
                  description="Consultations will appear here once students book sessions."
                />
                <Button asChild className="mt-4 min-h-[44px] bg-[#F59E0B] hover:bg-[#D97706] text-white">
                  <Link href="/admin/consultations">
                    View Consultations
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {upcomingConsultations.map((consultation) => (
                  <Link
                    key={consultation.id}
                    href={`/admin/consultations`}
                    className="block p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {consultation.student?.name || consultation.student?.email || "Unknown"}
                          </p>
                          <Badge
                            variant="outline"
                            className={`text-xs ${getConsultationStatusColor(consultation.status)}`}
                          >
                            {consultation.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">
                          {consultation.scheduledAt
                            ? formatDate(consultation.scheduledAt)
                            : "Date TBD"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{consultation.type || "General"}</p>
                      </div>
                      <Eye className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Courses */}
      {recentCourses.length > 0 && (
        <Card className="border-gray-300 shadow-lg">
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">Recent Courses</CardTitle>
                <CardDescription className="text-xs sm:text-sm text-gray-600 mt-1">
                  Latest course additions
                </CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm" className="text-[#1E3A8A] hover:text-[#1E40AF] min-h-[44px]">
                <Link href="/admin/courses">
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {recentCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/admin/courses/${course.id}/edit`}
                  className="block p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-gray-900 truncate">{course.title}</p>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            course.isActive
                              ? "bg-green-100 text-green-800 border-green-300"
                              : "bg-gray-100 text-gray-600 border-gray-300"
                          }`}
                        >
                          {course.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">
                          {course.level}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-xs text-gray-600">
                          {course._count.applications} application{course._count.applications !== 1 ? "s" : ""}
                        </p>
                        <p className="text-xs text-gray-500">{formatDate(course.createdAt)}</p>
                      </div>
                    </div>
                    <Eye className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
