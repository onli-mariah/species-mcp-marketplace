"use client"

import Link from "next/link"
import { ArrowRight, Terminal } from "lucide-react"
import { motion } from "framer-motion"
import { Hero3D } from "@/components/hero-3d"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-yellow-accent selection:text-foreground">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 p-4 md:p-6 flex justify-between items-center bg-background/80 backdrop-blur-sm border-b border-border">
        <div style={{ fontFamily: 'var(--font-sans), sans-serif' }} className="text-lg md:text-xl tracking-tighter lowercase font-thin text-foreground">
          <Link href="/">species.market</Link>
        </div>
        <nav className="flex items-center gap-2 md:gap-4">
          <a 
            href="https://onli.cloud" 
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block text-xs font-sans uppercase tracking-widest font-bold hover:text-muted-foreground transition-colors mr-2"
          >
            onli.cloud
          </a>
          <a 
            href="https://onli.you" 
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block text-xs font-sans uppercase tracking-widest font-bold hover:text-muted-foreground transition-colors mr-2"
          >
            onli.you
          </a>
          <Link 
            href="/develop" 
            className="flex items-center justify-center gap-2 px-4 md:px-6 py-2 rounded-full border-2 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-all text-[10px] md:text-xs font-sans lowercase tracking-wide font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            <Terminal className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">develop canvas</span>
            <span className="sm:hidden">canvas</span>
          </Link>
        </nav>
      </header>

      {/* Section 1: Hero (3D Delphi Clone) */}
      <Hero3D />

      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-12 lg:pt-24 px-6 lg:px-12 max-w-[1600px] w-full mx-auto space-y-32 pb-32">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-32 border-t-2 border-border pb-16 items-start">
          
          {/* Right Side: Copy (Appears First on Mobile) */}
          <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-6 space-y-8 text-base font-normal leading-[1.6] text-foreground">
            <p className="text-4xl font-thin mb-12 leading-tight uppercase">
              Specie is the native utility asset of the Onli Ecosystem, designed specifically for modern developers.
            </p>
            <p className="text-foreground/80">
              Species™ provides a predictable, possession-based digital unit that AI agents can understand, request, move, and reason about without the complexity of blockchain.
            </p>
            <p className="text-foreground/80">
              Onli Appliances are intentionally simple to build. There are four core API calls every developer needs to learn — <span className="font-medium underline decoration-1 underline-offset-4 decoration-border">Issue</span>, <span className="font-medium underline decoration-1 underline-offset-4 decoration-border">AskToMove</span>, <span className="font-medium underline decoration-1 underline-offset-4 decoration-border">ChangeOwner</span>, and <span className="font-medium underline decoration-1 underline-offset-4 decoration-border">AuthorizeBehavior</span> — giving you a complete asset lifecycle with minimal surface area and maximum control. 
            </p>
            <div className="pt-8 mt-8 border-t-2 border-border">
              <p className="font-light text-xl uppercase">
                Species is value designed to be used by agents. Onli is infrastructure designed to be learned in an afternoon.
              </p>
            </div>
          </div>

          {/* Left Side: Features & Button (Appears Second on Mobile) */}
          <div className="order-2 lg:order-1 lg:col-span-4 lg:col-start-1 space-y-12">
            <div className="space-y-8">
              <div className="p-6 border-l-2 border-foreground bg-secondary/30">
                <h4 className="font-light text-xl uppercase tracking-wider mb-2 text-foreground">SDK & Libraries</h4>
                <p className="text-base font-normal text-foreground/70">Comprehensive tooling for rapid integration into any application environment.</p>
              </div>
              <div className="p-6 border-l-2 border-foreground bg-secondary/30">
                <h4 className="font-light text-xl uppercase tracking-wider mb-2 text-foreground">API Gateway</h4>
                <p className="text-base font-normal text-foreground/70">Robust RESTful and GraphQL endpoints for maximum flexibility and scale.</p>
              </div>
              <div className="p-6 border-l-2 border-foreground bg-secondary/30">
                <h4 className="font-light text-xl uppercase tracking-wider mb-2 text-foreground">Templates</h4>
                <p className="text-base font-normal text-foreground/70">Production-ready starter projects to accelerate your development cycle.</p>
              </div>
            </div>

            <div className="pt-4">
              <Link 
                href="/develop"
                className="inline-flex items-center gap-4 px-10 py-5 border-2 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-all rounded-none text-base font-light uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px]"
              >
                View Workflow <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
        </section>

        {/* Section 2: What is Species */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-32 border-t-2 border-border">
          <div className="lg:col-span-6 space-y-4">
            <div className="text-sm font-sans uppercase tracking-widest font-bold text-muted-foreground">What is Species</div>
            <h2 className="text-4xl font-thin leading-tight tracking-tighter text-foreground uppercase">
              A New Species of Digital Assets
            </h2>
          </div>
          <div className="lg:col-span-6 space-y-6 text-base font-normal leading-relaxed text-foreground">
            <p>
              Species is a micro-commodity created on the Onli protocol — a sovereign digital asset whose ownership is verified through authenticated state transitions rather than blockchain ledgers or consensus networks. This is different from the ground up.
            </p>
            <p>
              A new Species in the evolution of digital assets. Species is not a token, not a key, and not an entry in a public ledger. It is a singular, self-contained asset you own directly — alive in structure, secure by design, and free from the constraints of chains, miners, or confirmations.
            </p>
            <p>
              Species introduces the world's first intelligent digital asset — the first of many to come. Assets that are truly sovereign the moment you hold them. Introducing the first publicly available Species of a digital, possession-based economy.
            </p>
          </div>
        </section>

        {/* Section 3: Finance Without Friction */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-32 border-t-2 border-border">
          <div className="lg:col-span-5 space-y-8">
            <div className="text-sm font-sans uppercase tracking-widest font-bold text-muted-foreground">Request An Invite</div>
            <h2 className="text-4xl font-thin leading-tight tracking-tighter text-foreground uppercase">
              Finance Without Friction
            </h2>
            <div className="space-y-6 text-base font-normal leading-relaxed text-foreground">
              <p>
                Managing your intelligent assets should be as simple as having a conversation. With Onli.AI, finance becomes intuitive — just chat naturally to buy, sell, or transfer your digital possessions.
              </p>
              <p>
                No complex interfaces. No hidden fees. No transaction costs. Just pure, frictionless value exchange powered by conversation. Your words become actions, instantly.
              </p>
            </div>
            
            <div className="pt-4 space-y-6">
              <p className="text-base font-normal leading-relaxed text-foreground/80">
                Are you a developer? Sign up to get a prebuilt marketplace template and spin up an entire marketplace within minutes using our new Onli AI MCP.
              </p>
              <div className="w-full relative group">
                <div className="absolute inset-0 bg-foreground translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                <form className="relative bg-background border-2 border-foreground p-2 flex flex-col sm:flex-row gap-2 sm:gap-0">
                  <input 
                    type="email" 
                    placeholder="developer@example.com" 
                    className="flex-1 bg-transparent px-4 py-3 outline-none text-foreground placeholder:text-muted-foreground rounded-none font-sans"
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-foreground w-full sm:w-auto text-background px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-muted-foreground transition-colors cursor-pointer text-center"
                    onClick={(e) => e.preventDefault()}
                  >
                    Join Waitlist
                  </button>
                </form>
              </div>
            </div>

          </div>
          <div className="lg:col-span-7">
            <div className="bg-secondary/30 p-12 lg:p-16 border-2 border-border h-full flex flex-col justify-center">
              <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-muted-foreground mb-8">Key Benefits</h3>
              <ul className="space-y-6 font-light text-xl text-foreground">
                <li className="flex gap-4 items-start"><ArrowRight className="w-5 h-5 shrink-0 mt-1 text-muted-foreground" /> Zero transaction fees — ever</li>
                <li className="flex gap-4 items-start"><ArrowRight className="w-5 h-5 shrink-0 mt-1 text-muted-foreground" /> Natural language commands in any chat</li>
                <li className="flex gap-4 items-start"><ArrowRight className="w-5 h-5 shrink-0 mt-1 text-muted-foreground" /> Instant settlement with no intermediaries</li>

                <li className="flex gap-4 items-start"><ArrowRight className="w-5 h-5 shrink-0 mt-1 text-muted-foreground" /> AI-powered intelligent asset management</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Download OnliYou */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-32 border-t-2 border-border items-center">
          {/* Image (Appears First on Mobile) */}
          <div className="order-1 lg:order-1 lg:col-span-6">
            <div className="aspect-square bg-secondary/30 border-2 border-border p-4 flex flex-col justify-center items-center text-center overflow-hidden">
               <img 
                 src="/onliyou-lifestyle.jpg" 
                 alt="OnliYou Lifestyle" 
                 className="w-full h-full object-cover grayscale opacity-90 hover:opacity-100 hover:scale-[1.02] transition-all duration-700 ease-in-out border-2 border-border"
               />
            </div>
          </div>

          {/* Copy (Appears Second on Mobile) */}
          <div className="order-2 lg:order-2 lg:col-span-6 space-y-8">
            <div className="text-sm font-sans uppercase tracking-widest font-bold text-muted-foreground">Get Started Today</div>
            <h2 className="text-4xl font-thin leading-tight tracking-tighter text-foreground uppercase">
              Download OnliYou
            </h2>
            <div className="space-y-6 text-base font-normal leading-relaxed text-foreground">
              <p>
                Your personal vault for Species™ and all intelligent assets on the Onli network. Experience true digital possession with the only app designed for actual ownership.
              </p>
              <p>
                Download OnliYou today and join the revolution in digital value. No blockchain. No complexity. Just pure possession.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
              <a 
                href="https://apps.apple.com/us/app/onli-you/id6503365414" target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-8 py-4 border-2 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-all rounded-none text-sm font-light uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                iOS - Available Now
              </a>
              <div 
                className="w-full sm:w-auto text-center px-8 py-4 border-2 border-muted-foreground text-muted-foreground rounded-none text-sm font-light uppercase tracking-widest cursor-not-allowed opacity-60"
              >
                Android - Coming Soon
              </div>
            </div>

            <ul className="space-y-4 font-light text-base text-foreground pt-12">
                <li className="flex gap-4 items-center"><div className="w-1.5 h-1.5 bg-foreground rounded-none" /> Secure possession vault</li>
                <li className="flex gap-4 items-center"><div className="w-1.5 h-1.5 bg-foreground rounded-none" /> Real-time asset verification</li>
                <li className="flex gap-4 items-center"><div className="w-1.5 h-1.5 bg-foreground rounded-none" /> AI-powered conversational management</li>
                <li className="flex gap-4 items-center"><div className="w-1.5 h-1.5 bg-foreground rounded-none" /> Zero fees, complete privacy</li>
            </ul>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t-2 border-border py-8 px-6 lg:px-12 mt-auto bg-background">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-foreground font-bold uppercase tracking-widest">
          <div className="bg-foreground text-background px-4 py-2">© {new Date().getFullYear()} Species.market</div>
          <div className="bg-foreground text-background px-4 py-2">Built on Onli</div>
        </div>
      </footer>
    </div>
  )
}
