"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { PageHero } from "@/components/PageHero"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from "lucide-react"
import { toast } from "sonner"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsSubmitting(false)
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    toast.success("Message sent successfully! We'll get back to you soon.")

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <PageHero
          badge="Contact Us"
          badgeIcon={<MessageSquare className="h-4 w-4" />}
          title="Get In Touch"
          description="Have questions? We're here to help. Reach out to us and we'll respond as soon as possible."
          imageUrl="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop"
          imageAlt="Contact us"
        />

        {/* Contact Information & Form */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2">
              {/* Contact Information */}
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Contact Information</h2>
                  <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground">
                    We're always eager to hear from you! Get in touch through any of the following channels.
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <Card className="hover:shadow-md">
                    <CardContent className="flex items-start gap-3 sm:gap-4 pt-4 sm:pt-6">
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                        <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base">Email</h3>
                        <p className="mt-1 text-xs sm:text-sm text-muted-foreground break-words">info@coursecentre.co.uk</p>
                        <a
                          href="mailto:info@coursecentre.co.uk"
                          className="mt-2 inline-block text-xs sm:text-sm text-primary hover:underline min-h-[44px] flex items-center"
                        >
                          Send us an email
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md">
                    <CardContent className="flex items-start gap-3 sm:gap-4 pt-4 sm:pt-6">
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-accent/10 flex-shrink-0">
                        <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base">Phone</h3>
                        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">+44(0)2070 524 680</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">+44(0)7427 603 733</p>
                        <a
                          href="tel:+442070524680"
                          className="mt-2 inline-block text-xs sm:text-sm text-primary hover:underline min-h-[44px] flex items-center"
                        >
                          Call us now
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md">
                    <CardContent className="flex items-start gap-3 sm:gap-4 pt-4 sm:pt-6">
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-secondary/10 flex-shrink-0">
                        <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base">Address</h3>
                        <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          UNIT 28 BEAUFORT COURT
                          <br />
                          ADMIRALS WAY, LONDON
                          <br />
                          E14 9XL
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md">
                    <CardContent className="flex items-start gap-3 sm:gap-4 pt-4 sm:pt-6">
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                        <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base">Business Hours</h3>
                        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                          Monday - Friday: 9:00 AM - 6:00 PM
                          <br />
                          Saturday: 10:00 AM - 4:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Send us a Message</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <div className="rounded-lg bg-accent/10 p-4 sm:p-6 text-center">
                        <CheckCircle2 className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-accent" />
                        <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold">Message Sent!</h3>
                        <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                          Thank you for contacting us. We'll get back to you soon.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm sm:text-base">Full Name *</Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              placeholder="John Doe"
                              className="min-h-[44px]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm sm:text-base">Email *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder="you@example.com"
                              className="min-h-[44px]"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm sm:text-base">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+44 20 1234 5678"
                            className="min-h-[44px]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-sm sm:text-base">Subject *</Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="How can we help?"
                            className="min-h-[44px]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-sm sm:text-base">Message *</Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="min-h-[120px] sm:min-h-[150px]"
                            placeholder="Tell us more about your inquiry..."
                          />
                        </div>
                        <Button type="submit" className="w-full min-h-[44px]" disabled={isSubmitting}>
                          {isSubmitting ? (
                            "Sending..."
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

