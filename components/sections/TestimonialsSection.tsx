"use client"

import { Star, Quote } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"

const testimonials = [
  {
    name: "Emily Turner",
    role: "Designer",
    content: "The team made my application easy and guided me at every step. Really helpful experience.",
    rating: 5,
    initials: "ET",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },
  {
    name: "Oliver Bennett",
    role: "Student",
    content: "They explained everything clearly and kept me updated on my application. Happy with the service.",
    rating: 5,
    initials: "OB",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },
  {
    name: "Sophie Clarke",
    role: "Content Creator",
    content: "The staff were friendly and helped me choose the right course. Great experience overall.",
    rating: 5,
    initials: "SC",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },
]

export function TestimonialsSection() {
  return (
    <section className="relative bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 leading-tight tracking-tight">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed font-normal">
            See how our personalised support and reliable guidance have made a difference in the lives of students across the UK.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-300 shadow-lg p-6 relative overflow-hidden"
            >
              {/* Quote Icon - Decorative */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="h-16 w-16 text-[#1E3A8A]" />
              </div>

              {/* Rating Stars */}
              <div className="mb-4 flex items-center gap-1 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>

              {/* Testimonial Content */}
              <p className="text-base leading-relaxed mb-6 text-gray-800 font-normal relative z-10">
                "{testimonial.content}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-300 relative z-10">
                <Avatar className="h-14 w-14 border-2 border-gray-300 shadow-md">
                  {testimonial.image ? (
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="rounded-full"
                      sizes="56px"
                    />
                  ) : (
                    <AvatarFallback className="bg-[#1E3A8A]/10 text-[#1E3A8A] font-semibold text-lg">
                      {testimonial.initials}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-lg mb-1">{testimonial.name}</div>
                  <div className="text-sm text-gray-700 leading-snug">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
