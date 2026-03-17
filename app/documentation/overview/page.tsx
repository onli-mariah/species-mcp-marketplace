import { Navigation } from "@/components/navigation"
import Link from "next/link"

export default function OverviewPage() {
  return (
    <>
      <Navigation />

      {/* Boxed borders */}
      <div className="fixed top-0 left-0 right-0 h-[20px] bg-black border-b border-white/20 z-50" />
      <div className="fixed bottom-0 left-0 right-0 h-[20px] bg-black border-t border-white/20 z-50" />
      <div className="fixed top-0 bottom-0 left-0 w-[20px] bg-black border-r border-white/20 z-50" />
      <div className="fixed top-0 bottom-0 right-0 w-[20px] bg-black border-l border-white/20 z-50" />

      <main className="bg-black min-h-screen pt-[120px] pb-[60px] px-[60px]">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/documentation" className="text-white/50 hover:text-white text-sm">
              Documentation
            </Link>
            <span className="text-white/30 mx-2">/</span>
            <span className="text-white text-sm">What is Specie</span>
          </div>

          <h1 className="text-5xl font-light text-white mb-8 tracking-tight">What is Specie</h1>

          <div className="h-[1px] bg-white/10 mb-12" />

          <div className="prose prose-invert max-w-none">
            <p className="text-white/70 leading-relaxed mb-6 text-lg">
              Specie is{" "}
              <strong className="text-white">
                an Onli (actual possession) asset — not a blockchain asset, not cryptocurrency
              </strong>
              . It is the simplest way to create, move, and verify digital value without chains, ledgers, or
              intermediaries.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              Every action in Specie — issuing, listing, transferring, or redeeming — happens in{" "}
              <strong className="text-white">one call</strong>. Every call returns a{" "}
              <strong className="text-white">digitally signed Receipt</strong>, the only proof that matters. No
              blockchain, no ledger, no miners, no public history. Just mathematics, consent, and verified truth.
            </p>

            <p className="text-white/70 leading-relaxed mb-6 text-lg">
              Specie is{" "}
              <strong className="text-white">
                the simplest way to create, move, and verify digital value without chains, ledgers, or intermediaries
              </strong>
              . It is an Onli Cloud Appliance — an intelligent service that embodies the principle of{" "}
              <strong className="text-white">Trust Without Chains</strong>.
            </p>

            <p className="text-white/70 leading-relaxed mb-12">
              Ownership in Specie is <strong className="text-white">private by default</strong>. Assets can only be
              moved by their verified owner through the <strong className="text-white">Onli-You App</strong>, and the
              Oracle (which verifies truth) is not public. Owners may choose to share proof of ownership, but visibility
              is always by consent.
            </p>

            <div className="bg-yellow-accent/10 border border-yellow-accent/30 p-8 my-12">
              <p className="text-foreground text-lg tracking-wide mb-0">
                Specie is not a blockchain or cryptocurrency — it's an{" "}
                <strong className="text-foreground">actual possession system</strong> based on a{" "}
                <strong className="text-foreground">verification fabric</strong>.
              </p>
            </div>

            <h2 className="text-3xl font-light text-white mb-6 mt-16 tracking-wide">Core Principles</h2>

            <div className="space-y-8 my-8">
              <div className="border-l-2 border-white/20 pl-6">
                <h3 className="text-xl text-white mb-3">One Call — That's All</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  Every operation is a single endpoint call. No multi-step pipelines, no polling, no webhooks.
                </p>
                <div className="bg-white/5 border border-white/10 p-4 font-mono text-sm text-white/80">
                  Intent → Proof → Receipt
                </div>
                <p className="text-white/60 text-sm mt-2">That's the entire flow.</p>
              </div>

              <div className="border-l-2 border-white/20 pl-6">
                <h3 className="text-xl text-white mb-3">Every Call Returns a Receipt</h3>
                <p className="text-white/70 leading-relaxed">
                  Each call generates a signed receipt — immutable proof of the act. The system itself forgets; the
                  proof remains with the user.
                </p>
              </div>

              <div className="border-l-2 border-white/20 pl-6">
                <h3 className="text-xl text-white mb-3">Private by Default</h3>
                <p className="text-white/70 leading-relaxed">
                  Only owners can move or reveal their assets. There is no global ledger, no public explorer, no
                  external validation unless the owner authorizes it.
                </p>
              </div>

              <div className="border-l-2 border-white/20 pl-6">
                <h3 className="text-xl text-white mb-3">Trust Without Chains</h3>
                <p className="text-white/70 leading-relaxed">
                  Specie replaces blockchain's public consensus with{" "}
                  <strong className="text-white">mathematical verification and consent</strong>. Trust is established
                  through digital signatures and receipts, not through blockchain or cryptocurrency mechanisms.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-light text-white mb-6 mt-16 tracking-wide">Verification Philosophy</h2>

            <p className="text-white/70 leading-relaxed mb-6">
              Specie's design eliminates the need for public transparency by enforcing{" "}
              <strong className="text-white">private verifiability</strong>:
            </p>

            <ul className="space-y-3 text-white/70 mb-8">
              <li>• Every proof is personal.</li>
              <li>• Every action is digitally signed and sealed.</li>
              <li>• The Oracle verifies truth only when consent is given.</li>
            </ul>

            <div className="bg-white/5 border border-white/10 p-6 my-8">
              <h3 className="text-lg text-white mb-3">Verification Flow</h3>
              <div className="font-mono text-sm text-white/80">
                Intent → Validation → Execution → Receipt → Optional Oracle Verification
              </div>
              <p className="text-white/60 text-sm mt-4">Users hold proof; the system holds nothing.</p>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 flex justify-between">
              <Link href="/documentation" className="text-white/60 hover:text-white">
                ← Back to Documentation
              </Link>
              <Link href="/documentation/mcp" className="text-white/60 hover:text-white">
                Model Context Protocol →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
