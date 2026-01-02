"use client"

import { motion } from "framer-motion"

interface DecorativeCircleProps {
  size?: number
  className?: string
  delay?: number
}

export function DecorativeCircle({ size = 200, className = "", delay = 0 }: DecorativeCircleProps) {
  return (
    <motion.div
      className={`absolute rounded-full bg-primary/10 blur-3xl ${className}`}
      style={{ width: size, height: size }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  )
}

interface DecorativeParticlesProps {
  count?: number
  className?: string
}

export function DecorativeParticles({ count = 20, className = "" }: DecorativeParticlesProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

interface DecorativeSemiCircleProps {
  size?: number
  position?: "top-right" | "bottom-left" | "top-left" | "bottom-right"
  className?: string
}

export function DecorativeSemiCircle({
  size = 400,
  position = "top-right",
  className = "",
}: DecorativeSemiCircleProps) {
  const positions = {
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
  }

  return (
    <div
      className={`absolute ${positions[position]} w-${size} h-${size} rounded-full bg-primary/10 blur-3xl ${className}`}
      style={{
        width: size,
        height: size,
        transform: position.includes("right") ? "translate(50%, -50%)" : "translate(-50%, 50%)",
      }}
    />
  )
}

interface DecorativeGridProps {
  className?: string
  opacity?: number
}

export function DecorativeGrid({ className = "", opacity = 0.05 }: DecorativeGridProps) {
  return (
    <div
      className={`absolute inset-0 bg-grid-pattern opacity-[${opacity}] ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(to right, currentColor 1px, transparent 1px),
          linear-gradient(to bottom, currentColor 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    />
  )
}

interface DecorativeWaveProps {
  className?: string
  color?: string
}

export function DecorativeWave({ className = "", color = "primary" }: DecorativeWaveProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="absolute bottom-0 w-full h-24"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,60 C300,20 600,100 900,60 C1050,40 1150,80 1200,60 L1200,120 L0,120 Z"
          className={`fill-${color}/10`}
        />
      </svg>
    </div>
  )
}


