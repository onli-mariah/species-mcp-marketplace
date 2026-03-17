"use client"

import { TooltipProvider } from "@/components/ui/tooltip"
import type React from "react"
import { useEffect, useState } from "react"
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type EdgeProps,
  getBezierPath,
  type Node,
  type Edge,
  Handle,
  Position,
  type NodeProps,
  useNodesState,
  useEdgesState,
} from "@xyflow/react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronLeft, ChevronRight, RotateCcw, Trash2, Pencil, Cog, Home } from "lucide-react"
import "@xyflow/react/dist/style.css"

type Stage =
  | "request.submitted"
  | "request.authenticated"
  | "order.received"
  | "order.validated"
  | "order.classified"
  | "order.matched"
  | "payment.confirmed"
  | "ownership.changed"
  | "order.completed"

type NodeStatus = "idle" | "running" | "ok" | "error"

interface ServiceCardData extends Record<string, unknown> {
  title: string
  role: string
  description: string
  status: NodeStatus
  Input?: Array<{ id: string; name: string; desc?: string }>
  Output?: Array<{ id: string; name: string; desc?: string }>
  themeBorder?: string
  isInput?: boolean
  isOutput?: boolean
  isWorker?: boolean
}

const stageToNodeId: Record<Stage, string> = {
  "request.submitted": "developerUi",
  "request.authenticated": "authenticator",
  "order.received": "marketplaceApi",
  "order.validated": "validator",
  "order.classified": "classifier",
  "order.matched": "matching",
  "payment.confirmed": "cashier",
  "ownership.changed": "assetDelivery",
  "order.completed": "floorManager",
}

type ServiceCardNodeType = Node<ServiceCardData, "serviceCard">

