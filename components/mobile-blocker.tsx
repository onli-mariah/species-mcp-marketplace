"use client"

import { useEffect, useState } from "react"
import { AlertCircle } from "lucide-react"

export function MobileBlocker() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileDevice = /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const isTablet = /tablet|ipad/i.test(userAgent)
      const isSmallScreen = window.innerWidth < 1024

      setIsMobile(isMobileDevice || isTablet || isSmallScreen)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!isMobile) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-6">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <h2 className="text-2xl font-light text-white mb-4">Desktop Only</h2>

        <p className="text-white/60 text-base leading-relaxed mb-2">This page isn't available on mobile.</p>

        <p className="text-white/60 text-base leading-relaxed">Please use a desktop browser.</p>
      </div>
    </div>
  )
}
