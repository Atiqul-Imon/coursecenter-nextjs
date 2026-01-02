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
import { Plus, Edit, Trash2, Building2 } from "lucide-react"
import Link from "next/link"

async function getUniversities() {
  try {
    const universities = await prisma.university.findMany({
      include: {
        _count: {
          select: { courses: true },
        },
      },
      orderBy: { createdAt: "desc" },
    })
    return universities
  } catch (error) {
    console.error("Error fetching universities:", error)
    return []
  }
}

export default async function UniversitiesPage() {
  const universities = await getUniversities()

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Universities</h1>
          <p className="text-gray-600 mt-1">Manage all universities and institutions</p>
        </div>
        <Button asChild className="bg-[#F59E0B] hover:bg-[#D97706] text-white">
          <Link href="/admin/universities/new">
            <Plus className="mr-2 h-4 w-4" />
            Add University
          </Link>
        </Button>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>All Universities</CardTitle>
          <CardDescription>View and manage university information</CardDescription>
        </CardHeader>
        <CardContent>
          {universities.length === 0 ? (
            <div className="py-12 text-center">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No universities found.</p>
              <Button asChild className="bg-[#F59E0B] hover:bg-[#D97706] text-white">
                <Link href="/admin/universities/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create First University
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>University</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {universities.map((university) => (
                  <TableRow key={university.id}>
                    <TableCell>
                      <div className="font-medium text-gray-900">{university.name}</div>
                      {university.description && (
                        <div className="text-sm text-gray-500 line-clamp-1 mt-1">
                          {university.description}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-900">
                        {university.city && `${university.city}, `}
                        {university.country}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-medium">
                        {university._count.courses} courses
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={university.isActive ? "default" : "secondary"}>
                        {university.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {formatDate(university.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/universities/${university.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


