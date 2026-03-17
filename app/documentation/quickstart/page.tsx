import { Navigation } from "@/components/navigation"
import Link from "next/link"

export default function QuickstartPage() {
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
            <span className="text-white text-sm">Quickstart</span>
          </div>

          <h1 className="text-5xl font-light text-white mb-8 tracking-tight">Quickstart for Developers</h1>

          <div className="h-[1px] bg-white/10 mb-12" />

          <div className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-light text-white mb-6 tracking-wide">Requirements</h2>

            <ul className="space-y-3 text-white/70 mb-8">
              <li>• Onli-You App (for vault ownership)</li>
              <li>• ProfileTray API key and secret</li>
              <li>• USDT payment proof (NOWPayments or TRON)</li>
            </ul>

            <h2 className="text-3xl font-light text-white mb-6 mt-12 tracking-wide">Basic Flow</h2>

            <div className="space-y-4 my-6 border border-white/10 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-sm">
                  1
                </div>
                <div>
                  <h4 className="text-white mb-1">User Setup</h4>
                  <p className="text-white/60 text-sm">User installs Onli-You, creating their Onli ID and vault.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-sm">
                  2
                </div>
                <div>
                  <h4 className="text-white mb-1">Authenticate</h4>
                  <p className="text-white/60 text-sm">Obtain ProfileTray API key/secret.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-sm">
                  3
                </div>
                <div>
                  <h4 className="text-white mb-1">Call Specie API</h4>
                  <p className="text-white/60 text-sm">Make request with signed MCP headers.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-sm">
                  4
                </div>
                <div>
                  <h4 className="text-white mb-1">Receive Receipt</h4>
                  <p className="text-white/60 text-sm">Store receipt locally as proof.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-sm">
                  5
                </div>
                <div>
                  <h4 className="text-white mb-1">(Optional) Verify</h4>
                  <p className="text-white/60 text-sm">Verify via Oracle.RevealGenomes (owner-only access).</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-light text-white mb-6 mt-12 tracking-wide">Example — Buying from Treasury</h2>

            <div className="bg-white/5 border border-white/10 p-6 my-6">
              <pre className="text-white/80 text-xs font-mono overflow-x-auto leading-relaxed">{`curl -X POST https://api.specie.market/mcp/eventRequest \\
-H "X-API-Key:$KEY" \\
-H "X-Nonce:$NONCE" \\
-H "X-Timestamp:$TS" \\
-H "X-Event-Id:$EID" \\
-H "X-Signature:$SIG" \\
-H "Content-Type: application/json" \\
-d '{
  "protocol": "mcp",
  "version": "1.0.0",
  "tool": "Specie",
  "action": "BUY",
  "parameters": {
    "amount": 1000,
    "to": "treasury",
    "payWith": {"currency": "USDT_TRC20", "proof": "npmt_9Q3..."}
  }
}'`}</pre>
            </div>

            <p className="text-white/60 text-sm mb-12">
              <strong className="text-white">Response:</strong> A signed Receipt confirming issuance.
            </p>

            <h2 className="text-3xl font-light text-white mb-6 mt-12 tracking-wide">SDK Example (Node.js)</h2>

            <div className="bg-white/5 border border-white/10 p-6 my-6">
              <pre className="text-white/80 text-xs font-mono overflow-x-auto leading-relaxed">{`import crypto from 'crypto';
import fetch from 'node-fetch';

const createSignature = (body, nonce, timestamp, secret) => {
  const data = JSON.stringify(body) + nonce + timestamp;
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
};

async function specieCall(action, params, credentials) {
  const nonce = crypto.randomUUID();
  const timestamp = new Date().toISOString();
  const body = {
    protocol: 'mcp',
    version: '1.0.0',
    tool: 'Specie',
    action,
    parameters: params
  };
  const signature = createSignature(body, nonce, timestamp, credentials.secret);

  const res = await fetch('https://api.specie.market/mcp/eventRequest', {
    method: 'POST',
    headers: {
      'X-API-Key': credentials.apiKey,
      'X-Nonce': nonce,
      'X-Timestamp': timestamp,
      'X-Event-Id': crypto.randomUUID(),
      'X-Signature': signature,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  return res.json();
}`}</pre>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 flex justify-between">
              <Link href="/documentation/mcp" className="text-white/60 hover:text-white">
                ← Model Context Protocol
              </Link>
              <Link href="/documentation/api-reference" className="text-white/60 hover:text-white">
                API Reference →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
