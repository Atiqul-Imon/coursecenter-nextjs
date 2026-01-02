"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, Calendar, BookOpen, CheckCircle2 } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold">Welcome back, {user.name || "Student"}!</h1>
            <p className="font-body text-muted-foreground">Here's an overview of your application journey</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card variant="elevated" className="group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-display text-sm font-semibold">Applications</CardTitle>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="font-display text-3xl font-bold">0</div>
                <p className="font-body text-xs text-muted-foreground mt-1">Total applications</p>
              </CardContent>
            </Card>

            <Card variant="elevated" className="group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-display text-sm font-semibold">Consultations</CardTitle>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <Calendar className="h-5 w-5 text-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="font-display text-3xl font-bold">0</div>
                <p className="font-body text-xs text-muted-foreground mt-1">Scheduled</p>
              </CardContent>
            </Card>

            <Card variant="elevated" className="group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-display text-sm font-semibold">Courses</CardTitle>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                  <BookOpen className="h-5 w-5 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="font-display text-3xl font-bold">0</div>
                <p className="font-body text-xs text-muted-foreground mt-1">Saved courses</p>
              </CardContent>
            </Card>

            <Card variant="elevated" className="group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-display text-sm font-semibold">Documents</CardTitle>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="font-display text-3xl font-bold">0</div>
                <p className="font-body text-xs text-muted-foreground mt-1">Uploaded</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="font-display text-xl font-bold">Quick Actions</CardTitle>
                <CardDescription className="font-body">Get started with your application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full" variant="outline">
                  <Link href="/courses">Browse Courses</Link>
                </Button>
                <Button asChild className="w-full" variant="default">
                  <Link href="/dashboard/applications/new">Start New Application</Link>
                </Button>
                <Button asChild className="w-full" variant="outline">
                  <Link href="/dashboard/consultations/new">Book Consultation</Link>
                </Button>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="font-display text-xl font-bold">Application Status</CardTitle>
                <CardDescription className="font-body">Track your application progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="font-body text-muted-foreground">No applications yet</p>
                  <Button asChild variant="gradient" className="mt-4">
                    <Link href="/dashboard/applications/new">Create Your First Application</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

