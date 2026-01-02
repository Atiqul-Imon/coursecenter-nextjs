import { notFound } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { prisma } from "@/lib/db"
import { formatCurrency } from "@/lib/utils"
import {
  BookOpen,
  Calendar,
  DollarSign,
  Globe,
  GraduationCap,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowLeft,
  FileText,
  Users,
  Award,
  Star,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

async function getCourse(slug: string) {
  try {
    const course = await prisma.course.findUnique({
      where: { slug, isActive: true },
      include: {
        university: true,
        categories: true,
        _count: {
          select: { applications: true },
        },
      },
    })
    return course
  } catch (error) {
    console.error("Error fetching course:", error)
    return null
  }
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = await getCourse(params.slug)

  if (!course) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop"
              alt={course.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/95 via-[#1E3A8A]/90 to-[#1E40AF]/95" />
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '60px 60px'
            }} />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 py-12 sm:py-16 md:py-20 lg:py-24">
            <Button asChild variant="ghost" className="mb-4 sm:mb-6 text-white hover:bg-white/20 backdrop-blur-sm min-h-[44px]">
              <Link href="/courses">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Back to Courses</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </Button>
            <div className="max-w-4xl">
              <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3 flex-wrap">
                <Badge variant="secondary" className="font-display font-semibold bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs sm:text-sm">
                  {course.level}
                </Badge>
                {course.categories.slice(0, 2).map((cat) => (
                  <Badge key={cat.id} variant="outline" className="font-body bg-white/10 text-white border-white/30 backdrop-blur-sm text-xs sm:text-sm">
                    {cat.category}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 leading-tight text-white">
                {course.title}
              </h1>
              {course.university && (
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-white/80" />
                    <span className="text-base sm:text-lg text-white/90">{course.university.name}</span>
                  </div>
                  {course.university.city && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/60" />
                      <span className="font-body text-xs sm:text-sm text-white/80">{course.university.city}</span>
                    </div>
                  )}
                </div>
              )}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {course.tuitionFee && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-white/80" />
                    <span className="font-display text-lg sm:text-xl font-bold text-white">
                      {formatCurrency(Number(course.tuitionFee), course.currency)}
                    </span>
                  </div>
                )}
                {course.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-white/80" />
                    <span className="font-body text-sm sm:text-base text-white/90">{course.duration}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-body text-sm sm:text-base text-white/90">4.8 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Tabs */}
                <Tabs defaultValue="overview" className="w-full">
                  <div className="overflow-x-auto scrollbar-hide">
                    <TabsList className="grid w-full grid-cols-4 font-body min-w-max sm:min-w-0">
                      <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
                      <TabsTrigger value="curriculum" className="text-xs sm:text-sm">Curriculum</TabsTrigger>
                      <TabsTrigger value="requirements" className="text-xs sm:text-sm">Requirements</TabsTrigger>
                      <TabsTrigger value="reviews" className="text-xs sm:text-sm">Reviews</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="overview" className="mt-6">
                    <Card variant="elevated">
                      <CardHeader>
                        <CardTitle className="font-display text-2xl font-bold">Course Description</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-body text-muted-foreground leading-relaxed whitespace-pre-line">
                          {course.description || course.shortDescription || "No description available."}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Key Highlights */}
                    <Card variant="elevated" className="mt-6">
                      <CardHeader>
                        <CardTitle className="font-display text-2xl font-bold">Key Highlights</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                          {[
                            { icon: Award, text: "Internationally Recognized Degree" },
                            { icon: Users, text: "Expert Faculty Members" },
                            { icon: Globe, text: "Global Career Opportunities" },
                            { icon: CheckCircle2, text: "Industry-Relevant Curriculum" },
                          ].map((item, index) => {
                            const Icon = item.icon
                            return (
                              <div key={index} className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                  <Icon className="h-5 w-5 text-primary" />
                                </div>
                                <span className="font-body text-sm">{item.text}</span>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="curriculum" className="mt-6">
                    <Card variant="elevated">
                      <CardHeader>
                        <CardTitle className="font-display text-2xl font-bold">Curriculum</CardTitle>
                        <CardDescription className="font-body">
                          Comprehensive course structure and modules
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="font-body text-muted-foreground">
                          Curriculum details will be available soon. This course offers a comprehensive curriculum designed to prepare you for your future career.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="requirements" className="mt-6">
                    <Card variant="elevated">
                      <CardHeader>
                        <CardTitle className="font-display text-2xl font-bold">Entry Requirements</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {course.entryRequirements ? (
                          <div className="prose prose-sm max-w-none">
                            <p className="font-body text-muted-foreground leading-relaxed whitespace-pre-line">
                              {course.entryRequirements}
                            </p>
                          </div>
                        ) : (
                          <p className="font-body text-muted-foreground">
                            Entry requirements information will be provided during consultation.
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-6">
                    <Card variant="elevated">
                      <CardHeader>
                        <CardTitle className="font-display text-2xl font-bold">Student Reviews</CardTitle>
                        <CardDescription className="font-body">
                          What students are saying about this course
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="font-body text-muted-foreground">
                          Reviews will be displayed here once students start sharing their experiences.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Categories */}
                {course.categories.length > 0 && (
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle className="font-display text-xl font-bold">Course Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {course.categories.map((category) => (
                          <Badge key={category.id} variant="secondary" className="font-body">
                            {category.category}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Info Card */}
                <Card variant="elevated" className="lg:sticky lg:top-24">
                  <CardHeader>
                    <CardTitle className="font-display text-lg sm:text-xl font-bold">Course Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-body text-sm font-medium text-muted-foreground">Level</p>
                        <p className="font-display text-base font-semibold">{course.level}</p>
                      </div>
                    </div>

                    {course.duration && (
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/10">
                          <Clock className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <p className="font-body text-sm font-medium text-muted-foreground">Duration</p>
                          <p className="font-display text-base font-semibold">{course.duration}</p>
                        </div>
                      </div>
                    )}

                    {course.tuitionFee && (
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10">
                          <DollarSign className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <p className="font-body text-sm font-medium text-muted-foreground">Tuition Fee</p>
                          <p className="font-display text-lg font-bold text-primary">
                            {formatCurrency(Number(course.tuitionFee), course.currency)}
                          </p>
                        </div>
                      </div>
                    )}

                    {course.intakeMonths && course.intakeMonths.length > 0 && (
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
                          <Calendar className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-body text-sm font-medium text-muted-foreground">Intake Months</p>
                          <p className="font-display text-base font-semibold">
                            {course.intakeMonths.join(", ")}
                          </p>
                        </div>
                      </div>
                    )}

                    {course.language && (
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/10">
                          <Globe className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <p className="font-body text-sm font-medium text-muted-foreground">Language</p>
                          <p className="font-display text-base font-semibold">{course.language}</p>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t space-y-3">
                      <Button asChild variant="gradient" className="w-full font-display min-h-[44px]" size="lg">
                        <Link href="/register">Apply Now</Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full font-display min-h-[44px]">
                        <Link href="/contact">Request Information</Link>
                      </Button>
                      <Button asChild variant="ghost" className="w-full font-body min-h-[44px]">
                        <Link href="/dashboard/consultations/new">Book Consultation</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* University Info */}
                {course.university && (
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle className="font-display text-xl font-bold">University</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-display text-lg font-semibold mb-2">{course.university.name}</h3>
                          {course.university.city && (
                            <p className="font-body text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {course.university.city}, {course.university.country}
                            </p>
                          )}
                        </div>
                        {course.university.description && (
                          <p className="font-body text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                            {course.university.description}
                          </p>
                        )}
                        <Button asChild variant="outline" className="w-full font-display">
                          <Link href={`/universities/${course.university.slug}`}>
                            View University
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
