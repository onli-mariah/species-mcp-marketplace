import { Navigation } from "@/components/navigation"
import Link from "next/link"

export default function MCPPage() {
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
            <span className="text-white text-sm">Model Context Protocol</span>
          </div>

          <h1 className="text-5xl font-light text-white mb-8 tracking-tight">Model Context Protocol (MCP)</h1>

          <div className="h-[1px] bg-white/10 mb-12" />

          <div className="prose prose-invert max-w-none">
            <p className="text-white/70 leading-relaxed mb-6">
              Specie is designed for intelligence — built to communicate with AI agents and Onli systems through the{" "}
              <strong className="text-white">Model Context Protocol (MCP)</strong>. MCP is how cognition interacts with
              value: a universal, signed interface that allows models to act safely in the economic layer.
            </p>

            <h2 className="text-3xl font-light text-white mb-6 mt-12 tracking-wide">What MCP Does</h2>

            <p className="text-white/70 leading-relaxed mb-6">
              MCP is a <strong className="text-white">signing proxy</strong> that:
            </p>

            <ul className="space-y-3 text-white/70 mb-8">
              <li>• Takes the user's credentials (API key and secret)</li>
              <li>• Generates a unique HMAC-SHA256 signature per request</li>
              <li>• Sends an authenticated, timestamped call</li>
              <li>
                • Returns a <strong className="text-white">Receipt</strong> — a human-readable, mathematically verified
                proof
              </li>
            </ul>

            <h3 className="text-2xl font-light text-white mb-4 mt-12">Headers Sent With Every Request</h3>

            <div className="bg-white/5 border border-white/10 p-6 my-6">
              <pre className="text-white/80 text-sm font-mono overflow-x-auto leading-relaxed">{`X-API-Key: [user's API key]
X-Nonce: [unique UUID]
X-Timestamp: [current ISO-8601 time]
X-Event-Id: [unique transaction ID]
X-Signature: HMAC-SHA256(body + nonce + timestamp, secret)`}</pre>
            </div>

            <p className="text-white/60 text-sm mb-12">
              These headers form the <strong className="text-white">trust envelope</strong> — the cryptographic
              handshake that makes every Specie call verifiable and non-repudiable.
            </p>

            <h3 className="text-2xl font-light text-white mb-4 mt-12">Example — Full MCP Request</h3>

            <div className="bg-white/5 border border-white/10 p-6 my-6">
              <pre className="text-white/80 text-xs font-mono overflow-x-auto leading-relaxed">{`POST /mcp/eventRequest HTTP/1.1
Host: api.specie.market
Content-Type: application/json
X-API-Key: spk_live_3c02a8...
X-Nonce: 3b251b98-90f6-48c3-b012-1ddfbb3eaa4f
X-Timestamp: 2025-11-06T19:02:41Z
X-Event-Id: evt_58f29cd4b8
X-Signature: 6b9d73b242b91f02c9cf20a6d45fd6e1ef4eaf3d9b1c7b3f8a2...

{
  "protocol": "mcp",
  "version": "1.0.0",
  "tool": "Specie",
  "action": "BUY",
  "parameters": {
    "amount": 1000,
    "to": "treasury",
    "payWith": {
      "currency": "USDT_TRC20",
      "proof": "npmt_7EZ..."
    }
  },
  "context": {
    "user_onli_id": "usr-97b8a92c-fd34-4c4c-b1aa-02f83a5c4b9e",
    "vault_id": "vault-4b7a12d",
    "intent": "ISSUE",
    "meta": {
      "client_ref": "chat-agent-001",
      "description": "Agent-initiated treasury purchase"
    }
  }
}`}</pre>
            </div>

            <h3 className="text-2xl font-light text-white mb-4 mt-12">Example Response</h3>

            <div className="bg-white/5 border border-white/10 p-6 my-6">
              <pre className="text-white/80 text-sm font-mono overflow-x-auto leading-relaxed">{`{
  "receipt": {
    "eventId": "evt_58f29cd4b8",
    "status": "completed",
    "intent": "ISSUE",
    "timestamp": "2025-11-06T19:02:44Z",
    "owner": "usr-97b8a92c...",
    "proof": "onli_sig_9a27...",
    "message": "1,000 SPECIE issued to vault-4b7a12d"
  }
}`}</pre>
            </div>

            <p className="text-white/60 text-sm mb-12">
              The response is the only record that matters — your <strong className="text-white">Receipt</strong>, your
              proof of value.
            </p>

            <h2 className="text-3xl font-light text-white mb-6 mt-16 tracking-wide">The Architecture Truth</h2>

            <p className="text-white/70 leading-relaxed mb-6">
              MCP isn't just an API layer; it's a <strong className="text-white">verification language</strong>.
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              Every Specie call is a signed declaration of will. Every response is a mathematical confirmation of truth.
            </p>

            <div className="bg-white/5 border border-white/10 p-6 my-8">
              <h3 className="text-lg text-white mb-4">MCP performs four operations:</h3>
              <ol className="space-y-2 text-white/70 list-decimal list-inside">
                <li>Takes user credentials</li>
                <li>Creates an HMAC signature</li>
                <li>Makes an authenticated call</li>
                <li>Interprets and returns a verifiable result</li>
              </ol>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 flex justify-between">
              <Link href="/documentation/overview" className="text-white/60 hover:text-white">
                ← What is Specie
              </Link>
              <Link href="/documentation/quickstart" className="text-white/60 hover:text-white">
                Quickstart Guide →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
