import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/db"
import { BarChart3, TrendingUp, Users, BookOpen, FileText, Calendar } from "lucide-react"

async function getAnalytics() {
  try {
    const [
      totalUsers,
      totalCourses,
      totalApplicants,
      totalConsultations,
      activeCourses,
      pendingApplicants,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.course.count(),
      prisma.applicant.count(),
      prisma.consultation.count(),
      prisma.course.count({ where: { isActive: true } }),
      prisma.applicant.count({ where: { status: "PENDING" } }),
    ])

    // Get recent activity
    const recentApplicants = await prisma.applicant.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        course: {
          include: {
            university: true,
          },
        },
      },
    })
    
    // Fetch preferred course and university names
    const applicantsWithPreferences = await Promise.all(
      recentApplicants.map(async (applicant) => {
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

    return {
      totalUsers,
      totalCourses,
      totalApplicants,
      totalConsultations,
      activeCourses,
      pendingApplicants,
      recentApplicants: applicantsWithPreferences,
    }
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return {
      totalUsers: 0,
      totalCourses: 0,
      totalApplicants: 0,
      totalConsultations: 0,
      activeCourses: 0,
      pendingApplicants: 0,
      recentApplicants: [],
    }
  }
}

export default async function AnalyticsPage() {
  const analytics = await getAnalytics()

  const stats = [
    {
      title: "Total Users",
      value: analytics.totalUsers,
      icon: Users,
      change: "+12%",
      trend: "up",
    },
    {
      title: "Total Courses",
      value: analytics.totalCourses,
      icon: BookOpen,
      change: "+5",
      trend: "up",
    },
    {
      title: "Active Courses",
      value: analytics.activeCourses,
      icon: BookOpen,
      change: `${analytics.totalCourses - analytics.activeCourses} inactive`,
      trend: "neutral",
    },
    {
      title: "Total Applicants",
      value: analytics.totalApplicants,
      icon: FileText,
      change: `${analytics.pendingApplicants} pending`,
      trend: "up",
    },
    {
      title: "Consultations",
      value: analytics.totalConsultations,
      icon: Calendar,
      change: "+15%",
      trend: "up",
    },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Comprehensive insights into your platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center gap-1 mt-2">
                  {stat.trend === "up" && (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  )}
                  <span
                    className={`text-xs ${
                      stat.trend === "up"
                        ? "text-green-600"
                        : stat.trend === "down"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>Latest applicant submissions</CardDescription>
        </CardHeader>
        <CardContent>
          {analytics.recentApplicants.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No recent applications
            </div>
          ) : (
            <div className="space-y-4">
              {analytics.recentApplicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {applicant.firstName} {applicant.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {(applicant as any).preferredCourseName || applicant.course?.title || "Not specified"}
                    </p>
                    {((applicant as any).preferredUniversityName || applicant.course?.university) && (
                      <p className="text-xs text-gray-500 mt-1">
                        {(applicant as any).preferredUniversityName || applicant.course?.university?.name}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        applicant.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : applicant.status === "APPROVED"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {applicant.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(applicant.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

