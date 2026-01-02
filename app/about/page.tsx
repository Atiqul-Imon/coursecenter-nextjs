"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { PageHero } from "@/components/PageHero"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import {
  Target,
  Eye,
  Award,
  Users,
  BookOpen,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  ArrowRight,
  MessageSquare,
  FileText,
  HelpCircle,
  Heart,
  Shield,
} from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: MessageSquare,
    title: "Free Consultation",
    description: "Get personalised guidance to understand your goals and start your study journey with clarity.",
  },
  {
    icon: GraduationCap,
    title: "University & Course Selection",
    description: "We help you choose the right UK university and course based on your goals, interests, and academic profile.",
  },
  {
    icon: HelpCircle,
    title: "Application Support & Guidance",
    description: "We guide you through your application to ensure everything is submitted correctly.",
  },
  {
    icon: CheckCircle2,
    title: "Admission Follow-Up & Processing",
    description: "We track your application progress and coordinate with universities to ensure timely updates and decisions.",
  },
  {
    icon: FileText,
    title: "Document Preparation & Review",
    description: "We help you prepare and refine your documents to meet UK university standards.",
  },
]

const whyChooseUs = [
  {
    icon: Heart,
    title: "Personalised Guidance",
    description: "We take the time to understand your goals, background, and aspirations. Our personalized approach ensures that every student receives guidance tailored specifically to their academic journey, making the process clear and stress-free.",
  },
  {
    icon: Shield,
    title: "Seamless Support",
    description: "From your first consultation to securing admission, we support you throughout the entire process. Our end-to-end assistance ensures a seamless experience, so you can focus on building a successful future with confidence.",
  },
  {
    icon: Award,
    title: "Trusted Expertise",
    description: "With years of experience in UK education and strong relationships with reputable institutions, our team provides accurate, honest, and reliable advice. We simplify complex processes and ensure you always make informed decisions.",
  },
]

const stats = [
  { value: 7000, suffix: "+", label: "Student Enrolled", icon: Users },
  { value: 5, suffix: "+", label: "Year of experience", icon: BookOpen },
  { value: 20, suffix: "+", label: "COURSES TO CHOOSE FROM", icon: GraduationCap },
  { value: 98.2, suffix: "%", label: "SATISFACTION RATE", icon: Award },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <PageHero
          badge="ABOUT US"
          badgeIcon={<Sparkles className="h-4 w-4" />}
          title="Shaping Futures Through Education"
          description="Course Centre is a leading education and student recruitment consultant in United Kingdom, providing dedicated support to our clients throughout their educational and migration journey."
          primaryCTA={{
            text: "Claim Free Consultation",
            href: "/register"
          }}
          secondaryCTA={{
            text: "Contact Us",
            href: "/contact"
          }}
          imageUrl="https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop"
          imageAlt="Education consultation"
        />

        {/* Services Section */}
        <section className="relative bg-white py-12 sm:py-16 md:py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12 sm:mb-14 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900">
                Our Services
              </h2>
            </div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <Card key={index} className="bg-white border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-[#1E3A8A]">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold mb-2 text-gray-900">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed font-normal">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative bg-gray-50 py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-6 lg:gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                const isUppercase = stat.label === stat.label.toUpperCase()
                return (
                  <div
                    key={index}
                    className="group text-center p-6 sm:p-7 md:p-8 lg:p-8 bg-white border-2 border-gray-200 hover:border-[#1E3A8A]/40 shadow-md hover:shadow-xl rounded-lg min-w-0 overflow-hidden"
                  >
                    <div className="mb-4 mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-[#1E3A8A]/10 group-hover:bg-[#1E3A8A]/20 transition-colors">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-[#1E3A8A]" />
                    </div>
                    <div className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1E3A8A] mb-3 sm:mb-4 leading-none min-w-0">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div
                      className={`${
                        isUppercase
                          ? "text-xs sm:text-sm md:text-xs lg:text-sm xl:text-base"
                          : "text-sm sm:text-base md:text-sm lg:text-base"
                      } text-gray-700 font-semibold leading-snug min-h-[2.5rem] flex items-center justify-center px-1 ${
                        isUppercase ? "uppercase" : ""
                      }`}
                    >
                      {stat.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="relative bg-white py-12 sm:py-16 md:py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12 sm:mb-14 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5 md:mb-6 text-gray-900">
                Our Mission & Vision
              </h2>
            </div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              <Card className="bg-white border border-gray-200/60 shadow-sm h-full">
                <CardHeader>
                  <div className="mb-3 sm:mb-4 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-[#1E3A8A]/10">
                    <Target className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#1E3A8A]" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                    Our mission is to guide students toward the right academic and career choices by offering honest advice, expert counselling, and end-to-end support. We strive to remove confusion from the admission process and ensure every student makes confident, informed decisions for their future.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200/60 shadow-sm h-full">
                <CardHeader>
                  <div className="mb-3 sm:mb-4 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-[#F59E0B]/10">
                    <Eye className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#F59E0B]" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                    Our vision is to be the most reliable and student-centric education consultancy, known for shaping futures through integrity, innovation, and genuine care. We aspire to empower students from all backgrounds to explore global opportunities and achieve their highest potential.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="relative bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12 sm:mb-14 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900">
                Why Choose Us?
              </h2>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-5 md:mb-6 text-gray-800">
                Your Success Starts With The Right Guidance
              </h3>
            </div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
              {whyChooseUs.map((item, index) => {
                const Icon = item.icon
                return (
                  <Card key={index} className="bg-white border border-gray-200/60 shadow-sm h-full">
                    <CardHeader>
                      <div className="mb-3 sm:mb-4 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-[#1E3A8A]/10">
                        <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#1E3A8A]" />
                      </div>
                      <CardTitle className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">{item.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative pt-16 sm:pt-20 md:pt-24 lg:pt-32 xl:pt-40 pb-0 bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-[#1E3A8A] overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#F59E0B]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

          <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 text-white">
                Ready to Start Your Journey?
              </h2>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/95 mb-6 sm:mb-8 md:mb-10">
                Join thousands of successful students who have achieved their dreams with Course Centre.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pb-12 sm:pb-14 md:pb-16 lg:pb-20">
                <Button asChild size="lg" className="w-full sm:w-auto bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-xl px-6 sm:px-8 py-5 sm:py-6 min-h-[44px]">
                  <Link href="/register" className="flex items-center justify-center gap-2">
                    Book Free Consultation
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-6 sm:px-8 py-5 sm:py-6 min-h-[44px]">
                  <Link href="/contact">Contact Us</Link>
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
