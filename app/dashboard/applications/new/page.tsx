"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FileText, ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { toast } from "sonner"

export default function NewApplicationPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    courseId: "",
    intakeMonth: "",
    intakeYear: new Date().getFullYear().toString(),
    personalStatement: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // TODO: Implement application creation API
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    toast.success("Application created successfully!")
    router.push("/dashboard")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Button asChild variant="ghost" className="mb-6">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  New Application
                </CardTitle>
                <CardDescription>
                  Start a new application for your chosen course. You can save and continue later.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="courseId">Select Course *</Label>
                    <Select
                      value={formData.courseId}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, courseId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Computer Science - University of London</SelectItem>
                        <SelectItem value="2">Business Administration - Oxford University</SelectItem>
                        <SelectItem value="3">Engineering - Cambridge University</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Can't find your course? <Link href="/courses" className="text-primary hover:underline">Browse courses</Link>
                    </p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="intakeMonth">Intake Month *</Label>
                      <Select
                        value={formData.intakeMonth}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, intakeMonth: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="January">January</SelectItem>
                          <SelectItem value="September">September</SelectItem>
                          <SelectItem value="May">May</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="intakeYear">Intake Year *</Label>
                      <Input
                        id="intakeYear"
                        name="intakeYear"
                        type="number"
                        value={formData.intakeYear}
                        onChange={handleChange}
                        min={new Date().getFullYear()}
                        max={new Date().getFullYear() + 2}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="personalStatement">Personal Statement</Label>
                    <Textarea
                      id="personalStatement"
                      name="personalStatement"
                      value={formData.personalStatement}
                      onChange={handleChange}
                      rows={8}
                      placeholder="Write your personal statement here. Explain why you want to study this course and what makes you a suitable candidate..."
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      You can save this as a draft and complete it later.
                    </p>
                  </div>

                  <div className="rounded-lg border border-dashed p-6">
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm font-medium">Upload Documents</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        You can upload documents after creating the application
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" asChild>
                      <Link href="/dashboard">Save as Draft</Link>
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Creating..." : "Create Application"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

