import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/empty-state"
import { prisma } from "@/lib/db"
import { FileText, Calendar } from "lucide-react"
import { AdminStatCard } from "@/components/admin/AdminStatCard"

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

export default async function AdminDashboard() {
  const stats = await getStats()

  const statCards = [
    {
      title: "Total Users",
      value: stats.users,
      description: "Registered users",
      iconName: "Users",
      trend: "+12%",
    },
    {
      title: "Active Courses",
      value: stats.courses,
      description: "Available courses",
      iconName: "BookOpen",
      trend: "+5",
    },
    {
      title: "Applicants",
      value: stats.applicants,
      description: `${stats.pendingApplicants} pending`,
      iconName: "FileText",
      trend: "+8%",
    },
    {
      title: "Consultations",
      value: stats.consultations,
      description: `${stats.upcomingConsultations} upcoming`,
      iconName: "Calendar",
      trend: "+15%",
    },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's an overview of your platform.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <AdminStatCard key={stat.title} stat={stat} index={index} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Recent Applicants</CardTitle>
            <CardDescription>Latest application submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={FileText}
              title="No applicants yet"
              description="Applicants will appear here once they start submitting applications."
            />
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Upcoming Consultations</CardTitle>
            <CardDescription>Scheduled consultations</CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={Calendar}
              title="No consultations scheduled"
              description="Consultations will appear here once students book sessions."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
