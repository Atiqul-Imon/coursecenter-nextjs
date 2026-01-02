"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { HeroSection } from "@/components/HeroSection"
import { StatsSection } from "@/components/sections/StatsSection"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { FeaturesSection } from "@/components/sections/FeaturesSection"
import { ProcessSection } from "@/components/sections/ProcessSection"
import { PartnersSection } from "@/components/sections/PartnersSection"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Section */}
        <StatsSection />

        {/* Services Section (includes Who We Are + Feature Blocks + Study Your Way) */}
        <ServicesSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Process Section (includes Quote + Easy Steps) */}
        <ProcessSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Partners Section */}
        <PartnersSection />

        {/* Final CTA Section - Premium Design */}
        <section className="relative pt-16 md:pt-24 pb-0 bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-[#1E3A8A] overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#F59E0B]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight text-gray-200">
                Ready to launch your incredible UK university journey?
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white/95 font-normal max-w-3xl mx-auto">
                With Course Centre by your side, transforming your UK university dreams into reality is simpler than you think. Let's make that future happen together.
              </p>
              <div className="pb-12 md:pb-16">
                <Button
                  asChild
                  className="px-12 py-7 bg-[#F59E0B] hover:bg-[#D97706] text-white text-lg md:text-xl font-semibold shadow-2xl hover:shadow-[0_20px_40px_rgba(245,158,11,0.4)]"
                >
                  <Link href="/register">
                    START YOUR JOURNEY!
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
