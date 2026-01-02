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
import { UserPlus, User, Mail, Lock, ArrowRight, CheckCircle2 } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const router = useRouter()

  const passwordRequirements = [
    { met: password.length >= 6, text: "At least 6 characters" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    const success = await register(email, password, name)
    if (success) {
      toast.success("Account created successfully! Welcome to Course Centre.")
      setTimeout(() => router.push("/dashboard"), 500)
    } else {
      setError("Email already exists. Please use a different email or login.")
      toast.error("Email already exists. Please use a different email or login.")
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
                  <UserPlus className="h-7 w-7 text-[#1E3A8A]" />
                </div>
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">Create an account</CardTitle>
              <CardDescription className="text-base text-gray-600">
                Join Course Centre and start your educational journey today
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
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-12 border-gray-300 focus:border-[#1E3A8A] focus:ring-[#1E3A8A] text-base"
                  />
                </div>
                
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
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="h-12 border-gray-300 focus:border-[#1E3A8A] focus:ring-[#1E3A8A] text-base"
                  />
                  {password && (
                    <div className="mt-2 space-y-1.5">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <CheckCircle2 
                            className={`h-3.5 w-3.5 ${req.met ? 'text-green-600' : 'text-gray-300'}`} 
                          />
                          <span className={req.met ? 'text-green-700 font-medium' : 'text-gray-500'}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
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
                        Creating account...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Create account
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-[#1E3A8A] hover:text-[#1E40AF] hover:underline font-semibold">
                    Sign in here
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

