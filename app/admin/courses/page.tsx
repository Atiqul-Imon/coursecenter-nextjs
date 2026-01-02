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
import { formatCurrency, formatDate } from "@/lib/utils"
import { Plus, Edit } from "lucide-react"
import Link from "next/link"
import { DeleteCourseButton } from "@/components/admin/DeleteCourseButton"

async function getCourses() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        university: true,
        categories: true,
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { createdAt: "desc" },
    })
    return courses
  } catch (error) {
    console.error("Error fetching courses:", error)
    return []
  }
}

export default async function AdminCoursesPage() {
  const courses = await getCourses()

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage all courses and programs</p>
        </div>
        <Button asChild className="w-full sm:w-auto min-h-[44px]">
          <Link href="/admin/courses/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">All Courses</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Manage courses, update information, and track applications</CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          {courses.length === 0 ? (
            <div className="py-8 sm:py-12 text-center px-4">
              <p className="text-sm sm:text-base text-muted-foreground">No courses found.</p>
              <Button asChild className="mt-4 min-h-[44px]">
                <Link href="/admin/courses/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Course
                </Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Course</TableHead>
                      <TableHead className="min-w-[150px]">University</TableHead>
                      <TableHead className="min-w-[100px]">Level</TableHead>
                      <TableHead className="min-w-[100px]">Tuition</TableHead>
                      <TableHead className="min-w-[100px]">Applications</TableHead>
                      <TableHead className="min-w-[100px]">Status</TableHead>
                      <TableHead className="min-w-[100px]">Created</TableHead>
                      <TableHead className="text-right min-w-[120px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="min-w-[200px]">
                          <div className="font-medium text-sm sm:text-base">{course.title}</div>
                          <div className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                            {course.shortDescription || course.description}
                          </div>
                        </TableCell>
                        <TableCell className="min-w-[150px] text-xs sm:text-sm">
                          {course.university ? course.university.name : <span className="text-gray-400">No university</span>}
                        </TableCell>
                        <TableCell className="min-w-[100px]">
                          <Badge variant="outline" className="text-xs">{course.level}</Badge>
                        </TableCell>
                        <TableCell className="min-w-[100px] text-xs sm:text-sm">
                          {course.tuitionFee ? (
                            formatCurrency(Number(course.tuitionFee), course.currency)
                          ) : (
                            <span className="text-gray-400">Not set</span>
                          )}
                        </TableCell>
                        <TableCell className="min-w-[100px] text-xs sm:text-sm">{course._count.applications}</TableCell>
                        <TableCell className="min-w-[100px]">
                          <Badge variant={course.isActive ? "default" : "secondary"} className="text-xs">
                            {course.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm text-muted-foreground min-w-[100px]">
                          {formatDate(course.createdAt)}
                        </TableCell>
                        <TableCell className="text-right min-w-[120px]">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" asChild className="h-9 w-9 sm:h-10 sm:w-10 min-h-[44px] min-w-[44px]">
                              <Link href={`/admin/courses/${course.id}/edit`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <DeleteCourseButton courseId={course.id} courseTitle={course.title} />
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

