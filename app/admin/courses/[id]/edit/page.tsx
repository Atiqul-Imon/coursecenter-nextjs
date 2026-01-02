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
import { notFound } from "next/navigation"

interface University {
  id: string
  name: string
}

interface Course {
  id: string
  title: string
  description: string | null
  shortDescription: string | null
  universityId: string
  level: string
  duration: number
  tuitionFee: number
  currency: string
  intakeMonths: string[]
  entryRequirements: string | null
  language: string
  image: string | null
  isActive: boolean
  categories: Array<{ category: string }>
}

export default function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [courseId, setCourseId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [universities, setUniversities] = useState<University[]>([])
  const [course, setCourse] = useState<Course | null>(null)
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
    params.then((p) => setCourseId(p.id))
  }, [params])

  useEffect(() => {
    async function fetchData() {
      if (!courseId) return

      try {
        const [courseRes, universitiesRes] = await Promise.all([
          fetch(`/api/admin/courses/${courseId}`),
          fetch("/api/admin/universities"),
        ])

        if (courseRes.ok) {
          const courseData = await courseRes.json()
          setCourse(courseData)
          setImageUrl(courseData.image)
          setFormData({
            title: courseData.title || "",
            description: courseData.description || "",
            shortDescription: courseData.shortDescription || "",
            universityId: courseData.universityId || "",
            level: courseData.level || "UNDERGRADUATE",
            duration: courseData.duration?.toString() || "3",
            tuitionFee: courseData.tuitionFee?.toString() || "",
            currency: courseData.currency || "GBP",
            intakeMonths: courseData.intakeMonths?.join(",") || "September,January",
            entryRequirements: courseData.entryRequirements || "",
            language: courseData.language || "English",
            isActive: courseData.isActive ? "true" : "false",
            categories: courseData.categories?.map((c: any) => c.category).join(",") || "",
          })
        } else {
          toast.error("Course not found")
          router.push("/admin/courses")
        }

        if (universitiesRes.ok) {
          const universitiesData = await universitiesRes.json()
          setUniversities(universitiesData)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load course")
      } finally {
        setIsLoading(false)
      }
    }

    if (courseId) {
      fetchData()
    }
  }, [courseId, router])

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
    if (!courseId) return

    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })
      
      // Handle image
      if (imageUrl && imageUrl !== course?.image) {
        // New image uploaded
        formDataToSend.append("image", imageUrl)
      } else if (!imageUrl && course?.image) {
        // Image removed
        formDataToSend.append("removeImage", "true")
      }

      const response = await fetch(`/api/admin/courses/${courseId}`, {
        method: "PUT",
        body: formDataToSend,
      })

      if (response.ok) {
        toast.success("Course updated successfully!")
        router.refresh()
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to update course")
      }
    } catch (error) {
      console.error("Error updating course:", error)
      toast.error("Failed to update course")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3A8A] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return null
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/courses">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Course</h1>
          <p className="text-muted-foreground">Update course information</p>
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
                  <Label htmlFor="title">Course Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Bachelor of Science in Computer Science"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description *</Label>
                  <Textarea
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Brief description (shown on course cards)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Full Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Detailed course description"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="universityId">University</Label>
                  <select
                    id="universityId"
                    name="universityId"
                    value={formData.universityId}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                    <Label htmlFor="level">Level *</Label>
                    <select
                      id="level"
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
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
                    <Label htmlFor="duration">Duration (Years) *</Label>
                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      min="1"
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
                  <Label htmlFor="language">Language</Label>
                  <Input
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    placeholder="English"
                  />
                </div>

                <div className="flex items-center space-x-2">
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
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="isActive" className="cursor-pointer">
                    Active (visible on website)
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                asChild
                className="flex-1"
              >
                <Link href="/admin/courses">Cancel</Link>
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#F59E0B] hover:bg-[#D97706]"
              >
                {isSubmitting ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
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

