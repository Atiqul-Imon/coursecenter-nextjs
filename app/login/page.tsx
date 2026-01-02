"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { LogIn, Mail, Lock, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const success = await login(email, password)
    if (success) {
      // Get user from localStorage to check role (login sets it synchronously)
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          if (userData.role === "ADMIN") {
            toast.success("Welcome back! Redirecting to admin panel...")
            setTimeout(() => router.push("/admin"), 500)
          } else {
            toast.success("Welcome back! Redirecting to dashboard...")
            setTimeout(() => router.push("/dashboard"), 500)
          }
        } catch (error) {
          // Fallback to dashboard if parsing fails
          toast.success("Welcome back! Redirecting to dashboard...")
          setTimeout(() => router.push("/dashboard"), 500)
        }
      } else {
        // Fallback to dashboard if user not found
        toast.success("Welcome back! Redirecting to dashboard...")
        setTimeout(() => router.push("/dashboard"), 500)
      }
    } else {
      setError("Invalid email or password")
      toast.error("Invalid email or password. Please try again.")
    }
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 sm:py-16 px-4">
        <div className="w-full max-w-md">
          <Card className="w-full border-gray-300 shadow-xl">
            <CardHeader className="space-y-3 pb-6 text-center">
              <div className="flex justify-center mb-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1E3A8A]/10">
                  <LogIn className="h-7 w-7 text-[#1E3A8A]" />
                </div>
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back</CardTitle>
              <CardDescription className="text-base text-gray-600">
                Sign in to your account to continue your journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="rounded-lg bg-red-50 border-2 border-red-200 p-4 text-sm text-red-800 flex items-start gap-2">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="flex-1">{error}</span>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 border-gray-300 focus:border-[#1E3A8A] focus:ring-[#1E3A8A] text-base"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Lock className="h-4 w-4 text-gray-500" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 border-gray-300 focus:border-[#1E3A8A] focus:ring-[#1E3A8A] text-base"
                  />
                </div>
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full bg-[#1E3A8A] hover:bg-[#1E40AF] text-white h-12 text-base font-semibold shadow-lg hover:shadow-xl" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Sign in
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-[#1E3A8A] hover:text-[#1E40AF] hover:underline font-semibold">
                    Create one now
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

