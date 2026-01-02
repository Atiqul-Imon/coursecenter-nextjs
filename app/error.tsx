"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { AlertCircle, Home, RefreshCw, Mail } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console or error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-red-100 rounded-full blur-xl"></div>
                <div className="relative bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-full">
                  <AlertCircle className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Something Went Wrong
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-2 max-w-2xl mx-auto leading-relaxed">
              We encountered an unexpected error. Our team has been notified and is working to fix it.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Error: {error.message || "An unknown error occurred"}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button
                onClick={reset}
                size="lg"
                className="px-8 py-6 text-lg font-semibold bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Try Again
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg font-semibold border-2 border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white transition-all duration-300"
              >
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Link>
              </Button>
            </div>

            {/* Support Section */}
            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-600 mb-4">
                If the problem persists, please contact our support team:
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white"
              >
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}


