"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setIsTransitioning(true)
    const timeout = setTimeout(() => setIsTransitioning(false), 600)
    return () => clearTimeout(timeout)
  }, [pathname])

  return (
    <>
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key="page-transition"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 origin-top bg-black"
          >
            <div className="flex h-full items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-4xl font-extralight tracking-[0.3em] text-white"
              >
                species
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  )
}
