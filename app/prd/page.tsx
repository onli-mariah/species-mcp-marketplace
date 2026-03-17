import { Navigation } from "@/components/navigation"
import { CheckCircle2 } from "lucide-react"

export default function PRDPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-zinc-950">
        <article className="pt-32 pb-20 px-6">
          <div className="container max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-100">Product Requirements Document</h1>
              <p className="text-xl text-zinc-400">What a Stablecoin Should Be</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 text-zinc-100">Vision</h2>
                <p className="text-zinc-400 leading-relaxed mb-4">
                  A stablecoin should be more than just a digital representation of fiat currency. It should be a
                  trustworthy, transparent, and accessible financial instrument that empowers individuals and businesses
                  to transact with confidence in the digital economy.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-zinc-100">Core Principles</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-zinc-100">1. True 1:1 Backing</h3>
                      <p className="text-zinc-400 leading-relaxed">
                        Every stablecoin must be backed by real, verifiable assets held in regulated financial
                        institutions. No fractional reserves, no algorithmic tricks—just honest, transparent backing.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-zinc-100">2. Real-Time Transparency</h3>
                      <p className="text-zinc-400 leading-relaxed">
                        Users should be able to verify reserves at any time through independent audits and on-chain
                        proof. Transparency builds trust, and trust is the foundation of stable value.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-zinc-100">3. Regulatory Compliance</h3>
                      <p className="text-zinc-400 leading-relaxed">
                        Operating within regulatory frameworks protects users and ensures long-term viability.
                        Compliance isn't a burden—it's a competitive advantage that builds institutional confidence.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-zinc-100">4. Instant Redeemability</h3>
                      <p className="text-zinc-400 leading-relaxed">
                        Users must be able to redeem their stablecoins for fiat currency quickly and without friction.
                        True stability means confidence in conversion at any time.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-zinc-100">5. Multi-Chain Interoperability</h3>
                      <p className="text-zinc-400 leading-relaxed">
                        A modern stablecoin should work seamlessly across multiple blockchain networks, enabling users
                        to move value where they need it without barriers.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 text-zinc-100">Technical Requirements</h2>
                <div className="bg-zinc-900 rounded-lg p-6 space-y-4 border border-zinc-800">
                  <div>
                    <h4 className="font-bold mb-2 text-zinc-100">Smart Contract Security</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      All smart contracts must undergo rigorous third-party audits and implement industry-standard
                      security practices.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-zinc-100">Scalability</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      The platform must handle high transaction volumes with minimal fees and fast confirmation times.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-zinc-100">API Integration</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Provide developer-friendly APIs for easy integration into existing financial systems and
                      applications.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-zinc-100">The Onli Difference</h2>
                <p className="text-zinc-400 leading-relaxed mb-4">
                  Onli is built on these principles from the ground up. We're not just creating another stablecoin—we're
                  building a marketplace where transparency, security, and user empowerment are non-negotiable
                  standards.
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  Our platform enables developers, businesses, and individuals to participate in a truly stable digital
                  economy, backed by real assets and governed by clear, transparent rules.
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>
    </>
  )
}
