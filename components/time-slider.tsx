"use client"

import { useEffect, useState } from "react"

interface TimeSliderProps {
  slides: string[]
  interval?: number
  className?: string
}

export function TimeSlider({ slides, interval = 5000, className = "" }: TimeSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length)
        setIsTransitioning(false)
      }, 300)
    }, interval)

    return () => clearInterval(timer)
  }, [slides.length, interval])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className={`transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        {slides[currentIndex]}
      </div>
    </div>
  )
}
