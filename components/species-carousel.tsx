"use client"
import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useMotionTemplate, animate } from "framer-motion"

export const items = [
  {
    id: 1,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/A_trading_interface_screen_with_two_options_BUY-1762471274547-Fb3grgUKkr9mQUriqvAZHtnJdXTcbQ.png",
    title: "Make a Trade",
  },
  {
    id: 2,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/A_trading_interface_screen_with_the_header_text_s-1762472285021-EZvGjsrrYmu3sCFUuhAyLFxl3KRMJj.png",
    title: "Assurance Dashboard",
  },
  {
    id: 3,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/A_trading_interface_screen_with_the_header_text_ch-1762472529546-LZMWfJBIGqpzpVpeXYTDtc95KJQIkZ.png",
    title: "Full Trading Interface",
  },
  {
    id: 4,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-768e485bb779c0b7338a8214e61fad30-2clvS8eMbOk2ipld2botp0xra5m5eN.webp",
    title: "Trading Interface Perspective",
  },
]

const FULL_ASPECT_RATIO = 16 / 9
const COLLAPSED_ASPECT_RATIO = 1 / 3
const MARGIN = 2
const GAP = 2

function SpeciesCarousel() {
  const [index, setIndex] = useState<number>(0)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const x = useMotionValue(0)

  useEffect(() => {
    if (!isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1
      const targetX = -index * containerWidth

      animate(x, targetX, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      })
    }
  }, [index, x, isDragging])

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
        {/* Main Carousel */}
        <div className="relative overflow-hidden rounded-lg border border-white/10" ref={containerRef}>
          <motion.div
            className="flex"
            drag="x"
            dragElastic={0.2}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(e, info) => {
              setIsDragging(false)
              const containerWidth = containerRef.current?.offsetWidth || 1
              const offset = info.offset.x
              const velocity = info.velocity.x

              let newIndex = index

              if (Math.abs(velocity) > 500) {
                newIndex = velocity > 0 ? index - 1 : index + 1
              } else if (Math.abs(offset) > containerWidth * 0.3) {
                newIndex = offset > 0 ? index - 1 : index + 1
              }

              newIndex = Math.max(0, Math.min(items.length - 1, newIndex))
              setIndex(newIndex)
            }}
            style={{ x }}
          >
            {items.map((item) => (
              <div key={item.id} className="shrink-0 w-full h-[500px] lg:h-[600px]">
                <img
                  src={item.url || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-contain select-none pointer-events-none bg-black"
                  draggable={false}
                />
              </div>
            ))}
          </motion.div>

          {/* Navigation Buttons - Updated styling to match Species aesthetic */}
          <motion.button
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all z-10 border
              ${
                index === 0
                  ? "opacity-40 cursor-not-allowed border-white/20"
                  : "bg-black border-white/40 hover:scale-110 hover:border-white hover:bg-white/10 opacity-70 hover:opacity-100"
              }`}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            disabled={index === items.length - 1}
            onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all z-10 border
              ${
                index === items.length - 1
                  ? "opacity-40 cursor-not-allowed border-white/20"
                  : "bg-black border-white/40 hover:scale-110 hover:border-white hover:bg-white/10 opacity-70 hover:opacity-100"
              }`}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        <Thumbnails index={index} setIndex={setIndex} />
      </div>
    </div>
  )
}

function Thumbnails({ index, setIndex }: { index: number; setIndex: any }) {
  const x = index * 100 * (COLLAPSED_ASPECT_RATIO / FULL_ASPECT_RATIO) + MARGIN + index * GAP
  const xSpring = useSpring(x, { bounce: 0 })
  const xPercentage = useMotionTemplate`-${xSpring}%`

  useEffect(() => {
    xSpring.set(x)
  }, [x, xSpring])

  return (
    <div className="flex h-20 justify-center overflow-hidden">
      <motion.div
        style={{
          aspectRatio: FULL_ASPECT_RATIO,
          gap: `${GAP}%`,
          x: xPercentage,
        }}
        className="flex min-w-0"
      >
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            onClick={() => setIndex(i)}
            initial={false}
            animate={i === index ? "active" : "inactive"}
            variants={{
              active: {
                aspectRatio: FULL_ASPECT_RATIO,
                marginLeft: `${MARGIN}%`,
                marginRight: `${MARGIN}%`,
              },
              inactive: {
                aspectRatio: COLLAPSED_ASPECT_RATIO,
                marginLeft: 0,
                marginRight: 0,
              },
            }}
            className="h-full shrink-0 border border-white/20 hover:border-white/40 transition-colors overflow-hidden"
          >
            <img
              src={item.url || "/placeholder.svg"}
              alt={item.title}
              className="h-full w-full object-cover pointer-events-none select-none"
            />
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}

export default SpeciesCarousel