function ServiceCardNode({ data, selected }: NodeProps<ServiceCardNodeType>) {
  const inputs = data.Input ?? []
  const outputs = data.Output ?? []
  const borderColor = selected
    ? "border-foreground"
    : data.themeBorder || (data.isInput ? "border-blue-500" : data.isOutput ? "border-purple-500" : "border-border")

  return (
    <div className={`relative w-[420px] rounded-none border-2 bg-card text-card-foreground transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.2)] hover:-translate-y-1 ${borderColor}`}>
      <Handle
        id="in-top"
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-background !border-2 !border-foreground !rounded-none"
      />
      <Handle
        id="in-left"
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-background !border-2 !border-foreground !rounded-none"
      />
      <Handle
        id="out-right"
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-background !border-2 !border-foreground !rounded-none"
      />
      <Handle
        id="out-bottom"
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-background !border-2 !border-foreground !rounded-none"
      />

      <div className="flex items-center justify-between gap-2 px-4 py-3 border-b-2 border-border bg-white/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-none bg-background border-2 border-foreground grid place-items-center">
            <span className="text-[10px] font-black text-foreground">↯</span>
          </div>
          <div className="text-sm font-black uppercase tracking-widest">{data.title}</div>
        </div>
        {data.isWorker && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-none bg-background border-2 border-foreground text-[10px] text-foreground font-bold uppercase tracking-widest">
            <Cog className="h-3 w-3" />
            <span>Worker</span>
          </div>
        )}
      </div>

      <div className="px-4 pt-4">
        <div className="rounded-none bg-white/60 backdrop-blur-sm border-2 border-border p-3 text-[12px] flex items-center gap-3">
          <span className="font-medium leading-snug">{data.role}</span>
        </div>
      </div>

      <div className="px-4 pt-4 pb-3 text-[13px] text-muted-foreground font-medium">
        <div className="leading-relaxed">{data.description}</div>
      </div>

      {inputs.length > 0 && (
        <>
          <div className="mt-2 border-t-2 border-border" />
          <div className="px-4 py-4 bg-white/40 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] font-bold uppercase tracking-widest text-foreground">Input Events</div>
            </div>
            <div className="space-y-3">
              {inputs.map((i) => (
                <div key={i.id} className="rounded-none border-2 border-border bg-white/80 p-3 group hover:border-foreground transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="text-[12px] font-mono font-bold text-foreground">{i.name}</div>
                    <div className="flex items-center gap-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="rounded-none p-1.5 border-2 border-transparent hover:border-border hover:bg-secondary hover:text-foreground transition-all" aria-label="edit-input">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button className="rounded-none p-1.5 border-2 border-transparent hover:border-destructive hover:bg-destructive hover:text-destructive-foreground transition-all" aria-label="delete-input">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  {i.desc && <div className="text-[11px] font-medium text-muted-foreground mt-1.5">{i.desc}</div>}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {outputs.length > 0 && (
        <>
          <div className="mt-0 border-t-2 border-border" />
          <div className="px-4 py-4 bg-white/40 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] font-bold uppercase tracking-widest text-foreground">Output Events</div>
            </div>
            <div className="space-y-3">
              {outputs.map((o) => (
                <div key={o.id} className="rounded-none border-2 border-border bg-white/80 p-3 group hover:border-foreground transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="text-[12px] font-mono font-bold text-foreground">{o.name}</div>
                    <div className="flex items-center gap-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="rounded-none p-1.5 border-2 border-transparent hover:border-border hover:bg-secondary hover:text-foreground transition-all" aria-label="edit-output">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button className="rounded-none p-1.5 border-2 border-transparent hover:border-destructive hover:bg-destructive hover:text-destructive-foreground transition-all" aria-label="delete-output">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  {o.desc && <div className="text-[11px] font-medium text-muted-foreground mt-1.5">{o.desc}</div>}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const baseNodes: Node<ServiceCardData>[] = [
  {
    id: "configModule",
    type: "serviceCard",
    position: { x: 400, y: -450 },
    data: {
      title: "Configuration Module",
      role: "FeeModule & System Users",
      themeBorder: "border-slate-500",
      description:
        "Centralized, versioned configuration for marketplace fees and system users. Loaded at boot by all services. Provides pure, read-only API for policies and deterministic FeeModule.",
      status: "idle",
      Input: [],
      Output: [],
      isWorker: false,
    },
  },
  {
    id: "developerUi",
    type: "serviceCard",
    position: { x: 0, y: 0 },
    data: {
      title: "Developer UI",
      role: "Client Emitter/Viewer - Event Request",
      themeBorder: "border-blue-500",
      description:
        "Defines the structure, authentication headers, and validation logic for submitting a transaction event into the Onli Marketplace pipeline.",
      status: "idle",
      Input: [{ id: "evt-done", name: "order.completed", desc: "Display final receipt" }],
      Output: [{ id: "evt-sub", name: "request.submitted", desc: "POST /eventRequest" }],
      isInput: true,
    },
  },
  {
    id: "authenticator",
    type: "serviceCard",
    position: { x: 700, y: 0 },
    data: {
      title: "Authenticator",
      role: "Security Gate & Policy Enforcer",
      themeBorder: "border-indigo-500",
      description:
        "Verifies Marketplace API key + HMAC/nonce/timestamp, confirms Onli user identity with Onli Cloud, and issues an AuthorizeBehavior decision to gate the pipeline.",
      status: "idle",
      Input: [{ id: "evt-sub", name: "request.submitted", desc: "Inbound eventRequest" }],
      Output: [{ id: "evt-auth", name: "request.authenticated", desc: "Request passes authentication" }],
    },
  },
  {
    id: "marketplaceApi",
    type: "serviceCard",
    position: { x: 1400, y: 0 },
    data: {
      title: "Marketplace API",
      role: "Ingress gateway for the marketplace. Accepts a single EventRequest, enforces idempotency, persists ingress, and enqueues the pipeline via a transactional outbox. Emits `order.received`. Also exposes: event receipt retrieval/stream, match‑time proof submission (prepaid model), and read-only balance/query endpoints.",
      themeBorder: "border-violet-500",
      description:
        "Accepts EventRequest, enforces idempotency, persists ingress record, and enqueues pipeline via transactional outbox. Emits order.received. Exposes balance/query endpoints and public health/stats.",
      status: "idle",
      Input: [{ id: "evt-auth", name: "request.authenticated", desc: "Auth OK" }],
      Output: [{ id: "evt-rec", name: "order.received", desc: "Accepted and enqueued" }],
    },
  },
  {
    id: "validator",
    type: "serviceCard",
    position: { x: 0, y: 700 },
    data: {
      title: "Validator",
      role: "Preflight Checks",
      themeBorder: "border-fuchsia-500",
      description: "External checks: UserProvider, PaymentProvider, AssetProvider.",
      status: "idle",
      Input: [{ id: "evt-rec", name: "order.received", desc: "Start preflight" }],
      Output: [{ id: "evt-val", name: "order.validated", desc: "All preflight checks passed" }],
      isWorker: true,
    },
  },
  {
    id: "classifier",
    type: "serviceCard",
    position: { x: 700, y: 700 },
    data: {
      title: "Classifier",
      role: "Routing / Intent",
      themeBorder: "border-pink-500",
      description: "Determines intent (buy | sell | transfer) and routes flow.",
      status: "idle",
      Input: [{ id: "evt-val", name: "order.validated", desc: "Validated order" }],
      Output: [{ id: "evt-cls", name: "order.classified", desc: "Intent resolved" }],
      isWorker: true,
    },
  },
  {
    id: "matching",
    type: "serviceCard",
    position: { x: 1400, y: 700 },
    data: {
      title: "Matching Service",
      role: "Counterparty Resolver",
      themeBorder: "border-rose-500",
      description: "Resolves counterparties and computes split fills.",
      status: "idle",
      Input: [{ id: "evt-cls", name: "order.classified", desc: "Routed for matching" }],
      Output: [{ id: "evt-mat", name: "order.matched", desc: "Fills computed" }],
      isWorker: true, // Mark as worker
    },
  },
  {
    id: "cashier",
    type: "serviceCard",
    position: { x: 0, y: 1400 },
    data: {
      title: "Cashier Service",
      role: "Payments",
      themeBorder: "border-orange-500",
      description: "Collects and confirms payments (per-fill or split) with gateway receipts.",
      status: "idle",
      Input: [{ id: "evt-mat", name: "order.matched", desc: "Begin payment collection" }],
      Output: [{ id: "evt-pay", name: "payment.confirmed", desc: "Payment receipts present" }],
      isWorker: true, // Mark as worker
    },
  },
  {
    id: "assetDelivery",
    type: "serviceCard",
    position: { x: 700, y: 1400 },
    data: {
      title: "AssetDelivery Service",
      role: "Ownership Transfer",
      themeBorder: "border-amber-500",
      description: "Calls Onli Cloud ChangeOwner (transfer path may bypass payment).",
      status: "idle",
      Input: [{ id: "evt-pay", name: "payment.confirmed", desc: "Proceed to ChangeOwner" }],
      Output: [{ id: "evt-own", name: "ownership.changed", desc: "Asset receipt (assetReceiptId)" }],
      isWorker: true, // Mark as worker
    },
  },
  {
    id: "floorManager",
    type: "serviceCard",
    position: { x: 1400, y: 1400 },
    data: {
      title: "FloorManager Service",
      role: "Final reconciler and receipt composer. Listens for `ownership.changed` and (if applicable) `payment.confirmed`, verifies the asset receipt via the Oracle, finalizes ledger postings, composes the canonical `eventReceipt`, and emits `order.completed`. Floor Manager is read/write on ledgers, but read-only to Onli Cloud (verify only).",
      themeBorder: "border-lime-500",
      description: "Verifies oracle receipt, aggregates events, composes final eventReceipt.",
      status: "idle",
      Input: [{ id: "evt-own", name: "ownership.changed", desc: "Ownership change confirmed" }],
      Output: [{ id: "evt-done", name: "order.completed", desc: "Final eventReceipt composed" }],
      isWorker: true, // Mark as worker
    },
  },
  {
    id: "endReceipt",
    type: "serviceCard",
    position: { x: 700, y: 2100 },
    data: {
      title: "Reporter (Side Car)",
      role: "Receipts & Reports",
      themeBorder: "border-emerald-500",
      description:
        "Read-only projections for developers and admins. Subscribes to order.completed and ledger.posted, builds materialized views for event receipts, user statements, and admin market analytics.",
      status: "idle",
      Input: [
        { id: "evt-done", name: "order.completed", desc: "Terminal receipt for event projection" },
        { id: "evt-ledger", name: "ledger.posted", desc: "Ledger entries for statement views" },
      ],
      Output: [],
      isOutput: true,
    },
  },
]

const baseEdges: Edge[] = [
  // Connecting Configuration Module
  {
    id: "e-config-auth",
    source: "configModule",
    target: "authenticator",
    label: "configuration",
    type: "status",
  },
  {
    id: "e-config-market",
    source: "configModule",
    target: "marketplaceApi",
    label: "configuration",
    type: "status",
  },
  {
    id: "e-config-validator",
    source: "configModule",
    target: "validator",
    label: "configuration",
    type: "status",
  },
  {
    id: "e-config-classifier",
    source: "configModule",
    target: "classifier",
    label: "configuration",
    type: "status",
  },
  {
    id: "e-config-cashier",
    source: "configModule",
    target: "cashier",
    label: "configuration",
    type: "status",
  },
  {
    id: "e-config-floor",
    source: "configModule",
    target: "floorManager",
    label: "configuration",
    type: "status",
  },
  {
    id: "e-config-reporter",
    source: "configModule",
    target: "endReceipt",
    label: "configuration",
    type: "status",
  },
  {
    id: "e-ui-auth",
    source: "developerUi",
    target: "authenticator",
    label: "request.submitted",
    type: "status",
  },
  {
    id: "e-auth-api",
    source: "authenticator",
    target: "marketplaceApi",
    label: "request.authenticated",
    type: "status",
  },
  { id: "e-api-val", source: "marketplaceApi", target: "validator", label: "order.received", type: "status" },
  { id: "e-val-class", source: "validator", target: "classifier", label: "order.validated", type: "status" },
  { id: "e-class-mat", source: "classifier", target: "matching", label: "order.classified", type: "status" },
  { id: "e-mat-cash", source: "matching", target: "cashier", label: "order.matched", type: "status" },
  { id: "e-cash-asset", source: "cashier", target: "assetDelivery", label: "payment.confirmed", type: "status" },
  {
    id: "e-asset-floor",
    source: "assetDelivery",
    target: "floorManager",
    label: "ownership.changed",
    type: "status",
  },
  { id: "e-floor-end", source: "floorManager", target: "endReceipt", label: "order.completed", type: "status" },
]

const StatusEdge: React.FC<EdgeProps> = (props) => {
  const { sourceX, sourceY, targetX, targetY, markerEnd, data, label, selected } = props
  const [path, labelX, labelY] = getBezierPath({ sourceX, sourceY, targetX, targetY })
  const status = (data?.status as NodeStatus) || "idle"
  const color =
    status === "ok" ? "#10b981" : status === "error" ? "#f43f5e" : status === "running" ? "#f59e0b" : "#a1a1aa"
  return (
    <g>
      <path d={path} stroke={selected ? "#111111" : color} strokeWidth={selected ? 3 : 2} fill="none" markerEnd={markerEnd} className="transition-all" />
      {label && (
        <foreignObject x={labelX - 60} y={labelY - 12} width={120} height={24}>
          <div style={{ fontSize: 10, textAlign: "center", color: selected ? "#ffffff" : "#111111", fontWeight: 700, fontFamily: "monospace", backgroundColor: selected ? "#111111" : "#ffffff", border: selected ? "none" : "2px solid #e4e4e7", padding: "1px 4px" }}>{label}</div>
        </foreignObject>
      )}
    </g>
  )
}

const nodeTypes = { serviceCard: ServiceCardNode as unknown as any }
const edgeTypes = { status: StatusEdge } as const

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <ul className="list-disc pl-4 space-y-1">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  )
}

function Legend() {
  return (
    <div className="flex items-center gap-3 border-2 border-border px-3 py-1 bg-secondary text-foreground uppercase tracking-widest font-bold">
      <span className="inline-flex items-center gap-2 text-[10px]">
        <span className="h-2 w-2 bg-emerald-600 inline-block border border-foreground" /> ok
      </span>
      <span className="inline-flex items-center gap-2 text-[10px]">
        <span className="h-2 w-2 bg-amber-500 inline-block border border-foreground" /> running
      </span>
      <span className="inline-flex items-center gap-2 text-[10px]">
        <span className="h-2 w-2 bg-rose-500 inline-block border border-foreground" /> error
      </span>
      <span className="inline-flex items-center gap-2 text-[10px]">
        <span className="h-2 w-2 bg-muted-foreground inline-block border border-foreground" /> idle
      </span>
    </div>
  )
}

// Define the type for NodeInspectorContent to satisfy the Record type
type NodeInspectorContent = {
  node: string
  role: string
  headers: Array<{ name?: string; key?: string; value?: string; comment?: string }> | string
  logic: string[]
  typescript: string
  json: string
}

const nodeInspectorContent: Record<string, NodeInspectorContent> = {
  configModule: {
    node: "Configuration Module (v4.1)",
    role: "Canonical runtime configuration for the SPECIES Marketplace Appliance. Provides fee policies, payment provider and network rules, Onli Cloud endpoints, and the Marketplace User Registry sync from Species_ProfileTray. Manages environment-specific settings with override capabilities. Firefly is the accounting backend inside the Marketplace.",
    headers: "Internal service - configuration API uses basic auth for admin access",
    logic: [
      "1) Load base configuration from files (YAML/JSON)",
      "2) Apply environment variable overrides",
      "3) Fetch dynamic configuration from database if enabled",
      "4) Sync user registry from ProfileTray on schedule (every 5 minutes)",
      "5) Calculate fee amounts based on transaction type and amount",
      "6) Provide fee routing destinations (treasury, operator, market maker)",
      "7) Monitor configuration changes and trigger reloads",
      "8) Expose configuration version for audit purposes",
      "9) Validate configuration changes before applying",
      "10) Maintain configuration history for rollback",
      "11) Export configuration for disaster recovery",
      "12) Provide health check including dependency status",
    ],
    typescript: `// Interfaces
export interface FeeConfiguration {
  listing: {
    flatUsdt: number;        // $100
    thresholdSpecies: number; // 5000 minimum
  };
  issuance: {
    perSpeciesUsdt: number;  // $0.01
  };
  liquidity: {
    percentageRate: number;  // 2%
  };
  destinations: {
    treasury: string;
    operator: string;
    marketMaker: string;
    assurance: string;
  };
}

export interface SystemUsers {
  treasury: {
    onliId: string;
    vaultId: string;
    role: 'treasury';
  };
  operator: {
    onliId: string;
    vaultId: string;
    role: 'operator';
  };
  marketMaker: {
    onliId: string;
    vaultId: string;
    role: 'market_maker';
  };
}`,
    json: `{
  "appConfig": {
    "appSymbol": "SPECIES",
    "version": "4.1.0",
    "environment": "production"
  },
  "feeConfig": {
    "listing": {
      "flatUsdt": 100.00,
      "thresholdSpecies": 5000
    },
    "issuance": {
      "perSpeciesUsdt": 0.01
    },
    "liquidity": {
      "percentageRate": 2.0
    }
  },
  "sync": {
    "profileTray": {
      "enabled": true,
      "interval": 300,
      "batchSize": 100
    }
  }
}`,
  },
  authenticator: {
    node: "Authenticator (v4.1)",
    role: "Security gate and policy enforcer for the SPECIES Marketplace Appliance. Authenticates requests using the Marketplace-issued API Key and an HMAC signature created with the Secret kept in Species_ProfileTray. Resolves user presence/status via the Marketplace User Registry (synced from ProfileTray), then consults Onli Cloud AuthorizeBehavior to gate entry.",
    headers: [
      { key: "X-API-Key", value: "<marketplace_api_key>", comment: "issued by Marketplace" },
      { key: "X-Nonce", value: "<uuid-v4>", comment: "anti-replay (≤60s)" },
      { key: "X-Timestamp", value: "<RFC3339>", comment: "freshness window" },
      { key: "X-Signature", value: "base64(HMAC-SHA256(rawBody, <secret_from_ProfileTray>))", comment: "" },
      { key: "X-Event-Id", value: "<eventId>", comment: "idempotency key" },
    ],
    logic: [
      "1) Lookup API key in Marketplace User Registry → fetch {onliId, status, vaultId?, profileTrayRef?}",
      "2) Check cache for secret; if miss, server-to-server lookup of Secret via ProfileTrayRef",
      "3) Verify HMAC signature with secret + validate nonce uniqueness (60s) + timestamp freshness",
      "4) Check Marketplace user status ∈ {ACTIVE}; else reject with AUTH003",
      "5) Check rate limits: global (1000 rps) and per-key (10 rps)",
      "6) Call Onli Cloud AuthorizeBehavior(subject={onliId}, action='marketplace:eventRequest', context={eventId})",
      "7) If decision=ALLOW → emit 'request.authenticated' and cache result (5 min TTL)",
      "8) Else → emit 'auth.failed' with specific error code and stop",
      "9) Store nonce in Redis with 60s TTL for replay protection",
      "10) Update last_used timestamp for API key in database",
    ],
    typescript: `// Interfaces
export interface AuthHeaders {
  'X-API-Key': string;
  'X-Nonce': string;
  'X-Timestamp': string;
  'X-Signature': string;
  'X-Event-Id': string;
}

export interface MarketplaceUser {
  marketplaceUserId: string;
  onliId: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'REVOKED' | 'INVITED';
  vaultId?: string;
  profileTrayRef?: string;
  apiKeyId?: string;
  lastSync?: Date;
}

export interface AuthenticatedEvent {
  topic: 'request.authenticated';
  eventId: string;
  onliId: string;
  policyDecision: 'ALLOW';
  policyId?: string;
  ts: string;
}

export interface AuthFailedEvent {
  topic: 'auth.failed';
  eventId: string;
  code: 
    | 'AUTH001' // Invalid API key
    | 'AUTH002' // Invalid signature  
    | 'AUTH003' // User not active
    | 'AUTH004' // Nonce replay
    | 'AUTH005' // Timestamp expired
    | 'AUTH006' // Rate limit exceeded
    | 'AUTH007' // Policy denied
    | 'AUTH008' // Service unavailable;
  reason?: string;
  ts: string;
}`,
    json: `{
  "service": {
    "name": "authenticator",
    "port": 8081,
    "timeout": 30
  },
  "cache": {
    "userProfiles": { "ttl": 300, "maxSize": 10000 },
    "secrets": { "ttl": 3600, "maxSize": 1000 },
    "authDecisions": { "ttl": 300, "maxSize": 5000 },
    "nonces": { "ttl": 60, "maxSize": 10000 }
  },
  "rateLimiter": {
    "global": {
      "requestsPerSecond": 1000,
      "burstSize": 2000
    },
    "perApiKey": {
      "requestsPerSecond": 10,
      "burstSize": 20
    }
  }
}`,
  },

  marketplaceApi: {
    node: "Marketplace API (v4.1)",
    role: "Ingress gateway for the SPECIES Marketplace Appliance. Validates requests, enforces idempotency/outbox pattern, resolves identities & vaults via the Marketplace User Registry (synced from Species_ProfileTray). Handles event submission, match proof submission, receipt retrieval, and admin operations including API key management.",
    headers: [
      { key: "X-API-Key", value: "<marketplace_api_key>", comment: "Required for all requests" },
      { key: "X-Nonce", value: "<uuid-v4>", comment: "Required for mutation requests" },
      { key: "X-Timestamp", value: "<RFC3339>", comment: "Required for mutation requests" },
      { key: "X-Signature", value: "<hmac_signature>", comment: "Required for mutation requests" },
      { key: "X-Event-Id", value: "<eventId>", comment: "Required for eventRequest" },
      { key: "Content-Type", value: "application/json", comment: "Required" },
    ],
    logic: [
      "1) Validate request format, size (<1MB), and content-type",
      "2) Forward authentication to Authenticator service",
      "3) For eventRequest: Check idempotency by (eventId + body_hash)",
      "4) First-seen request → persist to event_ingress table with status='PROCESSING'",
      "5) Resolve from/to → {onliId, vaultId} from Marketplace User Registry (cache-first)",
      "6) Validate resolved users are ACTIVE status",
      "7) Write to transactional outbox: emit 'order.received' event",
      "8) Return 202 Accepted with eventId and tracking URL",
      "9) For duplicate requests: check body_hash → same=202, different=409",
      "10) For match proofs: forward to Validator service directly",
      "11) For receipts: query from Reporter service with caching",
      "12) Admin endpoints: manage API keys with proper authorization",
    ],
    typescript: `// Interfaces
export interface EventRequest {
  eventId: string;
  from: string;
  to: string;
  amount: number;
  payWith?: {
    currency: 'USDT';
    chain: 'TRON' | 'ETH' | 'BSC';
    proof?: string;
    feeProof?: string;
  };
  putProceeds?: {
    usdtAddress: string;
    chain: 'TRON' | 'ETH' | 'BSC';
  };
  metadata?: {
    listingId?: string;
    note?: string;
  };
}

export interface AcceptedResponse {
  eventId: string;
  status: 'ACCEPTED';
  trackingUrl: string;
  estimatedCompletion?: string;
}`,
    json: `{
  "service": {
    "name": "marketplace-api",
    "port": 8080
  },
  "limits": {
    "maxRequestSize": 1048576,
    "maxEventAge": 86400,
    "requestTimeout": 30
  },
  "cache": {
    "ttl": {
      "userProfiles": 300,
      "eventReceipts": 3600,
      "idempotency": 86400
    }
  }
}`,
  },

  validator: {
    node: "Validator Service (v4.1)",
    role: "Verifies USDT payment proofs before any asset operation. Supports dual-path verification: 1) Processor path via NOWPayments API (preferred), 2) Direct chain verification via TronScan/Etherscan/BscScan. Also verifies match-time proofs and handles provider webhooks. Maintains circuit breaker pattern for external service resilience.",
    headers: "Internal service - no direct HTTP headers. Uses API keys for external provider calls.",
    logic: [
      "1) Receive validation request (admission or match-proof)",
      "2) Detect proof type: NOWPayments ID (npmt_*) or blockchain tx hash (64 hex chars)",
      "3) Check cache for recently verified proofs (10 min TTL)",
      "4) For NOWPayments: Call GET /payment/{id} with API key",
      "5) For direct chain: Query TronScan/Etherscan/BscScan based on chain",
      "6) Verify: status='finished', confirmations≥12, currency='USDT', amount within 0.1% tolerance",
      "7) Check timestamp freshness (max 60 minutes old)",
      "8) For admission: emit 'order.validated' on success or 'payment.failed' on failure",
      "9) For match-proof: emit 'payment.confirmed' with provider details",
      "10) Store verification result in cache and audit log",
      "11) Handle webhooks: verify signature → check status → emit 'payment.confirmed'",
      "12) Circuit breaker: open after 5 consecutive failures, retry after 60s",
    ],
    typescript: `// Interfaces
export type Chain = 'TRON' | 'ETH' | 'BSC';

export interface VerificationResult {
  valid: boolean;
  paymentId: string;
  actualAmount: number;
  confirmations: number;
  network: Chain;
  provider: 'NOWPayments' | 'TRON' | 'ETH' | 'BSC';
  checks: {
    statusCheck: boolean;
    amountCheck: boolean;
    currencyCheck: boolean;
    confirmationCheck: boolean;
    timestampCheck: boolean;
  };
  timestamp: Date;
}

export interface OrderValidated {
  topic: 'order.validated';
  eventId: string;
  mode: 'BUY' | 'SELL' | 'TRANSFER';
  prepaid: true;
  evidence?: {
    proof?: string;
    feeProof?: string;
    provider: string;
    confirmations: number;
    amountUsdt: number;
  };
  ts: string;
}`,
    json: `{
  "service": {
    "name": "validator",
    "port": 8083
  },
  "validation": {
    "minConfirmations": 12,
    "maxPaymentAge": 3600,
    "amountTolerancePercent": 0.1,
    "timeout": 30
  },
  "circuitBreaker": {
    "threshold": 5,
    "timeout": 60,
    "halfOpenRequests": 3
  }
}`,
  },

  classifier: {
    node: "Classifier (v4.1)",
    role: "Pure-compute router that assigns intent to a validated request and emits 'order.classified'. Determines transaction intent based on destination (treasury vs market) and listing context. Reads Marketplace User Registry for role hints when needed. Completely stateless and idempotent.",
    headers: "Internal service - receives events only, no HTTP headers.",
    logic: [
      "1) Consume 'order.validated' event from event bus",
      "2) Extract event payload with validated request details",
      "3) Check for explicit listingId in metadata → BUY_MARKET",
      "4) Resolve 'to' field against Marketplace User Registry",
      "5) If 'to' is treasury user or contains 'treasury' → BUY_TREASURY",
      "6) If putProceeds field present (seller wants USDT) → SELL_MARKET",
      "7) Otherwise, default to TRANSFER (P2P asset movement)",
      "8) Emit 'order.classified' event with determined intent",
      "9) Log classification decision for audit",
      "10) Idempotent: same eventId always produces same classification",
    ],
    typescript: `// Interfaces
export type Intent = 'BUY_TREASURY' | 'BUY_MARKET' | 'SELL_MARKET' | 'TRANSFER';

export interface OrderClassified {
  topic: 'order.classified';
  eventId: string;
  intent: Intent;
  amount: number;
  listingId?: string;
  metadata?: {
    fromRole?: string;
    toRole?: string;
    classificationReason?: string;
  };
  ts: string;
}

export enum UserRole {
  TRADER = 'trader',
  MARKET_MAKER = 'market_maker',
  TREASURY = 'treasury',
  LIQUIDITY_PROVIDER = 'liquidity_provider',
  MATCH_ME = 'match_me',
  ADMIN = 'admin'
}`,
    json: `{
  "service": {
    "name": "classifier",
    "port": 8084,
    "workers": 4
  },
  "classification": {
    "treasuryIdentifiers": [
      "treasury",
      "usr-treasury-vault-system"
    ],
    "defaultIntent": "TRANSFER"
  }
}`,
  },

  matching: {
    node: "Matching Service (v4.1)",
    role: "Counterparty resolver that consumes 'order.classified' and produces tentative fills with both parties' vault references resolved from Marketplace User Registry. Manages order matching for treasury operations, market listings, and P2P transfers. Emits 'order.matched' and 'payment.requested' events.",
    headers: "Internal service - event-driven only, no direct HTTP headers.",
    logic: [
      "1) Consume 'order.classified' event from event bus",
      "2) Load buyer and seller profiles from Marketplace User Registry (cache-first)",
      "3) For BUY_TREASURY: allocate from treasury pool, create single fill",
      "4) For BUY_MARKET: find listing by ID, check availability, reserve amount",
      "5) For SELL_MARKET: create new listing record with 48-hour expiration",
      "6) For TRANSFER: create direct P2P fill without counterparty matching",
      "7) Resolve vault IDs for both parties from registry",
      "8) Check if buyer requires payment proof (not prepaid)",
      "9) Create Fill record(s) with unique matchId per fill",
      "10) Store match reservations in database with expiration",
      "11) Emit 'order.matched' with fill details",
      "12) If buyer proof required, emit 'payment.requested'",
    ],
    typescript: `// Interfaces
export interface Fill {
  matchId: string;
  eventId: string;
  buyerId: string;
  buyerVault?: string;
  sellerId: string;
  sellerVault?: string;
  fillAmount: number;
  listingId?: string;
  requiresBuyerProof: boolean;
  status: 'PENDING' | 'RESERVED' | 'CONFIRMED' | 'EXPIRED';
  createdAt: Date;
  expiresAt: Date;
}

export interface OrderMatched {
  topic: 'order.matched';
  eventId: string;
  intent: Intent;
  fills: Fill[];
  totalAmount: number;
  metadata?: {
    listingId?: string;
    treasuryOperation?: boolean;
  };
  ts: string;
}`,
    json: `{
  "service": {
    "name": "matching",
    "port": 8085,
    "workers": 4
  },
  "matching": {
    "algorithm": "FIFO",
    "allowPartialFills": true
  },
  "listings": {
    "defaultDuration": 172800,
    "minAmount": 5000,
    "listingFee": 100.00
  },
  "reservations": {
    "defaultTTL": 300,
    "maxReservations": 1000
  }
}`,
  },

  cashier: {
    node: "Cashier (v4.1)",
    role: "Payment session initiator (fallback path) and financial ledger poster. In prepaid mode, consumes 'payment.confirmed' from Validator and posts balanced journals in Firefly (Marketplace-owned accounting system). Maintains double-entry bookkeeping with complete audit trail. Includes payment_provider_id and network metadata in journal lines.",
    headers: "Internal service - event-driven, no direct HTTP headers.",
    logic: [
      "1) Consume 'payment.confirmed' or 'payment.requested' events",
      "2) For payment.requested: create payment session with provider (optional fallback)",
      "3) For payment.confirmed: prepare double-entry journal entries",
      "4) Map accounts: user USDT_cash, SPECIES_balance, fee_income, etc.",
      "5) Calculate fees: listing fee ($100), issuance fee ($0.01/SPECIES), liquidity (2%)",
      "6) Create balanced journal lines (total Dr = total Cr)",
      "7) Post to Firefly with idempotency key (eventId:matchId)",
      "8) Store posting reference in local database",
      "9) Emit 'ledger.posted' event with posting details",
      "10) Handle reconciliation for failed/reversed transactions",
      "11) Maintain running balances cache for quick queries",
      "12) Generate period-end closing entries if needed",
    ],
    typescript: `// Interfaces
export type Currency = 'USDT' | 'SPECIES';
export type AccountKind = 
  | 'USDT_cash'
  | 'USDT_settlement_payable'
  | 'USDT_fee_income'
  | 'SPECIES_balance'
  | 'SPECIES_inventory'
  | 'SPECIES_in_transit';

export interface JournalLine {
  account: {
    onliId: string | 'treasury' | 'marketplace' | 'assurance';
    kind: AccountKind;
  };
  currency: Currency;
  amount: number;
  side: 'Dr' | 'Cr';
  memo?: string;
  meta?: {
    provider?: string;
    paymentId?: string;
    network?: string;
    confirmations?: number;
  };
}

export interface LedgerPosted {
  topic: 'ledger.posted';
  eventId: string;
  matchId: string;
  postingId: string;
  accountsAffected: string[];
  totalDebit: number;
  totalCredit: number;
  ts: string;
}`,
    json: `{
  "service": {
    "name": "cashier",
    "port": 8086
  },
  "fees": {
    "listing": {
      "amount": 100.00,
      "currency": "USDT",
      "threshold": 5000
    },
    "issuance": {
      "perSpeciesUsdt": 0.01,
      "currency": "USDT"
    },
    "liquidity": {
      "percentageRate": 2.0
    }
  },
  "firefly": {
    "defaultCurrency": "USD",
    "schema": "species"
  }
}`,
  },

  assetDelivery: {
    node: "Asset Manager (v4.1)",
    role: "Executes Onli Cloud delivery operations after 'payment.confirmed' (or immediately for TRANSFER). Uses vault IDs resolved from the Marketplace User Registry (synced from Species_ProfileTray). Manages Issue, ChangeOwner, and Ask2Receive operations. Emits 'ownership.changed' on success or 'transfer.failed' on failure.",
    headers: "Internal service for events. External Onli Cloud calls use: X-API-Key, X-API-Secret, X-Request-Id",
    logic: [
      "1) Consume 'payment.confirmed' or 'order.classified' (for TRANSFER) events",
      "2) Resolve buyer and seller vault IDs from Marketplace User Registry",
      "3) For BUY_TREASURY: Call Onli Cloud Issue(recipient=buyerVault, amount)",
      "4) For BUY_MARKET: Call ChangeOwner(from=sellerLocker, to=buyerVault)",
      "5) For TRANSFER: Optional Ask2Receive, then ChangeOwner(from=sender, to=receiver)",
      "6) Use idempotency key: eventId:matchId in X-Request-Id header",
      "7) Implement retry logic with exponential backoff (max 3 retries)",
      "8) Handle Onli Cloud responses and error codes",
      "9) On success: emit 'ownership.changed' with assetReceiptId",
      "10) On failure: emit 'transfer.failed' with specific reason",
      "11) Store operation results for audit trail",
      "12) Update cache with new ownership state",
    ],
    typescript: `// Interfaces
export interface OwnershipChanged {
  topic: 'ownership.changed';
  eventId: string;
  matchId: string;
  assetReceiptId: string;
  operation: 'Issue' | 'ChangeOwner';
  from?: string;
  to: string;
  amount: number;
  onliCloudResponse?: {
    issueId?: string;
    evolveId?: string;
    deliveredAt: string;
    pkgTag?: string;
  };
  ts: string;
}

export interface TransferFailed {
  topic: 'transfer.failed';
  eventId: string;
  matchId: string;
  reason: 
    | 'locker.unavailable'
    | 'policy.denied'
    | 'input.invalid'
    | 'consent.rejected'
    | 'consent.timeout'
    | 'provider.unavailable'
    | 'insufficient.balance'
    | 'vault.not_found';
  details?: any;
  ts: string;
}`,
    json: `{
  "service": {
    "name": "asset-manager",
    "port": 8087,
    "workers": 4
  },
  "retry": {
    "maxAttempts": 3,
    "initialDelay": 1000,
    "maxDelay": 10000,
    "multiplier": 2.0,
    "jitter": true
  },
  "operations": {
    "defaultDevice": "cloud",
    "ask2ReceiveTimeout": 60,
    "settlementWindow": 172800
  }
}`,
  },

  floorManager: {
    node: "Floor Manager (v4.1)",
    role: "Final reconciler and receipt composer. On 'ownership.changed', verifies with Onli Cloud Oracle, finalizes ledgers in Firefly (Marketplace-owned), composes the canonical eventReceipt, and emits 'order.completed'. Floor Manager is read/write on ledgers but read-only to Onli Cloud (verify only).",
    headers: "Internal service. Oracle calls use: X-API-Key, X-API-Secret, X-Request-Id",
    logic: [
      "1) Consume 'ownership.changed' events from Asset Manager",
      "2) Call Onli Cloud Oracle to verify asset receipt (RevealGenomes RPC)",
      "3) Verify current ownership matches expected state",
      "4) If Oracle verification fails, emit 'reconcile.failed' and investigate",
      "5) For successful verification, prepare final ledger entries",
      "6) Post settlement/realization entries to Firefly",
      "7) For TRANSFER: post SPECIES-only journal entries",
      "8) Compose canonical eventReceipt with all transaction details",
      "9) Store eventReceipt in database for retrieval API",
      "10) Update all caches with final state",
      "11) Emit 'order.completed' event",
      "12) Trigger cleanup of temporary reservations and locks",
    ],
    typescript: `// Interfaces
export interface OrderCompleted {
  topic: 'order.completed';
  eventId: string;
  status: 'COMPLETED';
  receipt: EventReceipt;
  ts: string;
}

export interface EventReceipt {
  eventId: string;
  status: 'COMPLETED' | 'FAILED' | 'PENDING';
  intent: 'BUY_TREASURY' | 'BUY_MARKET' | 'SELL_MARKET' | 'TRANSFER';
  from: {
    onliId: string;
    vaultId?: string;
    startBalance?: number;
    endBalance?: number;
  };
  to: {
    onliId: string;
    vaultId?: string;
    startBalance?: number;
    endBalance?: number;
  };
  amount: number;
  timestamps: {
    received: string;
    completed: string;
  };
  fees: {
    listing?: number;
    issuance?: number;
    liquidity?: number;
    total: number;
  };
}`,
    json: `{
  "service": {
    "name": "floor-manager",
    "port": 8088
  },
  "oracle": {
    "verifyEnabled": true,
    "timeout": 30,
    "retryAttempts": 3,
    "cacheResults": true,
    "cacheTTL": 300
  },
  "reconciliation": {
    "tolerances": {
      "amount": 0.01,
      "timing": 60
    },
    "failureHandling": {
      "maxRetries": 3,
      "alertOnFailure": true,
      "deadLetterQueue": true
    }
  }
}`,
  },

  endReceipt: {
    node: "Reporter (v4.1)",
    role: "Read-only projections backed by Firefly and Floor Manager receipts. Produces developer receipts, user statements, and admin market analytics. Includes payment provider metrics from Validator events. Serves HMAC-protected APIs for sensitive data retrieval.",
    headers: [
      { key: "X-API-Key", value: "<api_key>", comment: "Required for all endpoints" },
      { key: "X-Request-Signature", value: "<hmac>", comment: "Required for admin endpoints" },
    ],
    logic: [
      "1) Subscribe to 'order.completed' and 'ledger.posted' events",
      "2) Build materialized views for fast querying",
      "3) Maintain denormalized read models for receipts and statements",
      "4) For receipt requests: retrieve from cache or database",
      "5) For statements: aggregate journal entries from Firefly",
      "6) Apply pagination with cursor-based navigation",
      "7) For market overview: calculate aggregate metrics",
      "8) For circulation reports: sum treasury and user balances",
      "9) Cache frequently accessed data with appropriate TTLs",
      "10) Export data in multiple formats (JSON, CSV, PDF)",
      "11) Implement data retention policies (7 years financial)",
      "12) Provide audit trail exports for compliance",
    ],
    typescript: `// Interfaces
export interface ReceiptDoc {
  eventId: string;
  blob: EventReceipt;
  completedAt: string;
  version: string;
}

export interface UserStatement {
  onliId: string;
  period: {
    from: string;
    to: string;
  };
  currency: 'SPECIES' | 'USDT';
  openingBalance: number;
  closingBalance: number;
  entries: Array<{
    date: string;
    type: string;
    description: string;
    debit?: number;
    credit?: number;
    balance: number;
    reference: string;
  }>;
  totals: {
    totalDebits: number;
    totalCredits: number;
    netChange: number;
    transactionCount: number;
  };
}`,
    json: `{
  "service": {
    "name": "reporter",
    "port": 8089
  },
  "reports": {
    "defaultLimit": 100,
    "maxLimit": 1000,
    "aggregationInterval": 3600,
    "retentionDays": 2555
  },
  "cache": {
    "receipts": {
      "ttl": 3600,
      "maxSize": 10000
    },
    "statements": {
      "ttl": 300,
      "maxSize": 1000
    }
  }
}`,
  },
}

function WorkflowCanvas({ eventId }: { eventId?: string }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(baseNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(baseEdges)
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(true)
  const [rightDrawerOpen, setRightDrawerOpen] = useState(true)
  const [leftPanelTab, setLeftPanelTab] = useState<"overview" | "providers">("overview")
  // const [eventLog, setEventLog] = useState<Array<{ time: string; message: string }>>([]) // Removed Event Log state
  const [selectedNode, setSelectedNode] = useState<Node<ServiceCardData> | null>(null)
  const [codeTab, setCodeTab] = useState<"typescript" | "json">("typescript")

  useEffect(() => {
    if (!eventId) return
    const ev = new EventSource(`/events/${eventId}/stream`)
    ev.onmessage = (m) => {
      try {
        const data = JSON.parse(m.data)
        const topic: Stage | undefined = data?.topic
        if (!topic) return

        const nodeId = stageToNodeId[topic]
        setNodes((prev) =>
          prev.map((n) => (n.id === nodeId ? { ...n, data: { ...n.data, status: "ok" as NodeStatus } } : n)),
        )
        setEdges((prev) =>
          prev.map((e) => {
            if (e.label === topic) {
              return { ...e, data: { ...(e.data || {}), status: "ok" } }
            }
            return e
          }),
        )
      } catch (error) {
        // If debugging is needed, errors can be logged to an external service
      }
    }
    return () => ev.close()
  }, [eventId])

  const handleReset = () => {
    setNodes(baseNodes)
    setEdges(baseEdges)
    // setEventLog([]) // Removed Event Log reset
    setSelectedNode(null)
  }

  const onNodeClick = (_event: React.MouseEvent, node: Node<ServiceCardData>) => {
    setSelectedNode(node)
  }

  const leftCols = leftDrawerOpen ? "col-span-3" : "col-span-0"
  const rightCols = rightDrawerOpen ? "col-span-3" : "col-span-0"
  const centerCols =
    leftDrawerOpen && rightDrawerOpen ? "col-span-6" : leftDrawerOpen || rightDrawerOpen ? "col-span-9" : "col-span-12"

  return (
    <TooltipProvider>
      <div className="h-full w-full bg-background grid grid-cols-12 rounded-none overflow-hidden border-2 border-border">
        {leftDrawerOpen && (
          <aside
            className={`${leftCols} border-r-2 border-border bg-card p-4 overflow-auto text-foreground text-[12px] leading-5 transition-all duration-300`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-lg font-bold text-foreground uppercase tracking-tight">Species: An Onli Asset</h2>
                <div className="text-muted-foreground font-medium">A headless marketplace for a micro‑currency</div>
                <div className="text-muted-foreground mb-3 font-medium">Powered by Onli</div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-foreground rounded-none"
                onClick={() => setLeftDrawerOpen(false)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-2 mb-4 border-b-2 border-border">
              <button
                onClick={() => setLeftPanelTab("overview")}
                className={`px-3 py-2 text-xs font-bold uppercase transition-colors ${
                  leftPanelTab === "overview"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                System Overview
              </button>
              <button
                onClick={() => setLeftPanelTab("providers")}
                className={`px-3 py-2 text-xs font-bold uppercase transition-colors ${
                  leftPanelTab === "providers"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Service Providers
              </button>
            </div>

            {leftPanelTab === "overview" ? (
              <Accordion type="multiple" defaultValue={["features"]} className="w-full">
                <AccordionItem value="features">
                  <AccordionTrigger className="text-[11px] uppercase tracking-wide opacity-70 hover:opacity-100">
                    Features
                  </AccordionTrigger>
                  <AccordionContent>
                    <Section
                      title=""
                      items={[
                        "Fixed price: $1",
                        "Treasury: 1B assets",
                        "Assurance: 100% backed (proceeds from issuance sale go to the Assurance account)",
                        "Liquidity: buy‑back guarantee",
                        "Fast: peer‑to‑peer transactions",
                        "Final: transactions are non‑reversible",
                        "Every transaction is authenticated and authorized",
                        "Private by default",
                        "Actual‑possession based (Onli — no blockchain)",
                      ]}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="marketplace">
                  <AccordionTrigger className="text-[11px] uppercase tracking-wide opacity-70 hover:opacity-100">
                    Marketplace Features
                  </AccordionTrigger>
                  <AccordionContent>
                    <Section
                      title=""
                      items={[
                        "BUY_TREASURY — purchase from treasury",
                        "SELL_MARKET — list for sale",
                        "BUY_MARKET — buy from market",
                        "TRANSFER — P2P transfers",
                        "BUY_LIQUIDITY — instant liquidity purchase",
                        "SELL_LIQUIDITY — instant liquidity sale",
                      ]}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="security">
                  <AccordionTrigger className="text-[11px] uppercase tracking-wide opacity-70 hover:opacity-100">
                    Security Features
                  </AccordionTrigger>
                  <AccordionContent>
                    <Section
                      title=""
                      items={[
                        "HMAC‑SHA256 authentication",
                        "Nonce replay protection (60‑second window)",
                        "Timestamp validation",
                        "API key management with encryption",
                        "Idempotency enforcement",
                      ]}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="financial">
                  <AccordionTrigger className="text-[11px] uppercase tracking-wide opacity-70 hover:opacity-100">
                    Financial Features
                  </AccordionTrigger>
                  <AccordionContent>
                    <Section
                      title=""
                      items={[
                        "Double‑entry accounting (Firefly III)",
                        "Multi‑chain payments (TRON, Polygon, Ethereum, BSC)",
                        "NOWPayments integration",
                        "Automated payouts",
                        "Assurance pool auto‑buy (48‑hour cron)",
                      ]}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="balance">
                  <AccordionTrigger className="text-[11px] uppercase tracking-wide opacity-70 hover:opacity-100">
                    Balance & Query Features
                  </AccordionTrigger>
                  <AccordionContent>
                    <Section
                      title=""
                      items={[
                        "User balance queries",
                        "Circulation statistics",
                        "Treasury balance",
                        "Assurance balance",
                        "User directory",
                      ]}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="llm">
                  <AccordionTrigger className="text-[11px] uppercase tracking-wide opacity-70 hover:opacity-100">
                    LLM Integration
                  </AccordionTrigger>
                  <AccordionContent>
                    <Section
                      title=""
                      items={[
                        "Intent-based transactions",
                        "MCP server with pre‑built tools",
                        "Real‑time state queries",
                        "Natural‑language transaction support",
                        "Automatic transaction classification",
                      ]}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="admin">
                  <AccordionTrigger className="text-[11px] uppercase tracking-wide opacity-70 hover:opacity-100">
                    Admin Features
                  </AccordionTrigger>
                  <AccordionContent>
                    <Section
                      title=""
                      items={[
                        "Operational dashboard with KPIs",
                        "Order management and filtering",
                        "Settlement tracking",
                        "System user configuration",
                        "API key management",
                        "Test harness",
                      ]}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="observability">
                  <AccordionTrigger className="text-[11px] uppercase tracking-wide opacity-70 hover:opacity-100">
                    Observability
                  </AccordionTrigger>
                  <AccordionContent>
                    <Section
                      title=""
                      items={[
                        "OpenTelemetry tracing",
                        "Metrics recording (TimescaleDB)",
                        "Circuit breakers",
                        "Health checks",
                        "Pipeline stage tracking",
                      ]}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="developer">
                  <AccordionTrigger className="text-[11px] uppercase tracking-wide opacity-70 hover:opacity-100">
                    Developer Features
                  </AccordionTrigger>
                  <AccordionContent>
                    <Section
                      title=""
                      items={[
                        "Auto‑generated API documentation",
                        "OpenAPI 3.1 specification",
                        "Complete code examples",
                        "Local development setup",
                        "Testing infrastructure",
                      ]}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <div className="space-y-4">
                <div className="text-[10px] font-bold tracking-widest uppercase text-foreground mb-3">Service Providers Summary</div>

                <div className="overflow-x-auto">
                  <table className="w-full text-[11px] border-collapse bg-secondary border-2 border-border">
                    <thead className="bg-background">
                      <tr className="border-b-2 border-border">
                        <th className="text-left py-2 px-3 text-foreground font-bold uppercase tracking-widest border-r-2 border-border">Service</th>
                        <th className="text-left py-2 px-3 text-foreground font-bold uppercase tracking-widest border-r-2 border-border">Purpose</th>
                        <th className="text-left py-2 px-3 text-foreground font-bold uppercase tracking-widest">Integration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b-2 border-border hover:bg-background transition-colors">
                        <td className="py-2 px-3 font-bold text-foreground tracking-widest uppercase border-r-2 border-border">NOWPayments</td>
                        <td className="py-2 px-3 text-muted-foreground font-medium border-r-2 border-border">Payment verification & crypto payouts</td>
                        <td className="py-2 px-3 text-muted-foreground font-medium">Settlement Manager</td>
                      </tr>
                      <tr className="border-b-2 border-border hover:bg-background transition-colors">
                        <td className="py-2 px-3 font-bold text-foreground tracking-widest uppercase border-r-2 border-border">OnliCloud</td>
                        <td className="py-2 px-3 text-muted-foreground font-medium border-r-2 border-border">Asset operations & ownership</td>
                        <td className="py-2 px-3 text-muted-foreground font-medium">Asset Manager</td>
                      </tr>
                      <tr className="hover:bg-background transition-colors">
                        <td className="py-2 px-3 font-bold text-foreground tracking-widest uppercase border-r-2 border-border">Firefly III</td>
                        <td className="py-2 px-3 text-muted-foreground font-medium border-r-2 border-border">Double-entry accounting</td>
                        <td className="py-2 px-3 text-muted-foreground font-medium">Settlement Manager</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="space-y-6 mt-6">
                  {/* NOWPayments */}
                  <div className="space-y-2 border-2 border-border p-3 bg-card">
                    <div className="text-sm font-bold uppercase tracking-widest text-foreground">NOWPayments</div>
                    <div className="text-[11px] text-muted-foreground font-medium mb-2 pb-2 border-b-2 border-border">
                      Payment gateway for cryptocurrency transactions
                    </div>
                    <div className="space-y-1 text-[11px]">
                      <div className="text-foreground font-bold tracking-widest uppercase text-[10px]">Integration Points:</div>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground font-medium ml-2">
                        <li>Proof Validator: Payment verification (12+ confirmations)</li>
                        <li>Settlement Manager: Payout processing for sellers</li>
                      </ul>
                    </div>
                    <div className="space-y-1 text-[11px] pt-2">
                      <div className="text-foreground font-bold tracking-widest uppercase text-[10px]">API:</div>
                      <div className="bg-foreground border-2 border-border p-2 rounded-none font-mono text-[10px] text-background font-bold">
                        Base: https://api.nowpayments.io/v1
                      </div>
                    </div>
                    <div className="space-y-1 text-[11px] pt-2">
                      <div className="text-foreground font-bold tracking-widest uppercase text-[10px]">Features:</div>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground font-medium ml-2">
                        <li>Multi-chain support (TRON, Polygon, Ethereum, BSC)</li>
                        <li>Payment verification with confirmation requirements</li>
                        <li>Payout processing & fee handling</li>
                      </ul>
                    </div>
                  </div>

                  {/* OnliCloud */}
                  <div className="space-y-2 border-2 border-border p-3 bg-card">
                    <div className="text-sm font-bold uppercase tracking-widest text-foreground">OnliCloud</div>
                    <div className="text-[11px] text-muted-foreground font-medium mb-2 pb-2 border-b-2 border-border">OnliYou asset management platform (gRPC)</div>
                    <div className="space-y-1 text-[11px]">
                      <div className="text-foreground font-bold tracking-widest uppercase text-[10px]">Integration Points:</div>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground font-medium ml-2">
                        <li>Asset Manager: All asset operations</li>
                      </ul>
                    </div>
                    <div className="space-y-1 text-[11px] pt-2">
                      <div className="text-foreground font-bold tracking-widest uppercase text-[10px]">Operations:</div>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground font-medium ml-2">
                        <li>Issue: Create new SPECIES from treasury</li>
                        <li>ChangeOwner: Transfer ownership between users</li>
                        <li>AuthorizeBehavior: Pre-authorize market operations</li>
                        <li>Ask2Receive: Get recipient consent for P2P transfers</li>
                        <li>GetVaultBalance: Query user vault balance</li>
                        <li>VerifyOwnership: Oracle verification</li>
                      </ul>
                    </div>
                    <div className="space-y-1 text-[11px] pt-2">
                      <div className="text-foreground font-bold tracking-widest uppercase text-[10px]">Features:</div>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground font-medium ml-2">
                        <li>Oracle verification</li>
                        <li>Vault-based asset storage</li>
                        <li>Authorization system & consent management</li>
                      </ul>
                    </div>
                  </div>

                  {/* Firefly III */}
                  <div className="space-y-2 border-2 border-border p-3 bg-card">
                    <div className="text-sm font-bold uppercase tracking-widest text-foreground">Firefly III</div>
                    <div className="text-[11px] text-muted-foreground font-medium mb-2 flex pb-2 border-b-2 border-border">Open-source personal finance manager</div>
                    <div className="space-y-1 text-[11px]">
                      <div className="text-foreground font-bold tracking-widest uppercase text-[10px]">Integration Points:</div>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground font-medium ml-2">
                        <li>Settlement Manager: All ledger entries posted here</li>
                      </ul>
                    </div>
                    <div className="space-y-1 text-[11px] pt-2">
                      <div className="text-foreground font-bold tracking-widest uppercase text-[10px]">Features:</div>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground font-medium ml-2">
                        <li>Double-entry bookkeeping</li>
                        <li>Multi-currency support</li>
                        <li>Transaction categorization</li>
                        <li>Reporting & analytics</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </aside>
        )}

        <div className={`${centerCols} flex flex-col transition-all duration-300 bg-background`}>
          <div className="flex items-center justify-between px-3 py-2 text-xs text-foreground font-bold border-b-2 border-border bg-card">
            <div className="flex items-center gap-2">
              {!leftDrawerOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-foreground rounded-none"
                  onClick={() => setLeftDrawerOpen(true)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              <a href="/" className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
                <Home className="h-4 w-4 text-primary" />
                <div className="tracking-wide uppercase text-foreground">Onli Marketplace — VO Workflow (React Flow)</div>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs text-foreground font-bold rounded-none border-2 border-border hover:bg-secondary uppercase"
                onClick={handleReset}
              >
                <RotateCcw className="h-3 w-3 mr-1 font-bold" />
                Reset
              </Button>
              <Legend />
              {!rightDrawerOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-foreground rounded-none"
                  onClick={() => setRightDrawerOpen(true)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <div className="flex-1 bg-background relative">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              fitView
              fitViewOptions={{
                padding: 0.1,
                includeHiddenNodes: false,
                minZoom: 0.8,
                maxZoom: 1.5,
              }}
              className="bg-background"
            >
              <Background color="#e4e4e7" gap={16} />
              <Controls className="border-2 border-border rounded-none" />
              <MiniMap
                nodeColor="#111111"
                maskColor="rgba(255, 255, 255, 0.6)"
                className="bg-card border-2 border-border rounded-none"
              />
            </ReactFlow>
          </div>
        </div>

        {rightDrawerOpen && (
          <aside
            className={`${rightCols} border-l-2 border-border p-4 bg-card overflow-auto text-foreground text-[12px] leading-5 transition-all duration-300`}
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground uppercase tracking-tight">Inspector</h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-foreground rounded-none"
                onClick={() => setRightDrawerOpen(false)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {selectedNode ? (
              <div className="space-y-6">
                {nodeInspectorContent[selectedNode.id] ? (
                  <>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Node</div>
                      <div className="p-3 bg-secondary rounded-none border-2 border-border">
                        <div className="font-bold text-foreground uppercase tracking-widest">{nodeInspectorContent[selectedNode.id].node}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Role</div>
                      <div className="p-3 bg-secondary rounded-none border-2 border-border">
                        <div className="flex items-start gap-3">
                          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-none bg-foreground text-[10px] font-bold text-background border-2 border-border mt-0.5">
                            INFO
                          </span>
                          <span className="text-foreground tracking-wide font-medium leading-relaxed">
                            {nodeInspectorContent[selectedNode.id].role}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Headers</div>
                      <div className="p-3 bg-secondary rounded-none border-2 border-border font-mono text-[10px] space-y-2 max-h-[180px] overflow-y-auto">
                        {typeof nodeInspectorContent[selectedNode.id].headers === "string" ? (
                          <div className="text-foreground font-bold">{nodeInspectorContent[selectedNode.id].headers as string}</div>
                        ) : (
                          (
                            nodeInspectorContent[selectedNode.id].headers as Array<{
                              key?: string
                              value?: string
                              comment?: string
                            }>
                          ).map((h, idx) => (
                            <div key={idx}>
                              <div className="text-foreground font-bold">
                                {h.key}: <span className="text-muted-foreground tracking-wide font-medium">{h.value}</span>
                              </div>
                              {h.comment && <div className="text-muted-foreground text-[9px] ml-4 font-bold">// {h.comment}</div>}
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Logic</div>
                      <div className="p-3 bg-secondary rounded-none border-2 border-border space-y-2 max-h-[220px] overflow-y-auto">
                        {nodeInspectorContent[selectedNode.id].logic.map((item, idx) => (
                          <div key={idx} className="text-foreground tracking-wide font-medium text-[11px] leading-relaxed">
                            <span className="text-foreground font-black">{idx + 1}.</span> {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Button
                          variant={codeTab === "typescript" ? "outline" : "ghost"}
                          size="sm"
                          className={`h-7 text-[11px] rounded-none uppercase font-bold tracking-widest ${codeTab === "typescript" ? "border-2 border-border" : "text-muted-foreground hover:text-foreground hover:bg-transparent"}`}
                          onClick={() => setCodeTab("typescript")}
                        >
                          TypeScript
                        </Button>
                        <Button
                          variant={codeTab === "json" ? "outline" : "ghost"}
                          size="sm"
                          className={`h-7 text-[11px] rounded-none uppercase font-bold tracking-widest ${codeTab === "json" ? "border-2 border-border" : "text-muted-foreground hover:text-foreground hover:bg-transparent"}`}
                          onClick={() => setCodeTab("json")}
                        >
                          JSON
                        </Button>
                      </div>
                      <pre className="p-3 bg-foreground rounded-none border-2 border-border font-mono text-[10px] overflow-auto max-h-[280px] text-background font-bold whitespace-pre-wrap">
                        {codeTab === "typescript"
                          ? nodeInspectorContent[selectedNode.id].typescript
                          : nodeInspectorContent[selectedNode.id].json}
                      </pre>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Generic content for other nodes */}
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Selected Node</div>
                      <div className="p-3 bg-secondary rounded-none border-2 border-border">
                        <div className="font-bold text-foreground uppercase tracking-widest mb-1">{selectedNode.data.title}</div>
                        <div className="text-muted-foreground font-medium text-[11px]">{selectedNode.data.description}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Role</div>
                      <div className="p-3 bg-secondary rounded-none border-2 border-border">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-none bg-foreground text-[10px] font-bold text-background border-2 border-border">
                            INFO
                          </span>
                          <span className="text-foreground tracking-wide font-medium">{selectedNode.data.role}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Headers</div>
                      <div className="space-y-3 max-h-[180px] overflow-y-auto">
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Request Headers</div>
                          <div className="p-3 bg-secondary rounded-none border-2 border-border font-mono text-[10px] space-y-1">
                            <div className="text-foreground font-bold">
                              Content-Type: <span className="text-muted-foreground tracking-wide font-medium">application/json</span>
                            </div>
                            <div className="text-foreground font-bold">
                              X-Event-ID: <span className="text-muted-foreground tracking-wide font-medium">{eventId}</span>
                            </div>
                            <div className="text-foreground font-bold">
                              X-Node-ID: <span className="text-muted-foreground tracking-wide font-medium">{selectedNode.id}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Logic</div>
                      <div className="p-3 bg-secondary rounded-none border-2 border-border space-y-3 max-h-[220px] overflow-y-auto">
                        {selectedNode.data.Input && selectedNode.data.Input.length > 0 && (
                          <div>
                            <div className="text-foreground font-bold uppercase tracking-widest text-[11px] mb-1">Input Events:</div>
                            <div className="space-y-2">
                              {selectedNode.data.Input.map((i) => (
                                <div key={i.id} className="pl-3 border-l-4 border-foreground py-1">
                                  <div className="font-mono font-bold text-[10px] text-foreground">{i.name}</div>
                                  {i.desc && <div className="text-muted-foreground font-medium text-[10px] mt-1">{i.desc}</div>}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {selectedNode.data.Output && selectedNode.data.Output.length > 0 && (
                          <div>
                            <div className="text-foreground font-bold uppercase tracking-widest text-[11px] mb-1">Output Events:</div>
                            <div className="space-y-2">
                              {selectedNode.data.Output.map((o) => (
                                <div key={o.id} className="pl-3 border-l-4 border-foreground py-1">
                                  <div className="font-mono font-bold text-[10px] text-foreground">{o.name}</div>
                                  {o.desc && <div className="text-muted-foreground font-medium text-[10px] mt-1">{o.desc}</div>}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Button
                          variant={codeTab === "typescript" ? "outline" : "ghost"}
                          size="sm"
                          className={`h-7 text-[11px] rounded-none uppercase font-bold tracking-widest ${codeTab === "typescript" ? "border-2 border-border" : "text-muted-foreground hover:text-foreground hover:bg-transparent"}`}
                          onClick={() => setCodeTab("typescript")}
                        >
                          TypeScript
                        </Button>
                        <Button
                          variant={codeTab === "json" ? "outline" : "ghost"}
                          size="sm"
                          className={`h-7 text-[11px] rounded-none uppercase font-bold tracking-widest ${codeTab === "json" ? "border-2 border-border" : "text-muted-foreground hover:text-foreground hover:bg-transparent"}`}
                          onClick={() => setCodeTab("json")}
                        >
                          JSON
                        </Button>
                      </div>
                      <pre className="p-3 bg-foreground rounded-none border-2 border-border font-mono text-[10px] overflow-auto max-h-[280px] text-background font-bold">
                        {codeTab === "typescript"
                          ? `// TypeScript interface for ${selectedNode.data.title}\ninterface ${selectedNode.id.charAt(0).toUpperCase() + selectedNode.id.slice(1)}Node {\n  id: string;\n  title: string;\n  role: string;\n  description: string;\n  status: NodeStatus;\n}`
                          : JSON.stringify(
                              {
                                id: selectedNode.id,
                                type: selectedNode.type,
                                position: selectedNode.position,
                                data: selectedNode.data,
                              },
                              null,
                              2,
                            )}
                      </pre>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="mb-6 p-4 bg-secondary rounded-none border-2 border-border text-center text-muted-foreground font-bold tracking-widest uppercase text-[11px]">
                Select a node to inspect
              </div>
            )}
          </aside>
        )}
      </div>
    </TooltipProvider>
  )
}

export default WorkflowCanvas
