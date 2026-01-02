"use client"

import Image from "next/image"
import { GraduationCap, Building2, BookOpen, Shield, Crown, Users, Circle } from "lucide-react"

// Our Partners - 8 educational institutions
const partners = [
  {
    name: "University",
    subtitle: "SINCE 1930",
    logo: null,
    slug: "university-1",
    icon: "shield", // Shield with U and dots
  },
  {
    name: "CREATIVEBOOK",
    subtitle: "Lorem Ipsum Dolor Sit Amet",
    logo: null,
    slug: "creativebook",
    icon: "book-brain", // Book with brain network
  },
  {
    name: "OWLBOOK",
    subtitle: "Tagline Here",
    logo: null,
    slug: "owlbook",
    icon: "owl", // Owl on book
  },
  {
    name: "University",
    subtitle: "State",
    logo: null,
    slug: "university-2",
    icon: "figure-book", // Figure emerging from book with laurel
  },
  {
    name: "University",
    subtitle: "",
    logo: null,
    slug: "university-3",
    icon: "crown", // U with crown and laurel wreath
  },
  {
    name: "University",
    subtitle: "SINCE 1930",
    logo: null,
    slug: "university-4",
    icon: "circle", // Circular with U and stars
  },
  {
    name: "EDUHOUSE",
    subtitle: "Lorem Ipsum Dolor Sit Amet",
    logo: null,
    slug: "eduhouse",
    icon: "house", // Stylized house figures
  },
  {
    name: "STATE UNIVERSITY",
    subtitle: "",
    logo: null,
    slug: "state-university",
    icon: "graduation", // Graduation cap with laurel
  },
]

export function PartnersSection() {
  return (
    <section className="relative bg-white py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Trusted by Leading UK Universities
          </h2>
          <div className="w-24 h-1 bg-[#1E3A8A] mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            We partner with prestigious UK universities to help students achieve their academic dreams
          </p>
        </div>

        {/* Partners Logos Grid - 2 rows, 4 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 items-center">
          {partners.map((partner) => {
            // Select icon based on partner type
            const getIcon = () => {
              switch (partner.icon) {
                case "shield":
                  return <Shield className="h-8 w-8 md:h-10 md:w-10 text-white" />
                case "book-brain":
                  return <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-white" />
                case "owl":
                  return <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-white" />
                case "figure-book":
                  return <Users className="h-8 w-8 md:h-10 md:w-10 text-white" />
                case "crown":
                  return <Crown className="h-8 w-8 md:h-10 md:w-10 text-white" />
                case "circle":
                  return <Circle className="h-8 w-8 md:h-10 md:w-10 text-white" />
                case "house":
                  return <Building2 className="h-8 w-8 md:h-10 md:w-10 text-white" />
                case "graduation":
                default:
                  return <GraduationCap className="h-8 w-8 md:h-10 md:w-10 text-white" />
              }
            }

            return (
              <div
                key={partner.slug}
                className="group relative flex flex-col items-center justify-center p-4 md:p-6 bg-gray-50 hover:bg-white border border-gray-300 hover:border-[#1E3A8A]/60 rounded-lg shadow-md hover:shadow-lg"
              >
                {partner.logo ? (
                  <div className="relative w-full h-20 md:h-24 mb-3">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] flex items-center justify-center mb-3 shadow-md">
                      {getIcon()}
                    </div>
                    <p className="text-xs md:text-sm font-bold text-gray-800 text-center leading-tight group-hover:text-[#1E3A8A] transition-colors">
                      {partner.name}
                    </p>
                    {partner.subtitle && (
                      <p className="text-xs text-gray-500 text-center mt-1">
                        {partner.subtitle}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-sm md:text-base text-gray-500 font-medium">
            Trusted partners in education excellence
          </p>
        </div>
      </div>
    </section>
  )
}
