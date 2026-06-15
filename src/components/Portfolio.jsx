import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import portfolioImg from '../assets/Portfolio.png'

export default function Portfolio() {
  const containerRef = useRef(null)
  const [maskPos, setMaskPos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const coordsRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Use rAF to guarantee layout is painted before reading dimensions
    const raf = requestAnimationFrame(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const cx = rect.width / 2
        const cy = rect.height / 2
        coordsRef.current = { x: cx, y: cy }
        setMaskPos({ x: cx, y: cy })
      }
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  /* Smooth GSAP mouse tracking */
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setIsHovering(true)

    gsap.to(coordsRef.current, {
      x,
      y,
      duration: 0.45,
      ease: 'power2.out',
      overwrite: 'auto',
      onUpdate: () =>
        setMaskPos({ x: coordsRef.current.x, y: coordsRef.current.y }),
    })
  }

  const handleMouseLeave = () => setIsHovering(false)

  /* Rectangular reveal dimensions */
  const BOX = 280
  const halfBox = BOX / 2
  const bx = maskPos.x - halfBox
  const by = maskPos.y - halfBox

  /* Clip-path string — rectangle, not circle */
  const clipRect = `polygon(${bx}px ${by}px, ${bx + BOX}px ${by}px, ${bx + BOX}px ${by + BOX}px, ${bx}px ${by + BOX}px)`

  return (
    <section
      id="portfolio-hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center cursor-crosshair bg-[#f4c400]"
    >
      {/* ── Watermark text ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h2
          className="font-black uppercase tracking-tighter text-center leading-none"
          style={{ fontSize: '16vw', color: 'rgba(9,9,11,0.06)', fontFamily: 'Syne, sans-serif' }}
        >
          PORTFOLIO
        </h2>
      </div>

      {/* ── Layer 1: BLURRED base image ── anchored to bottom so face is visible ── */}
      <div className="absolute inset-0 flex items-end justify-center z-10 pointer-events-none px-8 pb-[3vh]">
        <img
          src={portfolioImg}
          alt="Portfolio blurred"
          style={{
            width: '100%',
            maxWidth: '720px',
            height: '82vh',
            display: 'block',
            objectFit: 'contain',
            objectPosition: 'bottom center',
            opacity: 1,
            userSelect: 'none',
            filter: 'blur(8px) brightness(0.88)',
          }}
        />
      </div>

      {/* ── Layer 2: SHARP reveal — clipped to rectangular box under cursor ── */}
      <div
        className="absolute inset-0 flex items-end justify-center z-20 pointer-events-none px-8 pb-[3vh]"
        style={{
          clipPath: clipRect,
          WebkitClipPath: clipRect,
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}
      >
        <img
          src={portfolioImg}
          alt="Portfolio sharp"
          style={{
            width: '100%',
            maxWidth: '720px',
            height: '82vh',
            display: 'block',
            objectFit: 'contain',
            objectPosition: 'bottom center',
            opacity: 1,
            userSelect: 'none',
            filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.20))',
          }}
        />
      </div>

      {/* ── Layer 3: Scanner frame ── */}
      <div
        className="absolute z-30 pointer-events-none"
        style={{
          width: `${BOX}px`,
          height: `${BOX}px`,
          left: `${bx}px`,
          top: `${by}px`,
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}
      >
        {/* Marching-ants border */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <rect
            x="2"
            y="2"
            width={BOX - 4}
            height={BOX - 4}
            fill="none"
            stroke="rgba(9,9,11,0.7)"
            strokeWidth="2"
            className="marching-ants-path"
          />
        </svg>

        {/* Corner handles */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t-[3px] border-l-[3px] border-zinc-950" />
        <div className="absolute top-0 right-0 w-5 h-5 border-t-[3px] border-r-[3px] border-zinc-950" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-[3px] border-l-[3px] border-zinc-950" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[3px] border-r-[3px] border-zinc-950" />

        {/* Crosshair lines */}
        <div className="absolute top-1/2 left-5 right-5 h-[1px] bg-zinc-950/15" />
        <div className="absolute left-1/2 top-5 bottom-5 w-[1px] bg-zinc-950/15" />
      </div>

      {/* ── Bottom hint ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-950/35">
          Hover to explore
        </p>
      </div>
    </section>
  )
}
