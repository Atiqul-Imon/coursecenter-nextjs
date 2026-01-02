"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, BookOpen, FileText, Users, GraduationCap, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function ServicesSection() {
  return (
    <>
      {/* Who We Are Section - NextBrit Style */}
      <section className="relative bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-10 items-center">
            {/* Left: Text */}
            <div>
              <div className="text-sm uppercase tracking-wide text-gray-500 mb-4">ABOUT US</div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900">
                Your journey to the right university starts with us.
              </h2>
              <p className="text-lg text-gray-800 leading-relaxed mb-6">
                Course Centre is a leading education and student recruitment consultant in United Kingdom, providing dedicated support to our clients throughout their educational and migration journey.
              </p>
              <div className="space-y-2 mb-8">
                <p className="text-base text-gray-800">• Free Consultation</p>
                <p className="text-base text-gray-800">• University & Course Selection</p>
                <p className="text-base text-gray-800">• Application Support & Guidance</p>
                <p className="text-base text-gray-800">• Admission Follow-Up & Processing</p>
                <p className="text-base text-gray-800">• Document Preparation & Review</p>
              </div>
              <Button
                asChild
                className="px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-white"
              >
                <Link href="/about">Discover More</Link>
              </Button>
            </div>

            {/* Right: Image with border */}
            <div className="relative">
              <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-lg overflow-hidden shadow-xl border-l-4 border-b-4 border-[#F59E0B]">
                <Image
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Consultation meeting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              
              {/* Free Consultation Card - Mobile Optimized */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white rounded-lg shadow-xl border border-gray-300 p-4 sm:p-6 max-w-[calc(100%-2rem)] sm:max-w-xs">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0 shadow-sm">
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="font-bold text-gray-900 text-sm sm:text-base">Totally Free.</div>
                </div>
                <p className="text-xs sm:text-sm text-gray-800">
                  Get all the expert help you need without paying a penny!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Feature Blocks - Sophisticated Premium Design */}
      <section className="relative bg-[#1E3A8A] py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 - Blue/Indigo Theme */}
            <div className="bg-gray-50 overflow-hidden shadow-2xl border border-gray-300">
              <div className="p-6 md:p-8">
                {/* Icon with sophisticated gradient */}
                <div className="mb-4 md:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1E40AF] shadow-lg shadow-blue-500/25">
                  <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 md:mb-4 text-gray-900 leading-[1.35] tracking-tight">
                  Your Education Pathway
                </h3>
                
                {/* Description */}
                <p className="text-sm sm:text-base leading-[1.7] sm:leading-[1.8] text-gray-800 font-normal">
                  We connect you to a vast network of UK universities and opportunities, making sure you find the perfect fit.
                </p>
              </div>
            </div>

            {/* Card 2 - Emerald/Teal Theme */}
            <div className="bg-gray-50 overflow-hidden shadow-2xl border border-gray-300">
              <div className="p-6 md:p-8">
                {/* Icon with sophisticated gradient */}
                <div className="mb-4 md:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] shadow-lg shadow-emerald-500/25">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 md:mb-4 text-gray-900 leading-[1.35] tracking-tight">
                  Proven Success, Brighter Futures
                </h3>
                
                {/* Description */}
                <p className="text-sm sm:text-base leading-[1.7] sm:leading-[1.8] text-gray-800 font-normal">
                  We've helped countless students achieve their academic ambitions and land spots at their dream UK universities.
                </p>
              </div>
            </div>

            {/* Card 3 - Purple/Violet Theme */}
            <div className="bg-gray-50 overflow-hidden shadow-2xl border border-gray-300">
              <div className="p-6 md:p-8">
                {/* Icon with sophisticated gradient */}
                <div className="mb-4 md:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9] shadow-lg shadow-purple-500/25">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 md:mb-4 text-gray-900 leading-[1.35] tracking-tight">
                  Expert Guidance, Every Step
                </h3>
                
                {/* Description */}
                <p className="text-sm sm:text-base leading-[1.7] sm:leading-[1.8] text-gray-800 font-normal">
                  Our dedicated UK university specialists provide personalised advice and unwavering support, ensuring a smooth journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Study Your Way Section - Premium Two-Panel Design */}
      <section className="relative py-0 overflow-hidden bg-white">
        <div className="flex flex-col lg:flex-row">
          {/* Left Panel - Blue with Image */}
          <div className="flex flex-col lg:flex-row w-full lg:w-1/2">
            {/* Blue Text Section */}
            <div className="bg-[#1E3A8A] text-white p-8 md:p-10 lg:p-12 flex flex-col justify-center lg:w-1/2 relative overflow-hidden aspect-square lg:aspect-auto">
              <div className="relative z-10 max-w-md">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                  Study Your Way in the University
                </h3>
                <p className="text-sm md:text-base lg:text-lg leading-relaxed text-white font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]">
                  We'll help you navigate course options, perfect your applications, and find the ideal UK university where you'll truly thrive.
                </p>
              </div>
            </div>
            
            {/* Image Section */}
            <div className="relative w-full lg:w-1/2 aspect-square lg:aspect-auto overflow-hidden group">
              <Image
                src="https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
                alt="Students studying"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Right Panel - Orange with Image */}
          <div className="flex flex-col lg:flex-row w-full lg:w-1/2">
            {/* Orange Text Section */}
            <div className="bg-[#F59E0B] text-white p-8 md:p-10 lg:p-12 flex flex-col justify-center lg:w-1/2 relative overflow-hidden aspect-square lg:aspect-auto">
              <div className="relative z-10 max-w-md">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                  Explore Your Academic Path
                </h3>
                <p className="text-sm md:text-base lg:text-lg leading-relaxed text-white font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]">
                  Dive into a vibrant experience, choosing from the vast array of degrees and courses available for your future.
                </p>
              </div>
            </div>
            
            {/* Image Section */}
            <div className="relative w-full lg:w-1/2 aspect-square lg:aspect-auto overflow-hidden group">
              <Image
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
                alt="Students collaborating"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
