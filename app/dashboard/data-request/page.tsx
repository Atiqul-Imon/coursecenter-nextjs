"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Download, Trash2, FileText, AlertTriangle, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function DataRequestPage() {
  const [email, setEmail] = useState("")
  const [requestType, setRequestType] = useState<"access" | "deletion" | "portability" | null>(null)
  const [confirmDelete, setConfirmDelete] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [exportedData, setExportedData] = useState<any>(null)

  const handleExport = async () => {
    if (!email) {
      toast.error("Please enter your email address")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/gdpr/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setExportedData(data.data)
        toast.success("Your data has been exported successfully!")
        
        // Download as JSON file
        const blob = new Blob([JSON.stringify(data.data, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `course-centre-data-export-${new Date().toISOString()}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } else {
        toast.error(data.error || "Failed to export data")
      }
    } catch (error) {
      console.error("Error exporting data:", error)
      toast.error("Failed to export data. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!email) {
      toast.error("Please enter your email address")
      return
    }

    if (confirmDelete !== "DELETE") {
      toast.error("Please type 'DELETE' to confirm")
      return
    }

    if (!confirm("Are you absolutely sure? This action cannot be undone and will permanently delete all your data.")) {
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/gdpr/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, confirm: confirmDelete }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Your data has been deleted successfully.")
        setEmail("")
        setConfirmDelete("")
        setRequestType(null)
      } else {
        toast.error(data.error || "Failed to delete data")
      }
    } catch (error) {
      console.error("Error deleting data:", error)
      toast.error("Failed to delete data. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-8 w-8 text-white" />
              <h1 className="text-4xl font-bold text-white">GDPR Data Requests</h1>
            </div>
            <p className="text-white/90 text-lg">
              Exercise your rights under GDPR: access, export, or delete your personal data.
            </p>
          </div>
        </div>

        <div className="section-padding bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-6">
              {/* Information Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Your GDPR Rights</CardTitle>
                  <CardDescription>
                    Under the General Data Protection Regulation (GDPR), you have the right to:
                  </CardDescription>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <ul>
                    <li><strong>Right to Access:</strong> Request a copy of all personal data we hold about you</li>
                    <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
                    <li><strong>Right to Erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
                    <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                  </ul>
                  <p className="mt-4">
                    For more information, please read our{" "}
                    <Link href="/privacy" className="text-[#1E3A8A] hover:underline">
                      Privacy Policy
                    </Link>.
                  </p>
                </CardContent>
              </Card>

              {/* Email Input */}
              <Card>
                <CardHeader>
                  <CardTitle>Request Your Data</CardTitle>
                  <CardDescription>
                    Enter the email address associated with your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Export Data */}
                    <Card className="border-2">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Download className="h-5 w-5 text-[#1E3A8A]" />
                          Export Data
                        </CardTitle>
                        <CardDescription>
                          Download a copy of all your personal data
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          onClick={() => {
                            setRequestType("access")
                            handleExport()
                          }}
                          disabled={isSubmitting || !email}
                          className="w-full bg-[#1E3A8A] hover:bg-[#1E40AF] text-white"
                        >
                          {isSubmitting && requestType === "access" ? (
                            "Exporting..."
                          ) : (
                            <>
                              <Download className="mr-2 h-4 w-4" />
                              Export My Data
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Delete Data */}
                    <Card className="border-2 border-red-200">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2 text-red-600">
                          <Trash2 className="h-5 w-5" />
                          Delete Data
                        </CardTitle>
                        <CardDescription>
                          Permanently delete all your personal data
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {requestType === "deletion" ? (
                          <>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                              <div className="flex items-start gap-2">
                                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-red-800">
                                  <p className="font-semibold mb-1">Warning: This action cannot be undone!</p>
                                  <p>All your data will be permanently deleted, including:</p>
                                  <ul className="list-disc list-inside mt-1 space-y-1">
                                    <li>Your account and profile</li>
                                    <li>All applications</li>
                                    <li>Consultation records</li>
                                    <li>Messages and communications</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="confirmDelete">
                                Type <strong>DELETE</strong> to confirm:
                              </Label>
                              <Input
                                id="confirmDelete"
                                value={confirmDelete}
                                onChange={(e) => setConfirmDelete(e.target.value)}
                                placeholder="DELETE"
                                className="border-red-300"
                              />
                            </div>
                            <Button
                              onClick={handleDelete}
                              disabled={isSubmitting || confirmDelete !== "DELETE"}
                              variant="destructive"
                              className="w-full"
                            >
                              {isSubmitting ? (
                                "Deleting..."
                              ) : (
                                <>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Permanently Delete My Data
                                </>
                              )}
                            </Button>
                            <Button
                              onClick={() => {
                                setRequestType(null)
                                setConfirmDelete("")
                              }}
                              variant="outline"
                              className="w-full"
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Button
                            onClick={() => setRequestType("deletion")}
                            disabled={!email}
                            variant="outline"
                            className="w-full border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Request Deletion
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    If you have questions about your data or need assistance with your request, please contact us:
                  </p>
                  <div className="space-y-2">
                    <p>
                      <strong>Email:</strong>{" "}
                      <a href="mailto:privacy@coursecentre.co.uk" className="text-[#1E3A8A] hover:underline">
                        privacy@coursecentre.co.uk
                      </a>
                    </p>
                    <p className="text-xs text-gray-500">
                      We typically respond to GDPR requests within 30 days as required by law.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

