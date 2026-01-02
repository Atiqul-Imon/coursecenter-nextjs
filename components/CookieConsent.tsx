"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Settings, Cookie } from "lucide-react"
import Link from "next/link"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    }))
    setShowBanner(false)
    // Trigger any analytics initialization here
  }

  const handleRejectAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    }))
    setShowBanner(false)
  }

  const handleCustomize = () => {
    setShowPreferences(true)
  }

  const handleSavePreferences = (preferences: { necessary: boolean; analytics: boolean; marketing: boolean }) => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      ...preferences,
      necessary: true, // Always true
      timestamp: new Date().toISOString(),
    }))
    setShowBanner(false)
    setShowPreferences(false)
  }

  if (!showBanner && !showPreferences) {
    return null
  }

  return (
    <>
      {/* Cookie Consent Banner */}
      {showBanner && !showPreferences && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-white border-t border-gray-200 shadow-lg">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <Cookie className="h-4 w-4 sm:h-5 sm:w-5 text-[#1E3A8A] flex-shrink-0" />
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900">We use cookies</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                  By clicking "Accept All", you consent to our use of cookies.{" "}
                  <Link href="/privacy#cookies" className="text-[#1E3A8A] hover:underline font-medium">
                    Learn more
                  </Link>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button
                  onClick={handleRejectAll}
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto whitespace-nowrap min-h-[44px]"
                >
                  Reject All
                </Button>
                <Button
                  onClick={handleCustomize}
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto whitespace-nowrap min-h-[44px]"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Customize
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  size="sm"
                  className="w-full sm:w-auto bg-[#1E3A8A] hover:bg-[#1E40AF] text-white whitespace-nowrap min-h-[44px]"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-0 sm:m-4">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Cookie className="h-4 w-4 sm:h-5 sm:w-5 text-[#1E3A8A] flex-shrink-0" />
                  <CardTitle className="text-lg sm:text-xl">Cookie Preferences</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowPreferences(false)
                    if (!localStorage.getItem("cookie-consent")) {
                      setShowBanner(true)
                    }
                  }}
                  className="min-h-[44px] min-w-[44px] flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription className="text-xs sm:text-sm mt-2">
                Manage your cookie preferences. You can enable or disable different types of cookies below.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <CookiePreferencesForm
                onSave={handleSavePreferences}
                onCancel={() => {
                  setShowPreferences(false)
                  if (!localStorage.getItem("cookie-consent")) {
                    setShowBanner(true)
                  }
                }}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

function CookiePreferencesForm({
  onSave,
  onCancel,
}: {
  onSave: (prefs: { necessary: boolean; analytics: boolean; marketing: boolean }) => void
  onCancel: () => void
}) {
  const [preferences, setPreferences] = useState({
    necessary: true, // Always enabled
    analytics: false,
    marketing: false,
  })

  const handleToggle = (key: "analytics" | "marketing") => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Necessary Cookies */}
      <div className="border rounded-lg p-3 sm:p-4">
        <div className="flex items-start justify-between gap-3 sm:gap-4 mb-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm sm:text-base text-gray-900">Necessary Cookies</h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              These cookies are essential for the website to function properly. They cannot be disabled.
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="relative inline-flex h-7 w-12 sm:h-6 sm:w-11 items-center rounded-full bg-[#1E3A8A] cursor-not-allowed min-h-[44px] min-w-[48px] sm:min-h-[24px] sm:min-w-[44px]">
              <span className="inline-block h-5 w-5 sm:h-4 sm:w-4 translate-x-6 sm:translate-x-6 transform rounded-full bg-white transition" />
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Used for authentication, security, and basic website functionality.
        </p>
      </div>

      {/* Analytics Cookies */}
      <div className="border rounded-lg p-3 sm:p-4">
        <div className="flex items-start justify-between gap-3 sm:gap-4 mb-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm sm:text-base text-gray-900">Analytics Cookies</h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              These cookies help us understand how visitors interact with our website.
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={() => handleToggle("analytics")}
              className={`relative inline-flex h-7 w-12 sm:h-6 sm:w-11 items-center rounded-full transition-colors min-h-[44px] min-w-[48px] sm:min-h-[24px] sm:min-w-[44px] ${
                preferences.analytics ? "bg-[#1E3A8A]" : "bg-gray-200"
              }`}
              aria-label={preferences.analytics ? "Disable analytics cookies" : "Enable analytics cookies"}
            >
              <span
                className={`inline-block h-5 w-5 sm:h-4 sm:w-4 transform rounded-full bg-white transition ${
                  preferences.analytics ? "translate-x-6 sm:translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Used to collect information about website usage and performance.
        </p>
      </div>

      {/* Marketing Cookies */}
      <div className="border rounded-lg p-3 sm:p-4">
        <div className="flex items-start justify-between gap-3 sm:gap-4 mb-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm sm:text-base text-gray-900">Marketing Cookies</h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              These cookies are used to deliver personalized advertisements and track campaign effectiveness.
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={() => handleToggle("marketing")}
              className={`relative inline-flex h-7 w-12 sm:h-6 sm:w-11 items-center rounded-full transition-colors min-h-[44px] min-w-[48px] sm:min-h-[24px] sm:min-w-[44px] ${
                preferences.marketing ? "bg-[#1E3A8A]" : "bg-gray-200"
              }`}
              aria-label={preferences.marketing ? "Disable marketing cookies" : "Enable marketing cookies"}
            >
              <span
                className={`inline-block h-5 w-5 sm:h-4 sm:w-4 transform rounded-full bg-white transition ${
                  preferences.marketing ? "translate-x-6 sm:translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Used to track visitors across websites for marketing purposes.
        </p>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onCancel} className="w-full sm:w-auto min-h-[44px]">
          Cancel
        </Button>
        <Button
          onClick={() => onSave(preferences)}
          className="w-full sm:w-auto bg-[#1E3A8A] hover:bg-[#1E40AF] text-white min-h-[44px]"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  )
}

