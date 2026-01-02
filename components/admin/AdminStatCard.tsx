"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, BookOpen, FileText, Calendar, LucideIcon } from "lucide-react"
import { AnimatedCounter } from "@/components/ui/animated-counter"

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
    trend: string
  }
  index: number
}

export function AdminStatCard({ stat, index }: AdminStatCardProps) {
  const Icon = iconMap[stat.iconName] || Users

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card className="group transition-all hover:shadow-lg hover:shadow-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <motion.div
              className="rounded-lg bg-primary/10 p-2 transition-all group-hover:bg-primary/20"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Icon className="h-4 w-4 text-primary" />
            </motion.div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold transition-all group-hover:scale-105">
              <AnimatedCounter value={stat.value} />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
            <div className="mt-3 flex items-center text-xs font-medium text-accent">
              <TrendingUp className="mr-1 h-3 w-3" />
              {stat.trend} from last month
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
