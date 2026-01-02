import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, FileText, Calendar, LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Users,
  BookOpen,
  FileText,
  Calendar,
}

interface AdminStatCardProps {
  stat: {
    title: string
    value: number
    description: string
    iconName: string
    color?: string
    bgColor?: string
  }
  index: number
}

export function AdminStatCard({ stat, index }: AdminStatCardProps) {
  const Icon = iconMap[stat.iconName] || Users
  const color = stat.color || "text-[#1E3A8A]"
  const bgColor = stat.bgColor || "bg-[#1E3A8A]/10"

  return (
    <Card className="border-gray-300 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-semibold text-gray-900">{stat.title}</CardTitle>
        <div className={`rounded-lg ${bgColor} p-2`}>
          <Icon className={`h-4 w-4 ${color}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</div>
        <p className="mt-1 text-xs text-gray-600">{stat.description}</p>
      </CardContent>
    </Card>
  )
}
