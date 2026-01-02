import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { PageHero } from "@/components/PageHero"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/ui/empty-state"
import { CourseCard } from "@/components/CourseCard"
import { SectionHeader } from "@/components/ui/section-header"
import Link from "next/link"
import { prisma } from "@/lib/db"
import { formatCurrency } from "@/lib/utils"
import { BookOpen, Search, Filter, SlidersHorizontal } from "lucide-react"

async function getCourses() {
  try {
    const courses = await prisma.course.findMany({
      where: { isActive: true },
      include: {
        university: true,
        categories: true,
      },
      take: 12,
    })
    // Map courses and convert Decimal to number for serialization
    return courses.map((course: (typeof courses)[number]) => ({
      ...course,
      duration: course.duration, // Keep as number for display
      tuitionFee: course.tuitionFee ? Number(course.tuitionFee) : null, // Convert Decimal to number
    }))
  } catch (error) {
    console.error("Error fetching courses:", error)
    return []
  }
}

export default async function CoursesPage() {
  const courses = await getCourses()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <PageHero
          badge="Explore Our Courses"
          badgeIcon={<BookOpen className="h-4 w-4" />}
          title="University Course Finder"
          description="Search and filter popular UK courses to find the right academic pathway for you."
          imageUrl="https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop"
          imageAlt="University courses"
        />

        {/* Search Bar Section */}
        <section className="relative -mt-12 sm:-mt-16 z-20 pb-6 sm:pb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="pl-10 sm:pl-12 pr-4 h-12 sm:h-14 bg-white shadow-xl border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-[#1E3A8A] focus:ring-[#1E3A8A] text-sm sm:text-base"
              />
            </div>
          </div>
        </section>

        {/* Filters & Courses Section */}
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filters Bar */}
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <Button variant="outline" className="font-body w-full sm:w-auto min-h-[44px] justify-center sm:justify-start">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <div className="flex flex-wrap gap-2 flex-1">
                {["All Courses", "Undergraduate", "Postgraduate", "Foundation"].map((filter) => (
                  <Button
                    key={filter}
                    variant="outline"
                    size="sm"
                    className="font-body min-h-[44px]"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
              <div className="text-sm text-muted-foreground font-body text-center sm:text-left sm:ml-auto">
                {courses.length} courses found
              </div>
            </div>

            {/* Courses Grid */}
            {courses.length === 0 ? (
              <EmptyState
                icon={BookOpen}
                title="No courses available"
                description="Check back soon for new course listings. We're constantly adding new programs to help you find the perfect fit."
              />
            ) : (
              <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
                {courses.map((course: (typeof courses)[number], index: number) => (
                  <CourseCard key={course.id} course={course} index={index} />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {courses.length > 0 && (
              <div className="mt-8 sm:mt-12 text-center">
                <Button variant="outline" size="lg" className="font-display min-h-[44px] w-full sm:w-auto px-8">
                  Load More Courses
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
