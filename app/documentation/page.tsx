import { Navigation } from "@/components/navigation"
import Link from "next/link"

export default function DocumentationPage() {
  return (
    <>
      <Navigation />

      {/* Boxed borders */}
      <div className="fixed top-0 left-0 right-0 h-[20px] bg-black border-b border-white/20 z-50" />
      <div className="fixed bottom-0 left-0 right-0 h-[20px] bg-black border-t border-white/20 z-50" />
      <div className="fixed top-0 bottom-0 left-0 w-[20px] bg-black border-r border-white/20 z-50" />
      <div className="fixed top-0 bottom-0 right-0 w-[20px] bg-black border-l border-white/20 z-50" />

      <main className="bg-black min-h-screen pt-[120px] pb-[60px] px-[60px]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h5 className="text-white/50 text-xs tracking-[0.3em] uppercase mb-6">Developer Resources</h5>
              <h2 className="text-5xl md:text-6xl font-light text-white tracking-tight">Specie Developer Guide</h2>
            </div>
            <div>
              <div className="h-[1px] bg-white/10 mb-8" />
              <p className="text-white/70 leading-relaxed">
                Everything you need to build with Specie. One call, one receipt, infinite possibilities. Built on math,
                consent, and sovereignty.
              </p>
            </div>
          </div>

          <div className="h-[1px] bg-white/10 mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href="/documentation/overview"
              className="border border-white/10 p-8 hover:border-white/30 transition-colors group"
            >
              <h3 className="text-2xl text-white mb-4 tracking-wide">What is Specie</h3>
              <p className="text-white/60 mb-6">
                The simplest way to create, move, and verify digital value without chains, ledgers, or intermediaries.
              </p>
              <span className="text-white/80 text-sm tracking-wider uppercase group-hover:text-white">Read More →</span>
            </Link>

            <Link
              href="/documentation/mcp"
              className="border border-white/10 p-8 hover:border-white/30 transition-colors group"
            >
              <h3 className="text-2xl text-white mb-4 tracking-wide">Model Context Protocol</h3>
              <p className="text-white/60 mb-6">
                Agent-friendly interface with HMAC-SHA256 signing. Every call returns a cryptographic receipt.
              </p>
              <span className="text-white/80 text-sm tracking-wider uppercase group-hover:text-white">Read More →</span>
            </Link>

            <Link
              href="/documentation/quickstart"
              className="border border-white/10 p-8 hover:border-white/30 transition-colors group"
            >
              <h3 className="text-2xl text-white mb-4 tracking-wide">Quickstart Guide</h3>
              <p className="text-white/60 mb-6">
                Get started with Specie in minutes. Setup, authentication, and your first API call.
              </p>
              <span className="text-white/80 text-sm tracking-wider uppercase group-hover:text-white">Read More →</span>
            </Link>

            <Link
              href="/documentation/api-reference"
              className="border border-white/10 p-8 hover:border-white/30 transition-colors group"
            >
              <h3 className="text-2xl text-white mb-4 tracking-wide">API Reference</h3>
              <p className="text-white/60 mb-6">
                Complete MCP tool definitions, response codes, and SDK examples for Node.js.
              </p>
              <span className="text-white/80 text-sm tracking-wider uppercase group-hover:text-white">Read More →</span>
            </Link>
          </div>

          <div className="mt-16 bg-white/5 border border-white/10 p-8">
            <h3 className="text-2xl text-white mb-6 tracking-wide">Core Principles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-white mb-2 tracking-wider">ONE CALL</h4>
                <p className="text-white/60 text-sm">Intent → Proof → Receipt. That's the entire flow.</p>
              </div>
              <div>
                <h4 className="text-white mb-2 tracking-wider">PRIVATE BY DEFAULT</h4>
                <p className="text-white/60 text-sm">No global ledger, no public explorer, no surveillance.</p>
              </div>
              <div>
                <h4 className="text-white mb-2 tracking-wider">TRUST WITHOUT CHAINS</h4>
                <p className="text-white/60 text-sm">Cryptographic consent replaces blockchain consensus.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
