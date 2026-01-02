"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cookie, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function CookiePreferencesPage() {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Load saved preferences
    const saved = localStorage.getItem("cookie-consent")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setPreferences({
          necessary: true,
          analytics: parsed.analytics || false,
          marketing: parsed.marketing || false,
        })
      } catch (e) {
        // Invalid saved data, use defaults
      }
    }
  }, [])

  const handleToggle = (key: "analytics" | "marketing") => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
    setSaved(false)
  }

  const handleSave = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      ...preferences,
      necessary: true,
      timestamp: new Date().toISOString(),
    }))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    setPreferences(allAccepted)
    localStorage.setItem("cookie-consent", JSON.stringify({
      ...allAccepted,
      timestamp: new Date().toISOString(),
    }))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleRejectAll = () => {
    const allRejected = {
      necessary: true,
      analytics: false,
      marketing: false,
    }
    setPreferences(allRejected)
    localStorage.setItem("cookie-consent", JSON.stringify({
      ...allRejected,
      timestamp: new Date().toISOString(),
    }))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="h-8 w-8 text-white" />
              <h1 className="text-4xl font-bold text-white">Cookie Preferences</h1>
            </div>
            <p className="text-white/90 text-lg">
              Manage your cookie preferences and control how we use cookies on our website.
            </p>
          </div>
        </div>

        <div className="section-padding bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About Cookies</CardTitle>
                  <CardDescription>
                    Cookies are small text files stored on your device when you visit our website. 
                    They help us provide you with a better experience and understand how you use our site.
                  </CardDescription>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    For more information about how we use cookies, please read our{" "}
                    <Link href="/privacy#cookies" className="text-[#1E3A8A] hover:underline">
                      Privacy Policy
                    </Link>.
                  </p>
                </CardContent>
              </Card>

              {/* Necessary Cookies */}
              <Card>
                <CardHeader>
                  <CardTitle>Necessary Cookies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <p className="font-semibold mb-2">Always Active</p>
                      <p className="text-sm text-gray-600">
                        These cookies are essential for the website to function properly. They cannot be disabled.
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Used for authentication, security, and basic website functionality.
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#1E3A8A] cursor-not-allowed">
                        <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Analytics Cookies */}
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Cookies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <p className="font-semibold mb-2">Help us improve</p>
                      <p className="text-sm text-gray-600">
                        These cookies help us understand how visitors interact with our website by collecting 
                        and reporting information anonymously.
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Used to analyze website usage and performance.
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <button
                        type="button"
                        onClick={() => handleToggle("analytics")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences.analytics ? "bg-[#1E3A8A]" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            preferences.analytics ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Marketing Cookies */}
              <Card>
                <CardHeader>
                  <CardTitle>Marketing Cookies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <p className="font-semibold mb-2">Personalized advertising</p>
                      <p className="text-sm text-gray-600">
                        These cookies are used to deliver personalized advertisements and track campaign effectiveness.
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Used to track visitors across websites for marketing purposes.
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <button
                        type="button"
                        onClick={() => handleToggle("marketing")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences.marketing ? "bg-[#1E3A8A]" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            preferences.marketing ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Button
                  onClick={handleRejectAll}
                  variant="outline"
                  className="flex-1 min-w-[150px]"
                >
                  Reject All
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex-1 min-w-[150px] bg-[#1E3A8A] hover:bg-[#1E40AF] text-white"
                >
                  {saved ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Saved
                    </>
                  ) : (
                    "Save Preferences"
                  )}
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  variant="outline"
                  className="flex-1 min-w-[150px]"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}


