"use client"

import type React from "react"
import { useRouter } from "next/navigation"

import { Navigation } from "@/components/navigation"
import { useState } from "react"

export default function ContactPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "general",
          ...formData,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message")
      }

      setShowSuccess(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    router.push("/")
  }

  return (
    <>
      <Navigation />

      <div className="fixed top-0 left-0 right-0 h-[20px] bg-black border-b border-white/20 z-50" />
      <div className="fixed bottom-0 left-0 right-0 h-[20px] bg-black border-t border-white/20 z-50" />
      <div className="fixed top-0 bottom-0 left-0 w-[20px] bg-black border-r border-white/20 z-50" />
      <div className="fixed top-0 bottom-0 right-0 w-[20px] bg-black border-l border-white/20 z-50" />

      {showSuccess && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100]">
          <div className="bg-white p-8 max-w-md mx-4 text-center">
            <h3 className="text-2xl font-light text-black mb-4">Message Sent</h3>
            <p className="text-black/70 mb-6">Thank you for contacting us. We'll get back to you shortly.</p>
            <button
              onClick={handleSuccessClose}
              className="px-8 py-3 bg-black text-white text-xs tracking-[0.3em] uppercase hover:bg-black/80 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <main className="bg-black min-h-screen pt-[120px] pb-[60px] px-[60px]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h5 className="text-white/50 text-xs tracking-[0.3em] uppercase mb-6">IMPORTANT</h5>
              <h2 className="text-5xl md:text-6xl font-light text-white tracking-tight">Contact</h2>
            </div>
            <div>
              <div className="h-[1px] bg-white/10 mb-8" />
              <p className="text-white/60 leading-relaxed">
                Get in touch with our team. We're here to answer your questions and help you build with SPECIES.
              </p>
            </div>
          </div>

          <div className="h-[1px] bg-white/10 mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h4 className="text-white text-sm tracking-[0.2em] uppercase mb-4">General Contact</h4>
              <p className="text-white/60 leading-relaxed">
                This is a general contact page for support inquiries.
                <br />
                To join the marketplace, please email join@species.market
              </p>
            </div>

            <div>
              <h4 className="text-white text-sm tracking-[0.2em] uppercase mb-4">Email</h4>
              <p className="text-white/60 leading-relaxed">
                <a href="mailto:support@species.market" className="hover:text-white transition-colors">
                  support@species.market
                </a>
                <br />
                <a href="mailto:join@species.market" className="hover:text-white transition-colors">
                  join@species.market
                </a>
              </p>
            </div>
          </div>

          <div className="h-[1px] bg-white/10 mb-16" />

          {error && <div className="mb-6 p-4 border border-red-500/50 bg-red-500/10 text-red-400">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-transparent border border-white/20 px-6 py-4 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-transparent border border-white/20 px-6 py-4 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none transition-colors"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
              className="w-full bg-transparent border border-white/20 px-6 py-4 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none transition-colors"
            />
            <textarea
              placeholder="Message"
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="w-full bg-transparent border border-white/20 px-6 py-4 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-12 py-4 bg-white text-black text-xs tracking-[0.3em] uppercase font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </main>
    </>
  )
}
