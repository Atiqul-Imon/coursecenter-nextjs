"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Image from "next/image"

interface PageHeroProps {
  title: string
  description?: string
  badge?: string
  badgeIcon?: React.ReactNode
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  imageUrl?: string
  imageAlt?: string
}

export function PageHero({
  title,
  description,
  badge,
  badgeIcon,
  primaryCTA,
  secondaryCTA,
  imageUrl = "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop",
  imageAlt = "Students studying",
}: PageHeroProps) {
  return (
    <section className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
          quality={90}
        />
        {/* Elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/95 via-[#1E3A8A]/90 to-[#1E40AF]/95" />
        {/* Subtle pattern overlay for texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[length:60px_60px]" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-4xl">
          {/* Badge */}
          {badge && (
            <div className="inline-flex items-center gap-2 mb-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/40">
              {badgeIcon || <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white flex-shrink-0" />}
              <span className="text-xs sm:text-sm font-medium text-white uppercase tracking-wider">
                {badge}
              </span>
            </div>
          )}

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] sm:leading-[1.05] text-white mb-4 tracking-tight">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed mb-6 sm:mb-8 max-w-3xl font-light">
              {description}
            </p>
          )}

          {/* CTA Buttons */}
          {(primaryCTA || secondaryCTA) && (
            <div className="flex flex-col sm:flex-row gap-3">
              {primaryCTA && (
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 text-base sm:text-lg font-semibold h-auto min-h-[44px] bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-2xl hover:shadow-[0_20px_40px_rgba(245,158,11,0.4)]"
                >
                  <Link href={primaryCTA.href} className="flex items-center justify-center gap-2">
                    {primaryCTA.text}
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
              )}
              {secondaryCTA && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 text-base sm:text-lg font-semibold h-auto min-h-[44px] bg-white/15 backdrop-blur-sm border-2 border-white/50 text-white hover:bg-white/25 hover:border-white/70"
                >
                  <Link href={secondaryCTA.href}>
                    {secondaryCTA.text}
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-28 md:h-32 bg-gradient-to-t from-white to-transparent z-10"></div>
      
      {/* Floating decorative circles */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-[#F59E0B]/10 rounded-full blur-3xl hidden lg:block"></div>
      <div className="absolute bottom-40 left-10 w-24 h-24 bg-white/5 rounded-full blur-2xl hidden lg:block"></div>
    </section>
  )
}


