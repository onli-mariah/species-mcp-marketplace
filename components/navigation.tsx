"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const pathname = usePathname()

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname === "/") {
      e.preventDefault()
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }

  return (
    <nav className="fixed top-[20px] left-[20px] right-[20px] z-50 flex items-center justify-between px-8 py-6 bg-black/50 backdrop-blur-sm border border-white/20">
      {/* Logo on left */}
      <Link
        href="/"
        className="text-white text-sm tracking-[0.3em] uppercase font-light hover:text-white/70 transition-colors"
      >
        SPECIES
      </Link>

      {/* Navigation links in center */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          href="/"
          className={`text-xs tracking-[0.2em] uppercase transition-colors ${
            pathname === "/" ? "text-white" : "text-white/50 hover:text-white"
          }`}
        >
          Home
        </Link>
        <Link
          href="/#about"
          onClick={(e) => handleScroll(e, "about")}
          className={`text-xs tracking-[0.2em] uppercase transition-colors ${
            pathname === "/" ? "text-white" : "text-white/50 hover:text-white"
          }`}
        >
          ABOUT
        </Link>
        <Link
          href="/#how-it-works"
          onClick={(e) => handleScroll(e, "how-it-works")}
          className={`text-xs tracking-[0.2em] uppercase transition-colors ${
            pathname === "/" ? "text-white" : "text-white/50 hover:text-white"
          }`}
        >
          How to Get It
        </Link>
        <Link
          href="/#develop"
          onClick={(e) => handleScroll(e, "develop")}
          className={`text-xs tracking-[0.2em] uppercase transition-colors ${
            pathname === "/" ? "text-white" : "text-white/50 hover:text-white"
          }`}
        >
          Develop
        </Link>
      </div>

      {/* BUILD WITH ONLI pill button on right */}
      <Button
        asChild
        className="rounded-full bg-white text-black hover:bg-white/90 px-6 py-2 text-[10px] tracking-[0.3em] uppercase font-medium"
      >
        <a href="https://onli.ai" target="_blank" rel="noopener noreferrer">
          Build with Onli
        </a>
      </Button>
    </nav>
  )
}
