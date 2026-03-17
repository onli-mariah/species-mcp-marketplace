"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    document.body.classList.add("loading")

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 30)

    // Hide loading screen after animation completes
    const timeout = setTimeout(() => {
      setIsLoading(false)
      document.body.classList.remove("loading")
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
      document.body.classList.remove("loading")
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="loading-screen-wrapper fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
          {/* Species logo text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-6xl font-extralight tracking-[0.3em] text-foreground md:text-8xl">species</h1>
          </motion.div>

          {/* Loading bar */}
          <div className="w-64 md:w-96">
            <div className="h-[1px] w-full bg-border">
              <motion.div
                className="h-full bg-blue-500"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Progress percentage */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-center text-xs tracking-widest text-muted-foreground"
            >
              {progress}%
            </motion.p>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-xs tracking-[0.3em] text-muted-foreground uppercase"
          >
            Loading the future
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
