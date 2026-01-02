"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { GraduationCap, Menu, X, User, LogOut } from "lucide-react"

export function Header() {
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigationLinks = [
    { href: "/", label: "HOME" },
    { href: "/courses", label: "COURSES" },
    { href: "/services", label: "SERVICES" },
    { href: "/about", label: "ABOUT US" },
    { href: "/contact", label: "CONTACT US" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1E3A8A] shadow-lg">
      <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo - NextBrit Style - Mobile Optimized */}
        <Link href="/" className="flex items-center space-x-3 flex-shrink-0 min-w-0">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-white flex-shrink-0">
            <GraduationCap className="h-4 w-4 sm:h-6 sm:w-6 text-[#1E3A8A]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-white whitespace-nowrap">COURSE</span>
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#F59E0B] whitespace-nowrap">CENTRE</span>
            </div>
            <div className="text-[10px] sm:text-xs text-white/80 whitespace-nowrap">Academy</div>
          </div>
        </Link>

        {/* Desktop Navigation - NextBrit Style */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white font-semibold hover:text-[#F59E0B] text-sm lg:text-base"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side - Desktop & Mobile */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {user.role === "ADMIN" && (
                  <Link 
                    href="/admin"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold h-10 px-5 py-2.5 border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#1E3A8A] shadow-md hover:shadow-lg min-h-[44px]"
                  >
                    Admin Panel
                  </Link>
                )}
                {user.role === "STUDENT" && (
                  <Link 
                    href="/dashboard"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold h-10 px-5 py-2.5 border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#1E3A8A] shadow-md hover:shadow-lg min-h-[44px]"
                  >
                    Dashboard
                  </Link>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full min-h-[44px] min-w-[44px]">
                      <Avatar>
                        <AvatarFallback className="bg-[#F59E0B] text-white">
                          {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user.name || "User"}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" className="text-white hover:bg-white/10 min-h-[44px]">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold px-6 min-h-[44px]">
                  <Link href="/register">ENROLL NOW</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10 min-h-[44px] min-w-[44px]"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[400px] bg-white">
              <SheetHeader className="border-b pb-4">
                <SheetTitle className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1E3A8A]">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-[#1E3A8A]">COURSE</span>
                      <span className="text-xl font-bold text-[#F59E0B]">CENTRE</span>
                    </div>
                    <div className="text-xs text-gray-600">Academy</div>
                  </div>
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col mt-6 space-y-1">
                {navigationLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center px-4 py-3 text-base font-semibold text-gray-900 hover:bg-[#1E3A8A]/10 hover:text-[#1E3A8A] rounded-lg transition-colors min-h-[44px]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              {/* Mobile User Section */}
              <div className="mt-8 pt-8 border-t">
                {user ? (
                  <div className="space-y-4">
                    {/* User Info */}
                    <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-[#F59E0B] text-white">
                          {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user.name || "User"}
                        </p>
                        <p className="text-xs text-gray-600 truncate">{user.email}</p>
                      </div>
                    </div>

                    {/* User Actions */}
                    {user.role === "ADMIN" && (
                      <SheetClose asChild>
                        <Link
                          href="/admin"
                          className="flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] rounded-lg transition-colors min-h-[44px]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      </SheetClose>
                    )}
                    {user.role === "STUDENT" && (
                      <SheetClose asChild>
                        <Link
                          href="/dashboard"
                          className="flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] rounded-lg transition-colors min-h-[44px]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                      </SheetClose>
                    )}
                    <SheetClose asChild>
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User className="h-5 w-5 mr-3" />
                        Profile
                      </Link>
                    </SheetClose>
                    <button
                      onClick={() => {
                        logout()
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center w-full px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors min-h-[44px]"
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <SheetClose asChild>
                      <Link
                        href="/login"
                        className="flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-[#1E3A8A] border-2 border-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white rounded-lg transition-colors min-h-[44px]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/register"
                        className="flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white bg-[#F59E0B] hover:bg-[#D97706] rounded-lg transition-colors min-h-[44px]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        ENROLL NOW
                      </Link>
                    </SheetClose>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
