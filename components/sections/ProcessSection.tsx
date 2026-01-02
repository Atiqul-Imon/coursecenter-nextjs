"use client"

import { MessageSquare, BookOpen, FileText, GraduationCap, CheckCircle2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useRef, useState, useEffect, useCallback, useMemo } from "react"

const steps = [
  {
    step: "01",
    title: "Understanding Your Ambition",
    description: "Your UK university journey begins by truly understanding your aspirations, strengths, and what matters most to you.",
    icon: MessageSquare,
  },
  {
    step: "02",
    title: "Building Your Bespoke Path",
    description: "We'll map out your unique path to success. From picking the ideal UK course to crafting a standout application.",
    icon: BookOpen,
  },
  {
    step: "03",
    title: "Making You Stand Out",
    description: "Our main goal is to ensure you feel absolutely confident and ready to impress your chosen UK universities with a brilliant, compelling application.",
    icon: FileText,
  },
  {
    step: "04",
    title: "Stress-Free Application",
    description: "We'll walk you through the entire application process, ensuring every form, document, and crucial deadline is handled with genuine care.",
    icon: Send,
  },
  {
    step: "05",
    title: "Choosing Your Perfect Offer",
    description: "Once those exciting offers roll in, Course Centre will guide you through picking the very best university and course.",
    icon: CheckCircle2,
  },
  {
    step: "06",
    title: "Your Successful Enrolment",
    description: "Time to celebrate your achievement! Course Centre will ensure you're fully ready to enrol and confidently begin your incredible UK university journey.",
    icon: GraduationCap,
  },
]

// Constants - Responsive card width
const getCardWidth = () => {
  if (typeof window === 'undefined') return 600
  if (window.innerWidth < 640) return Math.max(280, window.innerWidth - 32) // Mobile: full width minus padding
  if (window.innerWidth < 1024) return 500 // Tablet
  return 600 // Desktop
}
const CARD_GAP = 24
const MIN_SWIPE_DISTANCE = 30

