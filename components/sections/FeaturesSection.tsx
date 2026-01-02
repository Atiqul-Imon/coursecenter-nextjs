"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, FileSearch, GraduationCap, FileText, HelpCircle, CheckCircle2 } from "lucide-react"
import Image from "next/image"

const features = [
  {
    icon: MessageSquare,
    title: "Free consultation",
    description: "Get personalised guidance to understand your goals and start your study journey with clarity.",
  },
  {
    icon: FileSearch,
    title: "Profile Assessment",
    description: "We assess your academic profile to match you with the best possible institutions.",
  },
  {
    icon: GraduationCap,
    title: "University & Course Selection",
    description: "We help you choose the right UK university and course based on your goals, interests, and academic profile.",
  },
  {
    icon: FileText,
    title: "Document preparation & review",
    description: "We help you prepare and refine your documents to meet UK university standards.",
  },
  {
    icon: HelpCircle,
    title: "Application support & Guidance",
    description: "We guide you through your application to ensure everything is submitted correctly.",
  },
  {
    icon: CheckCircle2,
    title: "Admission follow up & Processing",
    description: "We track your application progress and coordinate with universities to ensure timely updates and decisions.",
  },
]

export function FeaturesSection() {
  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 leading-tight tracking-tight">
            Helping You Make the Right Choices
          </h2>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed font-normal">
            We provide end-to-end support, helping you choose the right university, prepare your documents, and navigate the entire application process with confidence and ease.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="bg-white border border-gray-300 shadow-lg hover:shadow-xl">
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-[#1E3A8A] shadow-md">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold mb-2 text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-800 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom Image Section */}
        <div className="mt-12 md:mt-16 relative h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop"
            alt="Students"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  )
}
