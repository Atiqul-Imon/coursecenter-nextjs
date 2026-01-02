import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/db"
import { AdminCoursesClient } from "./courses-client"
import { BookOpen, GraduationCap, FileText, TrendingUp } from "lucide-react"

async function getCoursesData() {
  try {
    const [courses, universities, stats] = await Promise.all([
      prisma.course.findMany({
        include: {
          university: true,
          categories: true,
          _count: {
            select: { applications: true },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.university.findMany({
        select: { id: true, name: true },
        orderBy: { name: "asc" },
      }),
      prisma.course.groupBy({
        by: ["isActive", "level"],
        _count: true,
      }),
    ])

    // Calculate statistics
    const totalCourses = courses.length
    const activeCourses = courses.filter((c) => c.isActive).length
    const totalApplications = courses.reduce((sum, c) => sum + c._count.applications, 0)
    
    const levelCounts = courses.reduce((acc, course) => {
      acc[course.level] = (acc[course.level] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      courses,
      universities,
      stats: {
        totalCourses,
        activeCourses,
        inactiveCourses: totalCourses - activeCourses,
        totalApplications,
        levelCounts,
      },
    }
  } catch (error) {
    console.error("Error fetching courses data:", error)
    return {
      courses: [],
      universities: [],
      stats: {
        totalCourses: 0,
        activeCourses: 0,
        inactiveCourses: 0,
        totalApplications: 0,
        levelCounts: {},
      },
    }
  }
}

export default async function AdminCoursesPage() {
  const { courses, universities, stats } = await getCoursesData()

  const statCards = [
    {
      title: "Total Courses",
      value: stats.totalCourses,
      description: `${stats.activeCourses} active`,
      icon: BookOpen,
      color: "text-[#1E3A8A]",
      bgColor: "bg-[#1E3A8A]/10",
    },
    {
      title: "Active Courses",
      value: stats.activeCourses,
      description: `${stats.inactiveCourses} inactive`,
      icon: GraduationCap,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Applications",
      value: stats.totalApplications,
      description: "Across all courses",
      icon: FileText,
      color: "text-[#F59E0B]",
      bgColor: "bg-[#F59E0B]/10",
    },
    {
      title: "Top Level",
      value: Object.keys(stats.levelCounts).length > 0
        ? Math.max(...Object.values(stats.levelCounts))
        : 0,
      description: Object.keys(stats.levelCounts).length > 0
        ? Object.entries(stats.levelCounts).sort(([, a], [, b]) => b - a)[0][0]
        : "No courses",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Courses</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage all courses and programs</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border-gray-300 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-gray-900">{stat.title}</CardTitle>
                <div className={`rounded-lg ${stat.bgColor} p-2`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Courses Table with Filters */}
      <AdminCoursesClient courses={courses} universities={universities} />
    </div>
  )
}
