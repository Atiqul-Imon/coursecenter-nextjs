"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, Plus, User } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function AdminHeader() {
  const { user, logout } = useAuth()

  return (
      <header className="sticky top-0 z-30 border-b border-gray-300 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-md">
      <div className="flex h-14 sm:h-16 items-center gap-2 sm:gap-4 px-3 sm:px-4 md:px-6">
        {/* Search Bar */}
        <div className="flex flex-1 items-center gap-2 sm:gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2 sm:left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:pl-10 h-9 sm:h-10 bg-gray-50 border-gray-300 focus:bg-white focus:border-gray-400 text-sm sm:text-base min-h-[44px]"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Add Button */}
          <Link 
            href="/admin/courses/new" 
            className="hidden sm:inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-xs font-semibold h-8 px-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-sm hover:shadow-md min-h-[44px]"
          >
            <Plus className="h-4 w-4 text-white" />
            <span className="text-white">New Course</span>
          </Link>
          {/* Mobile Icon-only Button */}
          <Link 
            href="/admin/courses/new" 
            className="sm:hidden inline-flex items-center justify-center rounded-md bg-[#F59E0B] text-white h-9 w-9 min-h-[44px] min-w-[44px]"
          >
            <Plus className="h-5 w-5" />
          </Link>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10 min-h-[44px] min-w-[44px]">
                <Bell className="h-5 w-5 text-gray-600" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[calc(100vw-2rem)] sm:w-80 max-w-sm">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  You have 3 new notifications
                </p>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-2 w-full">
                    <div className="h-2 w-2 rounded-full bg-[#F59E0B]"></div>
                    <span className="font-medium text-sm">New Application</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      2m ago
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    John Doe submitted an application
                  </p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-2 w-full">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span className="font-medium text-sm">New User</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      5m ago
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    A new user registered
                  </p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-2 w-full">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="font-medium text-sm">Consultation</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      1h ago
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    New consultation scheduled
                  </p>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-[#1E3A8A] font-medium">
                View all notifications
              </DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full min-h-[44px] min-w-[44px]">
                <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
                  <AvatarFallback className="bg-[#1E3A8A] text-white font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || user?.email.charAt(0).toUpperCase() || "A"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[calc(100vw-2rem)] sm:w-56 max-w-xs">
              <div className="px-2 py-1.5">
                <p className="text-sm font-semibold text-gray-900">{user?.name || "Admin"}</p>
                <p className="text-xs text-gray-600">{user?.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="text-gray-700 hover:text-gray-900">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/settings" className="text-gray-700 hover:text-gray-900">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={logout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
