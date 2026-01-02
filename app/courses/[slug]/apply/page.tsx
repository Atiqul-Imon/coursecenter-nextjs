"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, ArrowLeft, X, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"

interface Course {
  id: string
  title: string
  slug: string
  level: string
  duration: number
  image?: string | null
  isActive?: boolean
  university?: {
    id: string
    name: string
  } | null
}

interface University {
  id: string
  name: string
}

export default function ApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>("")
  
  useEffect(() => {
    params.then((p) => setSlug(p.slug))
  }, [params])
  
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [universities, setUniversities] = useState<University[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredCourse: "",
    preferredUniversity: "",
    marketingConsent: false,
    privacyConsent: false,
  })

  // Fetch course data, all courses, and universities
  useEffect(() => {
    async function fetchData() {
      if (!slug) return
      try {
        const [courseRes, coursesRes, universitiesRes] = await Promise.all([
          fetch(`/api/courses/${slug}`),
          fetch("/api/admin/courses"),
          fetch("/api/admin/universities"),
        ])

        if (courseRes.ok) {
          const courseData = await courseRes.json()
          setCourse(courseData)
          // Pre-fill preferred course if coming from course page
          setFormData(prev => ({
            ...prev,
            preferredCourse: courseData.id,
          }))
        } else {
          toast.error("Course not found")
          router.push("/courses")
        }

        if (coursesRes.ok) {
          const coursesData = await coursesRes.json()
          setCourses(coursesData)
        }

        if (universitiesRes.ok) {
          const universitiesData = await universitiesRes.json()
          setUniversities(universitiesData)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load data")
        router.push("/courses")
      } finally {
        setIsLoading(false)
      }
    }

    if (slug) {
      fetchData()
    }
  }, [slug, router])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file")
        return
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB")
        return
      }
      setUploadedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setUploadedImage(null)
    setImagePreview(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.privacyConsent) {
      toast.error("You must agree to the Privacy Policy to submit your application")
      return
    }

    setIsSubmitting(true)

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData()
      if (course) {
        formDataToSend.append("courseId", course.id)
      }
      formDataToSend.append("firstName", formData.firstName)
      formDataToSend.append("lastName", formData.lastName)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("preferredCourse", formData.preferredCourse)
      formDataToSend.append("preferredUniversity", formData.preferredUniversity)
      formDataToSend.append("marketingConsent", formData.marketingConsent ? "true" : "false")
      formDataToSend.append("privacyConsent", formData.privacyConsent ? "true" : "false")
      
      if (uploadedImage) {
        formDataToSend.append("image", uploadedImage)
      }

      const response = await fetch("/api/applicants", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        toast.success("Application submitted successfully! We'll get back to you soon.")
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          preferredCourse: course?.id || "",
          preferredUniversity: "",
          marketingConsent: false,
          privacyConsent: false,
        })
        setUploadedImage(null)
        setImagePreview(null)
        // Optionally redirect after a delay
        setTimeout(() => {
          router.push("/courses")
        }, 2000)
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to submit application")
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      toast.error("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3A8A] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link href={course ? `/courses/${slug}` : "/courses"}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Link>
          </Button>

          {/* Course Info Card (if coming from specific course) */}
          {course && (
            <Card className="mb-6 sm:mb-8">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {course.image && (
                    <div className="relative w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 128px"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">{course.title}</h2>
                    {course.university && (
                      <p className="text-sm sm:text-base text-gray-600">{course.university.name}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Application Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Application Form</CardTitle>
              <p className="text-sm sm:text-base text-gray-600 mt-2">Fill in your details to apply</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Personal Information</h3>
                  <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                        className="min-h-[44px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+44 20 1234 5678"
                        className="min-h-[44px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Course & University Preferences */}
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Course & University Preferences</h3>
                  <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="preferredCourse">Preferred Course *</Label>
                      <select
                        id="preferredCourse"
                        name="preferredCourse"
                        value={formData.preferredCourse}
                        onChange={handleChange}
                        required
                        className="flex min-h-[44px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select Course</option>
                        {courses.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredUniversity">Preferred University *</Label>
                      <select
                        id="preferredUniversity"
                        name="preferredUniversity"
                        value={formData.preferredUniversity}
                        onChange={handleChange}
                        required
                        className="flex min-h-[44px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select University</option>
                        {universities.map((uni) => (
                          <option key={uni.id} value={uni.id}>
                            {uni.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Image Upload (Optional) */}
                <div className="space-y-2">
                  <Label>Upload Image (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6">
                    {imagePreview ? (
                      <div className="relative">
                        <div className="relative w-full h-48 sm:h-64 rounded-lg overflow-hidden mb-4">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={removeImage}
                          className="w-full min-h-[44px]"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Remove Image
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mb-3 sm:mb-4" />
                        <Label htmlFor="image" className="cursor-pointer">
                          <span className="text-xs sm:text-sm font-medium text-[#1E3A8A] hover:text-[#1E40AF]">
                            Click to upload an image
                          </span>
                          <span className="text-xs sm:text-sm text-gray-500"> or drag and drop</span>
                        </Label>
                        <p className="text-xs text-gray-500 mt-2">
                          PNG, JPG, GIF up to 5MB (Optional)
                        </p>
                        <Input
                          id="image"
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Consent Section */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Consent & Privacy</h3>
                  
                  {/* Marketing Consent */}
                  <div className="space-y-3">
                    <Label className="text-sm sm:text-base font-medium">
                      Do you consent to your information being used for marketing and promotional purposes?
                    </Label>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
                        <input
                          type="radio"
                          name="marketingConsent"
                          checked={formData.marketingConsent === true}
                          onChange={() => setFormData(prev => ({ ...prev, marketingConsent: true }))}
                          className="h-4 w-4 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                        />
                        <span className="text-sm">Yes, I consent</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
                        <input
                          type="radio"
                          name="marketingConsent"
                          checked={formData.marketingConsent === false}
                          onChange={() => setFormData(prev => ({ ...prev, marketingConsent: false }))}
                          className="h-4 w-4 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                        />
                        <span className="text-sm">No, I do not agree</span>
                      </label>
                    </div>
                  </div>

                  {/* Privacy Policy Consent */}
                  <div className="space-y-2">
                    <label className="flex items-start gap-3 cursor-pointer group min-h-[44px]">
                      <input
                        type="checkbox"
                        name="privacyConsent"
                        checked={formData.privacyConsent}
                        onChange={handleChange}
                        required
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#1E3A8A] focus:ring-[#1E3A8A] flex-shrink-0"
                      />
                      <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        I have read and agree to the{" "}
                        <Link href="/privacy" className="text-[#1E3A8A] hover:underline font-medium">
                          Privacy Policy
                        </Link>
                        {" "}and consent to COURSE CENTRE collecting and storing my required documents and personal details. *
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
                  <Button type="button" variant="outline" asChild className="w-full sm:w-auto min-h-[44px]">
                    <Link href={course ? `/courses/${slug}` : "/courses"}>Cancel</Link>
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-[#F59E0B] hover:bg-[#D97706] text-white min-h-[44px]"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
