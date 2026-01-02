"use client"

import { AnimatedCounter } from "@/components/ui/animated-counter"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function StatsSection() {
  return (
    <section className="relative bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Stats Story Section - Full Width Text */}
        <div className="mb-10 md:mb-12 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
            The Course Centre Story: Your Success, Our Stats
          </h2>
          <p className="text-base md:text-lg text-gray-800 leading-relaxed font-normal">
            We're genuinely proud of the real-world impact we've had on countless students' UK university journeys. These figures aren't just numbers; they represent the dedication of our team and the fantastic achievements of everyone we've had the privilege to support.
          </p>
        </div>

        {/* Four Large Stats - Premium Design with Proper Responsive Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="group text-center p-6 md:p-8 bg-white border-2 border-gray-300 hover:border-[#1E3A8A]/60 shadow-lg hover:shadow-2xl rounded-lg min-w-0 overflow-hidden">
            <div className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-[#1E3A8A] mb-3 leading-none min-w-0">
              <AnimatedCounter value={7000} suffix="+" />
            </div>
            <div className="text-sm sm:text-base md:text-sm lg:text-base text-gray-800 font-semibold leading-snug min-h-[2.5rem] flex items-center justify-center">
              Student Enrolled
            </div>
          </div>
          
          <div className="group text-center p-6 md:p-8 bg-white border-2 border-gray-300 hover:border-[#1E3A8A]/60 shadow-lg hover:shadow-2xl rounded-lg min-w-0 overflow-hidden">
            <div className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-[#1E3A8A] mb-3 leading-none min-w-0">
              <AnimatedCounter value={5} suffix="+" />
            </div>
            <div className="text-sm sm:text-base md:text-sm lg:text-base text-gray-800 font-semibold leading-snug min-h-[2.5rem] flex items-center justify-center">
              Year of experience
            </div>
          </div>
          
          <div className="group text-center p-6 md:p-8 bg-white border-2 border-gray-300 hover:border-[#1E3A8A]/60 shadow-lg hover:shadow-2xl rounded-lg min-w-0 overflow-hidden">
            <div className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-[#1E3A8A] mb-3 leading-none min-w-0">
              <AnimatedCounter value={20} suffix="+" />
            </div>
            <div className="text-xs sm:text-sm md:text-xs lg:text-sm xl:text-base text-gray-800 font-semibold leading-snug uppercase min-h-[2.5rem] flex items-center justify-center px-1">
              COURSES TO CHOOSE FROM
            </div>
          </div>
          
          <div className="group text-center p-6 md:p-8 bg-white border-2 border-gray-300 hover:border-[#1E3A8A]/60 shadow-lg hover:shadow-2xl rounded-lg min-w-0 overflow-hidden">
            <div className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-[#1E3A8A] mb-3 leading-none min-w-0">
              <AnimatedCounter value={98.2} suffix="%" />
            </div>
            <div className="text-xs sm:text-sm md:text-xs lg:text-sm xl:text-base text-gray-800 font-semibold leading-snug uppercase min-h-[2.5rem] flex items-center justify-center px-1">
              SATISFACTION RATE
            </div>
          </div>
        </div>
      </div>

      {/* Guidance Section with Background Image */}
      <section className="relative py-16 md:py-24 mt-12 md:mt-16 min-h-[400px] sm:min-h-[450px] md:min-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop"
            alt="Students"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/90 via-[#1E3A8A]/85 to-[#1E3A8A]/90" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg leading-tight">
                Your UK Ambition, Our Expert Guidance
              </h2>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 text-white drop-shadow-md max-w-3xl mx-auto">
                We'll take you higher. Navigating the UK university landscape can feel like a maze, but with Course Centre, you'll have dedicated experts lighting the way. We simplify the process, helping you find your perfect course and genuinely excel.
              </p>
              <Button
                asChild
                className="px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 bg-[#F59E0B] hover:bg-[#D97706] text-white text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl min-h-[44px]"
              >
                <Link href="/register">Discover More</Link>
              </Button>
            </div>
        </div>
      </section>
    </section>
  )
}
