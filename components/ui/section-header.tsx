import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  className?: string
  children?: ReactNode
  variant?: "default" | "centered" | "left"
}

export function SectionHeader({
  title,
  subtitle,
  description,
  className,
  children,
  variant = "default",
}: SectionHeaderProps) {
  const alignment = {
    default: "text-left",
    centered: "text-center mx-auto",
    left: "text-left",
  }[variant]

  return (
    <div className={cn("space-y-4", variant === "centered" && "max-w-3xl mx-auto", className)}>
      {subtitle && (
        <p className={cn("font-display text-sm font-semibold text-primary uppercase tracking-wide", alignment)}>
          {subtitle}
        </p>
      )}
      <h2 className={cn("font-display text-3xl sm:text-4xl md:text-5xl font-bold", alignment)}>
        {title}
      </h2>
      {description && (
        <p className={cn("font-body text-lg text-muted-foreground leading-relaxed", alignment)}>
          {description}
        </p>
      )}
      {children && <div className={cn("pt-2", alignment === "text-center mx-auto" && "flex justify-center")}>{children}</div>}
    </div>
  )
}


