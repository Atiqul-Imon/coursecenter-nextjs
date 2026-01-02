"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { PageHero } from "@/components/PageHero"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"
import { CheckCircle2, MessageSquare, BookOpen, FileText, Users, Award, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: MessageSquare,
    title: "Free Consultation",
    description: "Get personalised guidance to understand your goals and start your study journey with clarity. Our expert consultants will help you explore your options.",
    features: [
      "One-on-one consultation",
      "Career guidance",
      "University selection advice",
      "Application timeline planning",
    ],
    color: "primary",
  },
  {
    icon: BookOpen,
    title: "University & Course Selection",
    description: "We help you choose the right UK university and course based on your goals, interests, and academic profile. Find the perfect match for your future.",
    features: [
      "Comprehensive university database",
      "Course matching algorithm",
      "Entry requirement analysis",
      "Career outcome insights",
    ],
    color: "accent",
  },
  {
    icon: FileText,
    title: "Document Preparation & Review",
    description: "We help you prepare and refine your documents to meet UK university standards. Ensure your application stands out from the competition.",
    features: [
      "Personal statement writing",
      "CV/Resume preparation",
      "Reference letter guidance",
      "Document review & feedback",
    ],
    color: "secondary",
  },
  {
    icon: Users,
    title: "Application Support & Guidance",
    description: "We guide you through your application to ensure everything is submitted correctly. Get step-by-step support throughout the process.",
    features: [
      "Application form assistance",
      "Deadline management",
      "Submission support",
      "Follow-up tracking",
    ],
    color: "primary",
  },
  {
    icon: Award,
    title: "Profile Assessment",
    description: "We assess your academic profile to match you with the best possible institutions. Understand your strengths and opportunities.",
    features: [
      "Academic profile analysis",
      "Strength identification",
      "Improvement recommendations",
      "University matching",
    ],
    color: "accent",
  },
  {
    icon: CheckCircle2,
    title: "Admission Follow-Up & Processing",
    description: "We track your application progress and coordinate with universities to ensure timely updates and decisions. Stay informed every step of the way.",
    features: [
      "Application tracking",
      "University communication",
      "Decision follow-up",
      "Visa support guidance",
    ],
    color: "secondary",
  },
]

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <PageHero
          badge="Our Services"
          badgeIcon={<Sparkles className="h-4 w-4" />}
          title="Comprehensive Support for Your Journey"
          description="From initial consultation to university admission, we provide end-to-end support to help you achieve your educational goals in the UK."
          primaryCTA={{
            text: "Book Free Consultation",
            href: "/register"
          }}
          secondaryCTA={{
            text: "Contact Us",
            href: "/contact"
          }}
          imageUrl="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop"
          imageAlt="Education services"
        />

        {/* Services Grid Section */}
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Our Services"
              subtitle="What We Offer"
              description="We provide comprehensive support throughout your entire application journey, from initial consultation to university admission."
              variant="centered"
              className="mb-12 sm:mb-14 md:mb-16"
            />

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const Icon = service.icon
                const colorClasses = {
                  primary: "from-primary/20 to-primary/10 text-primary",
                  accent: "from-accent/20 to-accent/10 text-accent",
                  secondary: "from-secondary/20 to-secondary/10 text-secondary",
                }[service.color]

                return (
                  <div key={index}>
                    <Card variant="elevated" className="h-full group">
                      <CardHeader>
                        <div className={`mb-3 sm:mb-4 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${colorClasses} shadow-lg group-hover:shadow-xl`}>
                          <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                        </div>
                        <CardTitle className="font-display text-lg sm:text-xl font-bold mb-2 group-hover:text-primary">
                          {service.title}
                        </CardTitle>
                          <CardDescription className="font-body text-sm sm:text-base leading-relaxed">
                            {service.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 mb-4 sm:mb-6">
                            {service.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent mt-0.5 flex-shrink-0" />
                                <span className="font-body text-xs sm:text-sm text-muted-foreground">{feature}</span>
                              </div>
                            ))}
                          </div>
                          <Button asChild variant="outline" className="w-full font-display min-h-[44px]">
                            <Link href="/contact">
                              Learn More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="How We Help You Succeed"
              subtitle="Our Process"
              description="A simple, transparent process designed to make your university application journey smooth and stress-free."
              variant="centered"
              className="mb-12 sm:mb-14 md:mb-16"
            />

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Initial Consultation",
                  description: "Free consultation to understand your goals and explore options.",
                },
                {
                  step: "02",
                  title: "Profile Assessment",
                  description: "Comprehensive evaluation of your academic profile and preferences.",
                },
                {
                  step: "03",
                  title: "Application Support",
                  description: "Complete guidance through document preparation and submission.",
                },
                {
                  step: "04",
                  title: "Admission Success",
                  description: "Ongoing support until you receive your offer and beyond.",
                },
              ].map((item, index) => (
                <div key={index}>
                  <Card variant="elevated" className="text-center h-full">
                    <CardHeader>
                      <div className="mb-3 sm:mb-4 mx-auto flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/20">
                        <span className="font-display text-xl sm:text-2xl font-bold text-primary">{item.step}</span>
                      </div>
                      <CardTitle className="font-display text-base sm:text-lg font-bold">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)]" />
          <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6 text-white">
                Ready to Start Your Journey?
              </h2>
              <p className="font-body text-base sm:text-lg leading-relaxed text-white/95 md:text-xl mb-6 sm:mb-8 md:mb-10">
                Book your free consultation today and take the first step towards your dream university in the UK.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pb-12 sm:pb-14 md:pb-16 lg:pb-20">
                <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto font-display shadow-xl shadow-black/20 px-6 sm:px-8 py-5 sm:py-6 min-h-[44px]">
                  <Link href="/register" className="flex items-center justify-center gap-2">
                    Book Free Consultation
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto font-display border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-6 sm:px-8 py-5 sm:py-6 min-h-[44px]">
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
