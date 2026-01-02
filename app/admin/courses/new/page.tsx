"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/admin/ImageUpload"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface University {
  id: string
  name: string
}

export default function NewCoursePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [universities, setUniversities] = useState<University[]>([])
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    universityId: "",
    level: "UNDERGRADUATE",
    duration: "3",
    tuitionFee: "",
    currency: "GBP",
    intakeMonths: "September,January",
    entryRequirements: "",
    language: "English",
    isActive: "true",
    categories: "",
  })

  useEffect(() => {
    async function fetchUniversities() {
      try {
        const response = await fetch("/api/admin/universities")
        if (response.ok) {
          const data = await response.json()
          setUniversities(data)
        }
      } catch (error) {
        console.error("Error fetching universities:", error)
      }
    }
    fetchUniversities()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })
      if (imageUrl) {
        formDataToSend.append("image", imageUrl)
      }

      const response = await fetch("/api/admin/courses", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        const data = await response.json()
        toast.success("Course created successfully!")
        router.push(`/admin/courses/${data.course.id}/edit`)
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to create course")
      }
    } catch (error) {
      console.error("Error creating course:", error)
      toast.error("Failed to create course")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 sm:gap-4">
        <Button variant="ghost" size="icon" asChild className="min-h-[44px] min-w-[44px]">
          <Link href="/admin/courses">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Create New Course</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Add a new course to the system</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm sm:text-base">Course Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Bachelor of Science in Computer Science"
                    className="min-h-[44px] text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription" className="text-sm sm:text-base">Short Description *</Label>
                  <Textarea
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Brief description (shown on course cards)"
                    className="min-h-[80px] text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm sm:text-base">Full Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Detailed course description"
                    className="min-h-[120px] text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="universityId" className="text-sm sm:text-base">University</Label>
                  <select
                    id="universityId"
                    name="universityId"
                    value={formData.universityId}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]"
                  >
                    <option value="">Select University (Optional)</option>
                    {universities.map((uni) => (
                      <option key={uni.id} value={uni.id}>
                        {uni.name}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Course Details */}
            <Card>
              <CardHeader>
                <CardTitle>Course Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="level" className="text-sm sm:text-base">Level *</Label>
                    <select
                      id="level"
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[44px]"
                    >
                      <option value="FOUNDATION">Foundation</option>
                      <option value="UNDERGRADUATE">Undergraduate</option>
                      <option value="POSTGRADUATE">Postgraduate</option>
                      <option value="PHD">PhD</option>
                      <option value="CERTIFICATE">Certificate</option>
                      <option value="DIPLOMA">Diploma</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-sm sm:text-base">Duration (Years) *</Label>
                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      min="1"
                      className="min-h-[44px] text-sm sm:text-base"
                      max="5"
                      value={formData.duration}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tuitionFee">Tuition Fee</Label>
                    <Input
                      id="tuitionFee"
                      name="tuitionFee"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.tuitionFee}
                      onChange={handleChange}
                      placeholder="25000 (Optional)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <select
                      id="currency"
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="GBP">GBP (£)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="intakeMonths">Intake Months (comma-separated)</Label>
                  <Input
                    id="intakeMonths"
                    name="intakeMonths"
                    value={formData.intakeMonths}
                    onChange={handleChange}
                    placeholder="September,January"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entryRequirements">Entry Requirements</Label>
                  <Textarea
                    id="entryRequirements"
                    name="entryRequirements"
                    value={formData.entryRequirements}
                    onChange={handleChange}
                    rows={4}
                    placeholder="A-Level: AAB including Mathematics. IELTS: 6.5 overall..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categories">Categories (comma-separated)</Label>
                  <Input
                    id="categories"
                    name="categories"
                    value={formData.categories}
                    onChange={handleChange}
                    placeholder="Business, Management, Undergraduate"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Course Image</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  value={imageUrl}
                  onChange={setImageUrl}
                  folder="courses"
                />
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-sm sm:text-base">Language</Label>
                  <Input
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    placeholder="English"
                    className="min-h-[44px] text-sm sm:text-base"
                  />
                </div>

                <div className="flex items-center space-x-2 min-h-[44px]">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive === "true"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        isActive: e.target.checked ? "true" : "false",
                      }))
                    }
                    className="h-5 w-5 rounded border-gray-300 min-h-[44px] min-w-[44px]"
                  />
                  <Label htmlFor="isActive" className="cursor-pointer text-sm sm:text-base">
                    Active (visible on website)
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                type="button"
                variant="outline"
                asChild
                className="w-full sm:flex-1 min-h-[44px]"
              >
                <Link href="/admin/courses">Cancel</Link>
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:flex-1 bg-[#F59E0B] hover:bg-[#D97706] min-h-[44px]"
              >
                {isSubmitting ? (
                  "Creating..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Create Course
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

