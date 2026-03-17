import { Navigation } from "@/components/navigation"
import Link from "next/link"

export default function APIReferencePage() {
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
          <div className="mb-8">
            <Link href="/documentation" className="text-white/50 hover:text-white text-sm">
              Documentation
            </Link>
            <span className="text-white/30 mx-2">/</span>
            <span className="text-white text-sm">API Reference</span>
          </div>

          <h1 className="text-5xl font-light text-white mb-8 tracking-tight">API Reference</h1>

          <div className="h-[1px] bg-white/10 mb-12" />

          <div className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-light text-white mb-6 tracking-wide">Common Response Codes</h2>

            <div className="border border-white/10 overflow-hidden my-6">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-4 text-white/90 font-normal border-b border-white/10">Code</th>
                    <th className="text-left p-4 text-white/90 font-normal border-b border-white/10">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-white/70 font-mono">200</td>
                    <td className="p-4 text-white/70">Success — receipt returned</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-white/70 font-mono">400</td>
                    <td className="p-4 text-white/70">Invalid input or missing fields</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-white/70 font-mono">401</td>
                    <td className="p-4 text-white/70">Signature invalid or expired timestamp</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-white/70 font-mono">404</td>
                    <td className="p-4 text-white/70">Unknown event ID or resource not found</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-white/70 font-mono">429</td>
                    <td className="p-4 text-white/70">Rate limit exceeded</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-white/70 font-mono">500</td>
                    <td className="p-4 text-white/70">Internal processing error</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-light text-white mb-6 mt-12 tracking-wide">MCP Tool Definitions</h2>

            <div className="border border-white/10 overflow-hidden my-6">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-4 text-white/90 font-normal border-b border-white/10">Tool</th>
                    <th className="text-left p-4 text-white/90 font-normal border-b border-white/10">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-white/70 font-mono text-sm">species_create_transaction</td>
                    <td className="p-4 text-white/70">Creates a transaction such as BUY, SELL, or TRANSFER</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-white/70 font-mono text-sm">species_create_listing</td>
                    <td className="p-4 text-white/70">Lists SPECIE for sale with fee proof</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-white/70 font-mono text-sm">species_get_receipt</td>
                    <td className="p-4 text-white/70">Retrieves the human-readable receipt for an eventId</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-white/70 font-mono text-sm">species_check_balance</td>
                    <td className="p-4 text-white/70">Queries current SPECIE and USDT balances</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-white/70 font-mono text-sm">species_estimate_transaction</td>
                    <td className="p-4 text-white/70">Estimates fees and total costs</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-white/70 font-mono text-sm">species_monitor_transaction</td>
                    <td className="p-4 text-white/70">Streams transaction updates in real-time</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-light text-white mb-6 mt-12 tracking-wide">Example — Receipt Response</h2>

            <div className="bg-white/5 border border-white/10 p-6 my-6">
              <pre className="text-white/80 text-sm font-mono overflow-x-auto leading-relaxed">{`{
  "receipt": {
    "eventId": "evt-73cd5b7a",
    "status": "completed",
    "intent": "BUY_TREASURY",
    "timestamp": "2025-11-06T19:12:06Z",
    "balanceChanges": {
      "usr-123": { "species": +1000 },
      "treasury": { "species": -1000 }
    },
    "paymentVerification": {
      "provider": "NOWPayments",
      "amount": "10 USDT",
      "confirmations": 15,
      "proof": "npmt_456789"
    },
    "fees": {
      "issuance": "0.01 USDT",
      "total": "0.01 USDT"
    },
    "timeline": {
      "received": "2025-11-06T19:12:04Z",
      "verified": "2025-11-06T19:12:05Z",
      "executed": "2025-11-06T19:12:06Z"
    }
  }
}`}</pre>
            </div>

            <h2 className="text-3xl font-light text-white mb-6 mt-12 tracking-wide">Key Takeaways</h2>

            <div className="border border-white/10 overflow-hidden my-6">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-4 text-white/90 font-normal border-b border-white/10">Principle</th>
                    <th className="text-left p-4 text-white/90 font-normal border-b border-white/10">Meaning</th>
                    <th className="text-left p-4 text-white/90 font-normal border-b border-white/10">Benefit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-white/70">One Call</td>
                    <td className="p-4 text-white/70">All operations use one endpoint</td>
                    <td className="p-4 text-white/70">Minimal integration overhead</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-white/70">Every Call Has a Receipt</td>
                    <td className="p-4 text-white/70">Each response is signed proof</td>
                    <td className="p-4 text-white/70">Built-in audit trail</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-white/70">Private by Default</td>
                    <td className="p-4 text-white/70">No public ledger</td>
                    <td className="p-4 text-white/70">Privacy and sovereignty</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-white/70">MCP-Based</td>
                    <td className="p-4 text-white/70">Agent-native, model-context protocol</td>
                    <td className="p-4 text-white/70">Works with AI and Onli Agents</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-4 text-white/70">Owner-Only Movement</td>
                    <td className="p-4 text-white/70">Only verified owners can move assets</td>
                    <td className="p-4 text-white/70">Perfect custody integrity</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-white/70">Mathematical Trust</td>
                    <td className="p-4 text-white/70">Proof replaces history</td>
                    <td className="p-4 text-white/70">Eliminates surveillance</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-accent/10 border border-yellow-accent/30 p-8 my-12">
              <h3 className="text-xl text-foreground mb-3 tracking-wider">The Developer's Mantra</h3>
              <p className="text-foreground text-lg mb-2">
                <strong>Intent. Proof. Receipt.</strong>
              </p>
              <p className="text-foreground/70">That's Specie.</p>
              <p className="text-muted-foreground text-sm mt-4">
                Specie isn't built on blockchain — it's built on{" "}
                <strong className="text-foreground">math, consent, and sovereignty</strong>. A protocol where trust
                doesn't require chains — and value moves only by will.
              </p>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 flex justify-between">
              <Link href="/documentation/quickstart" className="text-white/60 hover:text-white">
                ← Quickstart Guide
              </Link>
              <Link href="/documentation" className="text-white/60 hover:text-white">
                Back to Documentation
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
