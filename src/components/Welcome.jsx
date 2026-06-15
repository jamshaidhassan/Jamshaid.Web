import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

export default function Welcome({ testimonials = [] }) {
  const containerRef = useRef(null)
  const stickyRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const testimonialsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a master scroll timeline for the 200vh section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: stickyRef.current,
          pinSpacing: false,
        }
      })

      // Phase 1: Welcome title scaling down and fading
      tl.fromTo(titleRef.current,
        { scale: 3.5, opacity: 0 },
        { scale: 1, opacity: 0.15, duration: 2, ease: 'power2.out' }
      )
      
      tl.fromTo(subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: 'power2.out' },
        '-=1'
      )

      // Phase 2: Fade out Welcome Screen and Fade in Testimonial Marquees
      tl.to([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: -100,
        duration: 1.5,
        ease: 'power2.inOut'
      })

      tl.fromTo(testimonialsRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Duplicate items for seamless infinite loop scroll
  const renderMarqueeRow = (items, directionClass) => {
    const doubled = [...items, ...items, ...items, ...items] // Multiplied to prevent empty spaces on large monitors
    return (
      <div className="flex w-full overflow-hidden py-4 relative select-none">
        {/* Soft Fade Edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        
        <div className={`flex gap-6 shrink-0 ${directionClass}`}>
          {doubled.map((item, idx) => (
            <div
              key={idx}
              className="w-[300px] sm:w-[380px] shrink-0 p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full bg-zinc-100 object-cover"
                />
                <div>
                  <h4 className="font-bold text-zinc-900 text-sm">{item.name}</h4>
                  <p className="text-zinc-500 text-xs font-semibold">{item.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5 text-brand-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-zinc-600 text-sm leading-relaxed italic">
                "{item.message}"
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative w-full h-[200vh]">
      {/* Styles for Marquees */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-l {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-r {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left-css {
          animation: marquee-l 25s linear infinite;
        }
        .animate-marquee-right-css {
          animation: marquee-r 25s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-marquee-left-css {
            animation-duration: 12s;
          }
          .animate-marquee-right-css {
            animation-duration: 12s;
          }
        }
      `}} />

      {/* Sticky Screen (100vh) */}
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-gradient-to-b from-white to-zinc-50 text-zinc-950 flex flex-col justify-center items-center z-20"
      >
        {/* Scoped noise texture — position:absolute, not fixed */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.015,
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* Phase 1 Layer */}
        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none px-6 text-center">
          <h1
            ref={titleRef}
            className="text-[20vw] font-black tracking-tighter uppercase text-zinc-950 leading-none select-none font-display"
            style={{ opacity: 0 }}
          >
            WELCOME
          </h1>
          <p
            ref={subtitleRef}
            className="text-zinc-600 text-xl sm:text-3xl font-extrabold tracking-wide uppercase select-none mt-4 font-display"
            style={{ opacity: 0 }}
          >
            To my creative space
          </p>
        </div>

        {/* Phase 2 Layer (Testimonials) */}
        <div
          ref={testimonialsRef}
          className="w-full flex flex-col items-center justify-center gap-6 opacity-0 select-none pointer-events-auto"
        >
          <div className="text-center px-4 mb-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold bg-zinc-100 px-3 py-1 rounded-full">
              Testimonials
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-zinc-900 tracking-tight mt-3">
              Client Love
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              What clients and partners are saying
            </p>
          </div>

          {/* Marquee Rows */}
          {testimonials.length > 0 && (
            <div className="w-full flex flex-col gap-2">
              {renderMarqueeRow(testimonials.slice(0, Math.ceil(testimonials.length / 2)), 'animate-marquee-left-css')}
              {renderMarqueeRow(testimonials.slice(Math.ceil(testimonials.length / 2)), 'animate-marquee-right-css')}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