export function ProcessSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [cardWidth, setCardWidth] = useState(600)

  // Update card width on resize
  useEffect(() => {
    const updateCardWidth = () => {
      setCardWidth(getCardWidth())
    }
    updateCardWidth()
    window.addEventListener('resize', updateCardWidth)
    return () => window.removeEventListener('resize', updateCardWidth)
  }, [])

  // Create infinite loop: [last, ...all, first, ...all(without first)]
  // This prevents duplicate "01" card
  const infiniteSteps = useMemo(() => [
    steps[steps.length - 1], // Index 0: Last card (for left side)
    ...steps,                 // Index 1-6: All cards (first set)
    steps[0],                 // Index 7: First card clone (for right side)
    ...steps.slice(1),        // Index 8-12: Cards 02-06 (no duplicate 01)
  ], [])

  // Calculate step index from array index
  const getStepIndex = useCallback((arrayIndex: number): number => {
    if (arrayIndex === 0) {
      return steps.length - 1 // Last card
    } else if (arrayIndex >= 1 && arrayIndex <= steps.length) {
      return arrayIndex - 1 // First set (0-5)
    } else if (arrayIndex === steps.length + 1) {
      return 0 // First card clone
    } else if (arrayIndex > steps.length + 1) {
      // Second set: maps to steps 1-5 (no duplicate 0)
      return arrayIndex - (steps.length + 2)
    }
    return 0
  }, [])

  // Calculate boundaries
  const boundaries = useMemo(() => {
    const currentCardWithGap = cardWidth + CARD_GAP
    const firstSetStart = 1 * currentCardWithGap
    const firstSetEnd = steps.length * currentCardWithGap
    const secondSetStart = (steps.length + 2) * currentCardWithGap
    const secondSetEnd = (steps.length * 2) * currentCardWithGap // 14 items total (0-13)
    return { firstSetStart, firstSetEnd, secondSetStart, secondSetEnd }
  }, [cardWidth])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Start at the first real card (index 1) - set without triggering events
    const startIndex = 1
    const currentCardWithGap = cardWidth + CARD_GAP
    const initialPosition = startIndex * currentCardWithGap
    
    // Set initial position without triggering scroll events
    container.scrollLeft = initialPosition
    setCurrentIndex(0)
    setScrollPosition(initialPosition)
    setIsScrolling(false)

    let rafId: number | null = null
    let isAdjusting = false
    let lastScrollPos = initialPosition
    let scrollTimeout: NodeJS.Timeout | null = null
    let isInitialized = false

    // Initialize after a brief delay to prevent auto-scroll on mount
    const initTimeout = setTimeout(() => {
      isInitialized = true
    }, 100)

    const handleScroll = () => {
      if (isAdjusting || !isInitialized) return

      const scrollPos = container.scrollLeft
      
      // Only update if position actually changed (user interaction)
      if (Math.abs(scrollPos - lastScrollPos) < 1) return
      
      lastScrollPos = scrollPos
      setScrollPosition(scrollPos)
      setIsScrolling(true)

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }

      // Calculate current step index
      const currentCardWithGap = cardWidth + CARD_GAP
      const cardIndex = Math.round(scrollPos / currentCardWithGap)
      const actualIndex = getStepIndex(cardIndex)
      setCurrentIndex(actualIndex)

      // Handle seamless loop boundaries with buffer
      const buffer = currentCardWithGap * 0.1 // 10% buffer to prevent premature jumps

      // When scrolling left past the first set, jump to corresponding position in second set
      if (scrollPos < boundaries.firstSetStart - buffer) {
        isAdjusting = true
        const offset = boundaries.firstSetStart - scrollPos
        const targetPos = boundaries.secondSetEnd - offset
        container.scrollLeft = targetPos
        setTimeout(() => {
          isAdjusting = false
        }, 10)
      }
      // When scrolling right past the second set, jump to corresponding position in first set
      else if (scrollPos > boundaries.secondSetEnd + buffer) {
        isAdjusting = true
        const offset = scrollPos - boundaries.secondSetEnd
        const targetPos = boundaries.firstSetStart + offset
        container.scrollLeft = targetPos
        setTimeout(() => {
          isAdjusting = false
        }, 10)
      }

      // Stop scrolling state after a delay
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    // Use scroll event instead of continuous RAF for better performance
    container.addEventListener('scroll', handleScroll, { passive: true })

    // Update scroll position only when actually scrolling (for animations)
    const updateScrollPosition = () => {
      if (container && !isAdjusting && isInitialized) {
        const currentPos = container.scrollLeft
        // Only update if position changed significantly (user is scrolling)
        if (Math.abs(currentPos - lastScrollPos) > 1) {
          setScrollPosition(currentPos)
          lastScrollPos = currentPos
        }
      }
      rafId = requestAnimationFrame(updateScrollPosition)
    }

    rafId = requestAnimationFrame(updateScrollPosition)

    return () => {
      clearTimeout(initTimeout)
      container.removeEventListener('scroll', handleScroll)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [cardWidth, boundaries, getStepIndex])

  // Touch handlers
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }, [])

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd || !scrollContainerRef.current) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE

    if (isLeftSwipe || isRightSwipe) {
      const currentScroll = scrollContainerRef.current.scrollLeft
      const currentCardWithGap = cardWidth + CARD_GAP
      const currentCardIndex = Math.round(currentScroll / currentCardWithGap)
      const targetIndex = isLeftSwipe ? currentCardIndex + 1 : currentCardIndex - 1
      
      scrollContainerRef.current.scrollTo({
        left: targetIndex * currentCardWithGap,
        behavior: 'smooth'
      })
    }
  }, [touchStart, touchEnd, cardWidth])

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    const rect = scrollContainerRef.current.getBoundingClientRect()
    setStartX(e.pageX - rect.left)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
    scrollContainerRef.current.style.cursor = 'grabbing'
    scrollContainerRef.current.style.userSelect = 'none'
    scrollContainerRef.current.style.scrollBehavior = 'auto'
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab'
      scrollContainerRef.current.style.userSelect = 'auto'
      scrollContainerRef.current.style.scrollBehavior = 'smooth'
      
      const scrollPosition = scrollContainerRef.current.scrollLeft
      const currentCardWithGap = cardWidth + CARD_GAP
      const nearestIndex = Math.round(scrollPosition / currentCardWithGap)
      scrollContainerRef.current.scrollTo({
        left: nearestIndex * currentCardWithGap,
        behavior: 'smooth'
      })
    }
  }, [cardWidth])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab'
      scrollContainerRef.current.style.userSelect = 'auto'
      scrollContainerRef.current.style.scrollBehavior = 'smooth'
      
      const scrollPosition = scrollContainerRef.current.scrollLeft
      const currentCardWithGap = cardWidth + CARD_GAP
      const nearestIndex = Math.round(scrollPosition / currentCardWithGap)
      scrollContainerRef.current.scrollTo({
        left: nearestIndex * currentCardWithGap,
        behavior: 'smooth'
      })
    }
  }, [cardWidth])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    const rect = scrollContainerRef.current.getBoundingClientRect()
    const x = e.pageX - rect.left
    const walk = (x - startX) * 2.5
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }, [isDragging, startX, scrollLeft])

  const scrollToIndex = useCallback((targetIndex: number) => {
    if (!scrollContainerRef.current) return
    const clampedIndex = Math.max(0, Math.min(targetIndex, steps.length - 1))
    const currentCardWithGap = cardWidth + CARD_GAP
    scrollContainerRef.current.scrollTo({
      left: (clampedIndex + 1) * currentCardWithGap,
      behavior: 'smooth'
    })
    setCurrentIndex(clampedIndex)
  }, [cardWidth])

  return (
    <>
      {/* Quote Section with Background Image */}
      <section className="relative py-20 md:py-32 min-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop"
            alt="Students"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/90 via-[#1E3A8A]/85 to-[#1E3A8A]/90" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 italic text-white drop-shadow-lg leading-tight">
              "The best way to predict the future is to create it."
            </h2>
            <p className="text-xl leading-relaxed mb-8 text-white/95 drop-shadow-md max-w-3xl mx-auto">
              Every step you take in education helps build your tomorrow. At Course Centre, we're here to guide you through your UK university journey, empowering you to truly shape the future you dream of.
            </p>
            <Button
              asChild
              className="px-10 py-6 bg-[#F59E0B] hover:bg-[#D97706] text-white text-lg font-semibold shadow-xl hover:shadow-2xl"
            >
              <Link href="/about">Discover more</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Journey Steps Section - Premium Carousel Design */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-24 md:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_2px_2px,#1E3A8A_1px,transparent_0)] bg-[length:40px_40px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-14 md:mb-16">
            <div className="inline-block mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm uppercase tracking-wider text-[#1E3A8A] font-semibold bg-[#1E3A8A]/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                Your Journey
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 text-gray-900 leading-tight tracking-tight">
              Your Journey to Success
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-normal px-4">
              Follow these simple steps to start your UK university journey with confidence
            </p>
          </div>

          {/* Premium Carousel Container */}
          <div className="relative">
            {/* Scrollable Cards Container */}
            <div
              ref={scrollContainerRef}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-12 cursor-grab active:cursor-grabbing"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: isDragging ? 'auto' : 'smooth',
                paddingLeft: cardWidth < 500 
                  ? '1rem' 
                  : `calc(50% - ${cardWidth / 2}px)`,
                paddingRight: cardWidth < 500 
                  ? '1rem' 
                  : `calc(50% - ${cardWidth / 2}px)`,
              }}
            >
              {infiniteSteps.map((step, index) => {
                const Icon = step.icon
                
                // Calculate which actual step this represents
                const stepIndex = getStepIndex(index)
                const isActive = stepIndex === currentIndex
                
                // Calculate smooth transitions based on scroll position
                const currentCardWithGap = cardWidth + CARD_GAP
                const cardPos = index * currentCardWithGap
                const distance = Math.abs(scrollPosition - cardPos)
                const normalizedDist = Math.min(distance / currentCardWithGap, 1)
                const scale = 1 - normalizedDist * 0.05
                const opacity = 1 - normalizedDist * 0.3
                
                return (
                  <div
                    key={`${step.step}-${index}`}
                    data-card
                    className="flex-shrink-0"
                    style={{
                      width: `${cardWidth}px`,
                      opacity: opacity,
                    }}
                  >
                    {/* Premium Card Design */}
                    <div className={`bg-white rounded-2xl overflow-hidden h-full ${
                      isActive 
                        ? 'shadow-2xl border-2 border-[#1E3A8A]/20' 
                        : 'shadow-lg border-2 border-gray-200/60'
                    }`}>
                      {/* Gradient Top Bar */}
                      <div className={`h-2 bg-gradient-to-r ${
                        isActive
                          ? 'from-[#1E3A8A] via-[#F59E0B] to-[#1E3A8A]'
                          : 'from-gray-200 via-gray-300 to-gray-200'
                      }`}></div>

                      <div className="p-6 sm:p-8 md:p-10">
                        {/* Step Number Section */}
                        <div className="flex items-center mb-4 sm:mb-6 md:mb-8">
                          <div className="relative">
                            <div className={`flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-2xl ${
                              isActive
                                ? 'bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] shadow-xl'
                                : 'bg-gradient-to-br from-gray-400 to-gray-500 shadow-md'
                            }`}>
                              <span className="text-2xl sm:text-2xl md:text-3xl font-bold text-white">
                                {step.step}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-5 leading-tight ${
                          isActive ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className={`text-sm sm:text-base md:text-lg leading-relaxed ${
                          isActive ? 'text-gray-600' : 'text-gray-500'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Active Step Indicator Dots */}
            <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 md:mt-10">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`h-2.5 sm:h-3 rounded-full min-w-[24px] sm:min-w-[28px] ${
                    currentIndex === index
                      ? 'w-10 sm:w-12 bg-gradient-to-r from-[#1E3A8A] to-[#F59E0B]'
                      : 'w-2.5 sm:w-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12 sm:mt-16 md:mt-20">
            <div className="inline-flex flex-col items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#1E3A8A]/10">
                  <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-[#1E3A8A]" />
                </div>
                <span className="text-lg sm:text-xl font-semibold">Ready to begin your journey?</span>
              </div>
              <Button
                asChild
                className="px-6 sm:px-8 md:px-12 py-5 sm:py-6 md:py-7 bg-[#F59E0B] hover:bg-[#D97706] text-white text-base sm:text-lg md:text-xl font-semibold shadow-xl hover:shadow-2xl min-h-[44px]"
              >
                <Link href="/register">Start Your Journey Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
