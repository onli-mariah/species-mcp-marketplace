"use client"

import { useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service in production
    if (process.env.NODE_ENV === "production") {
      // TODO: Send to error tracking service (e.g., Sentry)
    }
  }, [error])

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-red-950/50 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-zinc-100 mb-3">Something went wrong</h1>
        <p className="text-zinc-400 leading-relaxed mb-6">
          An unexpected error occurred. Please try again or contact support if the problem persists.
        </p>
        <Button onClick={reset} variant="outline">
          Try again
        </Button>
      </div>
    </main>
  )
}
