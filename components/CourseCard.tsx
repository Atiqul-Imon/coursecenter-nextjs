"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Clock, GraduationCap, ArrowRight } from "lucide-react"

interface CourseCardProps {
  course: {
    id: string
    title: string
    slug: string
    level: string
    duration: number
    shortDescription?: string | null
    description?: string | null
    image?: string | null
  }
  index: number
}

export function CourseCard({ course, index }: CourseCardProps) {
  const levelMap: Record<string, string> = {
    UNDERGRADUATE: "Bachelor",
    POSTGRADUATE: "Master",
    FOUNDATION: "Foundation",
    DIPLOMA: "HND",
    CERTIFICATE: "Certificate",
    PHD: "PhD",
  }

  const displayLevel = levelMap[course.level] || course.level
  const durationText = `${course.duration} yr`
  const studyMode = "On Campus" // Default study mode

  return (
    <div className="h-full">
      <Card className="flex h-full flex-col group overflow-hidden bg-white border-2 border-gray-300 hover:border-[#1E3A8A]/60 shadow-lg hover:shadow-2xl p-0">
          {/* Course Image */}
          <div className="relative h-48 sm:h-52 md:h-56 w-full overflow-hidden bg-gradient-to-br from-[#1E3A8A]/10 via-gray-50 to-gray-100 flex-shrink-0">
            {course.image ? (
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <GraduationCap className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-[#1E3A8A]/20" />
              </div>
            )}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
              <Badge className="bg-white text-[#1E3A8A] font-bold text-xs px-2.5 py-1 sm:px-3 sm:py-1.5 border-0 shadow-lg">
                {displayLevel}
              </Badge>
            </div>
          </div>

          <CardHeader className="px-5 py-4 md:px-6 md:py-5 flex-shrink-0">
            <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-gray-900 group-hover:text-[#1E3A8A] line-clamp-2 leading-tight">
              {course.title}
            </CardTitle>
            <p className="text-xs sm:text-sm md:text-base text-gray-800 leading-relaxed mb-0 line-clamp-3">
              {course.shortDescription || course.description || "Develop your skills and advance your career with this comprehensive program."}
            </p>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col justify-between px-5 py-4 md:px-6 md:py-5 min-h-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 text-xs sm:text-sm md:text-base text-gray-800">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-gray-50 px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 rounded-lg flex-shrink-0">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#1E3A8A] flex-shrink-0" />
                <span className="font-semibold text-gray-900 whitespace-nowrap">{durationText}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-gray-50 px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 rounded-lg flex-shrink-0">
                <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#1E3A8A] flex-shrink-0" />
                <span className="font-semibold text-gray-900 whitespace-nowrap">{studyMode}</span>
              </div>
            </div>

            <Button 
              asChild 
              className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-sm sm:text-base py-3 md:py-4 shadow-md hover:shadow-lg group/btn flex-shrink-0 min-h-[44px]"
            >
              <Link href={`/courses/${course.slug}/apply`} className="flex items-center justify-center gap-2">
                Apply Now
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
    </div>
  )
}
