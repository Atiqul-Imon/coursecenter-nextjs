"use client"

import { useState, useMemo } from "react"
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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Plus, Edit, Search, X, ArrowUpDown, ArrowUp, ArrowDown, ExternalLink, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import { DeleteCourseButton } from "@/components/admin/DeleteCourseButton"
import Image from "next/image"

type Course = {
  id: string
  title: string
  slug: string
  level: string
  duration: number
  shortDescription: string | null
  description: string | null
  image: string | null
  tuitionFee: any
  currency: string
  isActive: boolean
  createdAt: Date
  university: {
    id: string
    name: string
  } | null
  categories: Array<{ id: string; courseId: string; category: string }>
  _count: {
    applications: number
  }
}

type University = {
  id: string
  name: string
}

interface AdminCoursesClientProps {
  courses: Course[]
  universities: University[]
}

type SortField = "title" | "createdAt" | "applications" | "tuitionFee" | "level"
type SortDirection = "asc" | "desc"

export function AdminCoursesClient({ courses, universities }: AdminCoursesClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [levelFilter, setLevelFilter] = useState<string>("all")
  const [universityFilter, setUniversityFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<SortField>("createdAt")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Get unique levels
  const uniqueLevels = useMemo(() => {
    const levels = new Set(courses.map((c) => c.level))
    return Array.from(levels).sort()
  }, [courses])

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter((course) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.university?.name.toLowerCase().includes(searchQuery.toLowerCase())

      // Status filter
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && course.isActive) ||
        (statusFilter === "inactive" && !course.isActive)

      // Level filter
      const matchesLevel = levelFilter === "all" || course.level === levelFilter

      // University filter
      const matchesUniversity =
        universityFilter === "all" || course.university?.id === universityFilter

      return matchesSearch && matchesStatus && matchesLevel && matchesUniversity
    })

    // Sort courses
    filtered.sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (sortField) {
        case "title":
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        case "createdAt":
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
          break
        case "applications":
          aValue = a._count.applications
          bValue = b._count.applications
          break
        case "tuitionFee":
          aValue = a.tuitionFee ? Number(a.tuitionFee) : 0
          bValue = b.tuitionFee ? Number(b.tuitionFee) : 0
          break
        case "level":
          aValue = a.level
          bValue = b.level
          break
        default:
          return 0
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })

    return filtered
  }, [courses, searchQuery, statusFilter, levelFilter, universityFilter, sortField, sortDirection])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCourses.length / itemsPerPage)
  const paginatedCourses = filteredAndSortedCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
    setCurrentPage(1)
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3 ml-1 opacity-50" />
    return sortDirection === "asc" ? (
      <ArrowUp className="h-3 w-3 ml-1" />
    ) : (
      <ArrowDown className="h-3 w-3 ml-1" />
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setLevelFilter("all")
    setUniversityFilter("all")
    setCurrentPage(1)
  }

  const hasActiveFilters =
    searchQuery !== "" || statusFilter !== "all" || levelFilter !== "all" || universityFilter !== "all"

  return (
    <Card className="border-gray-300 shadow-lg">
      <CardHeader className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">All Courses</CardTitle>
            <CardDescription className="text-xs sm:text-sm text-gray-600 mt-1">
              {filteredAndSortedCourses.length} of {courses.length} courses
            </CardDescription>
          </div>
          <Button asChild className="w-full sm:w-auto min-h-[44px] bg-[#F59E0B] hover:bg-[#D97706] text-white">
            <Link href="/admin/courses/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Link>
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="mt-4 space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search courses by title, description, or university..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10 h-10 border-gray-300 focus:border-gray-400 min-h-[44px]"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSearchQuery("")
                  setCurrentPage(1)
                }}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <Select value={statusFilter} onValueChange={(value) => {
              setStatusFilter(value)
              setCurrentPage(1)
            }}>
              <SelectTrigger className="w-full sm:w-[140px] h-10 border-gray-300 min-h-[44px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={levelFilter} onValueChange={(value) => {
              setLevelFilter(value)
              setCurrentPage(1)
            }}>
              <SelectTrigger className="w-full sm:w-[160px] h-10 border-gray-300 min-h-[44px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {uniqueLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={universityFilter} onValueChange={(value) => {
              setUniversityFilter(value)
              setCurrentPage(1)
            }}>
              <SelectTrigger className="w-full sm:w-[180px] h-10 border-gray-300 min-h-[44px]">
                <SelectValue placeholder="University" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Universities</SelectItem>
                {universities.map((university) => (
                  <SelectItem key={university.id} value={university.id}>
                    {university.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="h-10 border-gray-300 min-h-[44px]"
              >
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {paginatedCourses.length === 0 ? (
          <div className="py-12 text-center px-4">
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              {hasActiveFilters
                ? "No courses match your filters."
                : "No courses found."}
            </p>
            {hasActiveFilters ? (
              <Button variant="outline" onClick={clearFilters} className="min-h-[44px]">
                Clear Filters
              </Button>
            ) : (
              <Button asChild className="min-h-[44px] bg-[#F59E0B] hover:bg-[#D97706] text-white">
                <Link href="/admin/courses/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Course
                </Link>
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="min-w-[250px]">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("title")}
                        className="h-auto p-0 font-semibold text-gray-900 hover:text-gray-900"
                      >
                        Course
                        {getSortIcon("title")}
                      </Button>
                    </TableHead>
                    <TableHead className="min-w-[150px]">University</TableHead>
                    <TableHead className="min-w-[120px]">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("level")}
                        className="h-auto p-0 font-semibold text-gray-900 hover:text-gray-900"
                      >
                        Level
                        {getSortIcon("level")}
                      </Button>
                    </TableHead>
                    <TableHead className="min-w-[120px]">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("tuitionFee")}
                        className="h-auto p-0 font-semibold text-gray-900 hover:text-gray-900"
                      >
                        Tuition
                        {getSortIcon("tuitionFee")}
                      </Button>
                    </TableHead>
                    <TableHead className="min-w-[120px]">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("applications")}
                        className="h-auto p-0 font-semibold text-gray-900 hover:text-gray-900"
                      >
                        Applications
                        {getSortIcon("applications")}
                      </Button>
                    </TableHead>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                    <TableHead className="min-w-[120px]">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("createdAt")}
                        className="h-auto p-0 font-semibold text-gray-900 hover:text-gray-900"
                      >
                        Created
                        {getSortIcon("createdAt")}
                      </Button>
                    </TableHead>
                    <TableHead className="text-right min-w-[140px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCourses.map((course) => (
                    <TableRow key={course.id} className="hover:bg-gray-50">
                      <TableCell className="min-w-[250px]">
                        <div className="flex items-center gap-3">
                          {course.image ? (
                            <div className="relative h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                              <Image
                                src={course.image}
                                alt={course.title}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            </div>
                          ) : (
                            <div className="h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                              <ImageIcon className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm sm:text-base text-gray-900 line-clamp-1">
                              {course.title}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 line-clamp-1 mt-0.5">
                              {course.shortDescription || course.description || "No description"}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="min-w-[150px] text-xs sm:text-sm text-gray-800">
                        {course.university ? (
                          <span className="font-medium">{course.university.name}</span>
                        ) : (
                          <span className="text-gray-400">No university</span>
                        )}
                      </TableCell>
                      <TableCell className="min-w-[120px]">
                        <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">
                          {course.level}
                        </Badge>
                      </TableCell>
                      <TableCell className="min-w-[120px] text-xs sm:text-sm text-gray-800">
                        {course.tuitionFee ? (
                          <span className="font-medium">
                            {formatCurrency(Number(course.tuitionFee), course.currency)}
                          </span>
                        ) : (
                          <span className="text-gray-400">Not set</span>
                        )}
                      </TableCell>
                      <TableCell className="min-w-[120px]">
                        <Link
                          href={`/admin/applications?course=${course.id}`}
                          className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#1E3A8A] hover:text-[#1E40AF] hover:underline"
                        >
                          {course._count.applications}
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </TableCell>
                      <TableCell className="min-w-[100px]">
                        <Badge
                          variant={course.isActive ? "default" : "secondary"}
                          className={`text-xs ${
                            course.isActive
                              ? "bg-green-100 text-green-800 border-green-300"
                              : "bg-gray-100 text-gray-600 border-gray-300"
                          }`}
                        >
                          {course.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm text-gray-600 min-w-[120px]">
                        {formatDate(course.createdAt)}
                      </TableCell>
                      <TableCell className="text-right min-w-[140px]">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            className="h-9 w-9 sm:h-10 sm:w-10 min-h-[44px] min-w-[44px] hover:bg-gray-100"
                            title="Edit course"
                          >
                            <Link href={`/admin/courses/${course.id}/edit`}>
                              <Edit className="h-4 w-4 text-gray-600" />
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="border-t border-gray-200 px-4 sm:px-6 py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Show</span>
                    <Select
                      value={itemsPerPage.toString()}
                      onValueChange={(value) => {
                        setItemsPerPage(Number(value))
                        setCurrentPage(1)
                      }}
                    >
                      <SelectTrigger className="w-[70px] h-9 border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-gray-600">per page</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="h-9 border-gray-300 min-h-[44px]"
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-gray-600 px-2">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="h-9 border-gray-300 min-h-[44px]"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

