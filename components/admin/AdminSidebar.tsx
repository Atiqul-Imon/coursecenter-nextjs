"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  Calendar,
  Settings,
  BarChart3,
  MessageSquare,
  GraduationCap,
  Building2,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Shield,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface MenuItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Courses",
    href: "/admin/courses",
    icon: BookOpen,
  },
  {
    title: "Universities",
    href: "/admin/universities",
    icon: Building2,
  },
  {
    title: "Applications",
    href: "/admin/applications",
    icon: FileText,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Consultations",
    href: "/admin/consultations",
    icon: Calendar,
  },
  {
    title: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
  },
      {
        title: "GDPR Requests",
        href: "/admin/gdpr",
        icon: Shield,
      },
      {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-3 sm:top-4 left-3 sm:left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-background min-h-[44px] min-w-[44px]"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 border-r bg-gradient-to-b from-[#1E3A8A] to-[#1E40AF] text-white lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo/Header */}
          <div className="border-b border-white/10 p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm flex-shrink-0">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-bold truncate">Course Centre</h2>
                <p className="text-xs text-white/70">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive =
                pathname === item.href || pathname?.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "group flex items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm font-medium min-h-[44px]",
                    isActive
                      ? "bg-white/25 text-white shadow-lg shadow-white/20"
                      : "text-white/90 hover:bg-white/15 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </div>
                  {isActive && (
                    <ChevronRight className="h-4 w-4 text-white/60 flex-shrink-0" />
                  )}
                  {item.badge && (
                    <span className="ml-auto rounded-full bg-[#F59E0B] px-2 py-0.5 text-xs font-semibold text-white flex-shrink-0">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User Section */}
          <div className="border-t border-white/10 p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-3">
              <Avatar className="h-9 w-9 sm:h-10 sm:w-10 border-2 border-white/20 flex-shrink-0">
                <AvatarFallback className="bg-white/10 text-white">
                  {user?.name?.charAt(0).toUpperCase() ||
                    user?.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-white truncate">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-white/70 truncate">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={logout}
              className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10 min-h-[44px] text-sm"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
