import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Home, Search, BookOpen, ArrowLeft, GraduationCap } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "404 - Page Not Found | Course Centre",
  description: "The page you're looking for doesn't exist.",
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center">
            {/* Decorative Elements */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-[#1E3A8A]/5 rounded-full blur-3xl"></div>
              </div>
              <div className="relative">
                {/* Large 404 */}
                <div className="text-9xl md:text-[12rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-[#F59E0B] leading-none mb-4">
                  404
                </div>
              </div>
            </div>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[#F59E0B]/20 rounded-full blur-xl"></div>
                <div className="relative bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] p-6 rounded-full">
                  <GraduationCap className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Oops! The page you're looking for seems to have wandered off. Don't worry, we'll help you find your way back to your educational journey.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                asChild
                size="lg"
                className="px-8 py-6 text-lg font-semibold bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg font-semibold border-2 border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white transition-all duration-300"
              >
                <Link href="/courses">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Browse Courses
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm font-semibold text-gray-700 mb-4">Quick Links:</p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <Link
                  href="/about"
                  className="text-[#1E3A8A] hover:text-[#F59E0B] transition-colors font-medium"
                >
                  About Us
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  href="/services"
                  className="text-[#1E3A8A] hover:text-[#F59E0B] transition-colors font-medium"
                >
                  Services
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  href="/contact"
                  className="text-[#1E3A8A] hover:text-[#F59E0B] transition-colors font-medium"
                >
                  Contact
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  href="/blog"
                  className="text-[#1E3A8A] hover:text-[#F59E0B] transition-colors font-medium"
                >
                  Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}


