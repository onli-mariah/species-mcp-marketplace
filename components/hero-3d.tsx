"use client"

import React, { useRef, useLayoutEffect, useEffect } from "react"
import gsap from "gsap"
import * as THREE from "three"
import { motion } from "framer-motion"

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  
  // Store refs for cleanup and animation
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const segmentsRef = useRef<THREE.Group[]>([])
  const progressRef = useRef(0) // Internal progress instead of scroll

  // --- CONFIGURATION ---
  const TUNNEL_WIDTH = 24
  const TUNNEL_HEIGHT = 16
  const SEGMENT_DEPTH = 6 
  const NUM_SEGMENTS = 14 
  const FOG_DENSITY = 0.02
  const FLOOR_COLS = 6 
  const WALL_ROWS = 4  
  const COL_WIDTH = TUNNEL_WIDTH / FLOOR_COLS
  const ROW_HEIGHT = TUNNEL_HEIGHT / WALL_ROWS

  // User's custom provided images
  const imageUrls = [
    "/hero/1.jpg", 
    "/hero/2.jpg", 
    "/hero/3.jpg", 
    "/hero/4.jpg", 
    "/hero/5.png",
    "/hero/6.png",
    "/hero/7.png",
    "/hero/8.png",
    "/hero/9.jpg",
    "/hero/10.jpg",
    "/hero/11.jpg",
    "/hero/12.jpg",
    "/hero/13.jpg",
    "/onliyou-lifestyle.jpg" // Also including the previous lifestyle image for a tiny bit more variety
  ]

  const createSegment = (zPos: number) => {
    const group = new THREE.Group()
    group.position.z = zPos

    const w = TUNNEL_WIDTH / 2
    const h = TUNNEL_HEIGHT / 2
    const d = SEGMENT_DEPTH

    // Line styles for brutalist minimalist design
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.08 })
    const lineGeo = new THREE.BufferGeometry()
    const vertices: number[] = []

    for (let i = 0; i <= FLOOR_COLS; i++) {
      const x = -w + (i * COL_WIDTH)
      vertices.push(x, -h, 0, x, -h, -d)
      vertices.push(x, h, 0, x, h, -d)
    }
    for (let i = 1; i < WALL_ROWS; i++) {
      const y = -h + (i * ROW_HEIGHT)
      vertices.push(-w, y, 0, -w, y, -d)
      vertices.push(w, y, 0, w, y, -d)
    }

    vertices.push(-w, -h, 0, w, -h, 0)
    vertices.push(-w, h, 0, w, h, 0)
    vertices.push(-w, -h, 0, -w, h, 0)
    vertices.push(w, -h, 0, w, h, 0)

    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    const lines = new THREE.LineSegments(lineGeo, lineMaterial)
    group.add(lines)

    populateImages(group, w, h, d)

    return group
  }

  const populateImages = (group: THREE.Group, w: number, h: number, d: number) => {
    const textureLoader = new THREE.TextureLoader()
    const cellMargin = 0.4

    const addImg = (pos: THREE.Vector3, rot: THREE.Euler, wd: number, ht: number) => {
        const url = imageUrls[Math.floor(Math.random() * imageUrls.length)]
        const geom = new THREE.PlaneGeometry(wd - cellMargin, ht - cellMargin)
        const mat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, side: THREE.DoubleSide })
        textureLoader.load(url, (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace
          tex.minFilter = THREE.LinearFilter
          mat.map = tex
          mat.needsUpdate = true
          gsap.to(mat, { opacity: 0.9, duration: 1 })
        })
        const m = new THREE.Mesh(geom, mat)
        m.position.copy(pos)
        m.rotation.copy(rot)
        m.name = "slab_image"
        
        // Add thin brutalist border around the picture
        const edges = new THREE.EdgesGeometry(geom)
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.2, transparent: true }))
        m.add(line)

        group.add(m)
    }

    let lastFloorIdx = -999
    for (let i = 0; i < FLOOR_COLS; i++) {
        if (i > lastFloorIdx + 1 && Math.random() > 0.8) {
            addImg(new THREE.Vector3(-w + i*COL_WIDTH + COL_WIDTH/2, -h, -d/2), new THREE.Euler(-Math.PI/2,0,0), COL_WIDTH, d)
            lastFloorIdx = i
        }
    }
    
    let lastCeilIdx = -999
    for (let i = 0; i < FLOOR_COLS; i++) {
        if (i > lastCeilIdx + 1 && Math.random() > 0.88) {
            addImg(new THREE.Vector3(-w + i*COL_WIDTH + COL_WIDTH/2, h, -d/2), new THREE.Euler(Math.PI/2,0,0), COL_WIDTH, d)
            lastCeilIdx = i
        }
    }
    
    let lastLeftIdx = -999
    for (let i = 0; i < WALL_ROWS; i++) {
        if (i > lastLeftIdx + 1 && Math.random() > 0.8) {
            addImg(new THREE.Vector3(-w, -h + i*ROW_HEIGHT + ROW_HEIGHT/2, -d/2), new THREE.Euler(0,Math.PI/2,0), d, ROW_HEIGHT)
            lastLeftIdx = i
        }
    }
    
    let lastRightIdx = -999
    for (let i = 0; i < WALL_ROWS; i++) {
        if (i > lastRightIdx + 1 && Math.random() > 0.8) {
            addImg(new THREE.Vector3(w, -h + i*ROW_HEIGHT + ROW_HEIGHT/2, -d/2), new THREE.Euler(0,-Math.PI/2,0), d, ROW_HEIGHT)
            lastRightIdx = i
        }
    }
  }

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    gsap.config({ autoSleep: 60, force3D: true })

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xfafafa) // Match --background
    scene.fog = new THREE.FogExp2(0xfafafa, FOG_DENSITY)
    sceneRef.current = scene

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000)
    camera.position.set(0, 0, 0) 
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer

    const segments: THREE.Group[] = []
    for (let i = 0; i < NUM_SEGMENTS; i++) {
      const z = -i * SEGMENT_DEPTH
      const segment = createSegment(z)
      scene.add(segment)
      segments.push(segment)
    }
    segmentsRef.current = segments

    let frameId: number
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      if (!cameraRef.current || !sceneRef.current || !rendererRef.current) return

      progressRef.current += 1.5 // Flythrough speed
      cameraRef.current.position.z -= 0.05 // Match flight to progress

      const tunnelLength = NUM_SEGMENTS * SEGMENT_DEPTH
      const camZ = cameraRef.current.position.z
      
      segmentsRef.current.forEach((segment) => { // Infinite Loop
        if (segment.position.z > camZ + SEGMENT_DEPTH) {
            let minZ = 0
            segmentsRef.current.forEach(s => minZ = Math.min(minZ, s.position.z))
            segment.position.z = minZ - SEGMENT_DEPTH
            
            const toRemove: THREE.Object3D[] = []
            segment.traverse((c) => { if (c.name === 'slab_image' || c.type === 'LineSegments') toRemove.push(c) })
            toRemove.forEach(c => {
                // Keep the grid lines, just remove images
                if (c.name === 'slab_image') {
                  segment.remove(c)
                  if (c instanceof THREE.Mesh) {
                      c.geometry.dispose() 
                      if (c.material.map) c.material.map.dispose()
                      c.material.dispose()
                  }
                }
            })
            const w = TUNNEL_WIDTH / 2; const h = TUNNEL_HEIGHT / 2; const d = SEGMENT_DEPTH
            populateImages(segment, w, h, d)
        }
      })

      rendererRef.current.render(sceneRef.current, cameraRef.current)
    }
    animate()

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      cameraRef.current.aspect = w / h
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frameId)
      renderer.dispose()
    }
  }, []) 

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.5 }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full h-[calc(100vh-80px)] xl:h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden border-b-2 border-border bg-background">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full block mix-blend-multiply" />
      </div>

      <div ref={contentRef} className="max-w-[1400px] mx-auto space-y-8 z-10 relative pointer-events-auto">
        <motion.div 
          className="inline-block px-4 py-1 border-2 border-foreground text-xs font-sans uppercase tracking-widest font-bold text-foreground bg-background mb-4"
        >
          For Developers
        </motion.div>
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-thin leading-[0.85] tracking-tighter text-foreground uppercase">
          <div className="font-normal" style={{ 
            textShadow: '0 4px 24px rgba(255,255,255,0.8), 0 0 10px rgba(255,255,255,0.5)',
            WebkitTextStroke: '1px rgba(255,255,255,0.2)'
           }}>
            Build <span className="font-semibold">anything.</span>
          </div>
          <div style={{ textShadow: '0 4px 12px rgba(255,255,255,0.9)' }} className="text-foreground/90 font-light text-3xl md:text-5xl lg:text-[4.5rem] mt-6 tracking-normal">
            Species shows you how.
          </div>
        </h1>
      </div>
    </section>
  )
}
