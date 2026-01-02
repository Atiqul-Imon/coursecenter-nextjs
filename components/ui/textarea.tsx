import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "font-body min-h-[100px] w-full rounded-lg border-2 border-input bg-background px-4 py-3 text-base",
        "placeholder:text-muted-foreground",
        "shadow-sm transition-all duration-200",
        "outline-none",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50",
        "resize-none",
        "md:text-sm",
        // Focus states
        "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:shadow-md focus-visible:shadow-primary/10",
        // Error states
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        // Hover states
        "hover:border-primary/50 hover:shadow-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
