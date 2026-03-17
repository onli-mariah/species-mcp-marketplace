"use client"

import type React from "react"

import { Handle, Position, NodeToolbar, NodeResizer, useReactFlow, type NodeProps } from "@xyflow/react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils" // optional helper if you have one

type ServiceStatus = "idle" | "running" | "ok" | "error"
type Port = { id: string; side: "left" | "right" | "top" | "bottom"; label?: string }

export type ServiceNodeData = {
  title: string
  role: string
  func: string
  emits?: string
  status?: ServiceStatus
  actions?: { id: string; label: string; onClick?: () => void }[]
  ports?: Port[]
}

const statusStyles: Record<ServiceStatus, string> = {
  idle: "bg-zinc-700 text-zinc-100 border-zinc-600",
  running: "bg-amber-500/90 text-amber-950 border-amber-600",
  ok: "bg-emerald-500/90 text-emerald-950 border-emerald-600",
  error: "bg-rose-500/90 text-rose-950 border-rose-600",
}

function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2 py-[2px] text-[10px]", className)}>
      {children}
    </span>
  )
}

export function ServiceNode({ id, data, selected }: NodeProps<ServiceNodeData>) {
  const rf = useReactFlow()
  const status = data.status ?? "idle"

  const tip = [`Role: ${data.role}`, `Function: ${data.func}`, ...(data.emits ? [`Emits: ${data.emits}`] : [])].join(
    "\n",
  )

  return (
    <div
      className={cn(
        "group relative w-[360px] rounded-xl border bg-zinc-950/90 backdrop-blur",
        selected ? "border-zinc-400" : "border-zinc-700",
      )}
    >
      {/* Resize */}
      <NodeResizer
        minWidth={320}
        minHeight={180}
        lineStyle={{ borderColor: "rgba(255,255,255,0.2)" }}
        handleStyle={{ width: 8, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.25)" }}
      />

      {/* Top accent */}
      <div className="h-1.5 w-full rounded-t-xl bg-gradient-to-r from-indigo-500 to-blue-500" />

      {/* Toolbar (hover) */}
      <NodeToolbar isVisible position={selected ? Position.Left : Position.Top}>
        <div className="flex gap-2">
          {(data.actions ?? []).map((a) => (
            <button
              key={a.id}
              onClick={a.onClick}
              className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-[11px] hover:bg-zinc-800"
            >
              {a.label}
            </button>
          ))}
          <button
            onClick={() => rf.deleteElements({ nodes: [{ id }] })}
            className="rounded-md border border-rose-700/50 bg-rose-900/30 px-2 py-1 text-[11px] text-rose-200 hover:bg-rose-900/60"
          >
            Delete
          </button>
        </div>
      </NodeToolbar>

      {/* Body */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="max-w-[70%]">
                  <div className="text-sm font-semibold tracking-wide">{data.title}</div>
                  <div className="text-[11px] opacity-70 -mt-0.5">{data.role}</div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs whitespace-pre-line text-[11px]">{tip}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Pill className={statusStyles[status]}>{status}</Pill>
        </div>

        <div className="mt-2 text-[12px] leading-5 text-zinc-200">
          <div className="opacity-90">{data.func}</div>
          {data.emits && (
            <div className="mt-1 text-[11px] opacity-70">
              Emits: <span className="font-mono">{data.emits}</span>
            </div>
          )}
        </div>

        {/* Footer meta line */}
        <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-400">
          <span className="font-mono">id: {id}</span>
          <span className="opacity-70">service-node</span>
        </div>
      </div>

      {/* Dynamic ports */}
      {(data.ports ?? []).map((p) => {
        const pos =
          p.side === "left"
            ? Position.Left
            : p.side === "right"
              ? Position.Right
              : p.side === "top"
                ? Position.Top
                : Position.Bottom
        return (
          <Handle
            key={p.id}
            id={p.id}
            type={p.side === "left" || p.side === "top" ? "target" : "source"}
            position={pos}
            className="!w-3 !h-3 !bg-zinc-300 border border-zinc-600"
          />
        )
      })}
    </div>
  )
}
