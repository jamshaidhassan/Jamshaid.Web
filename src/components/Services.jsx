import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Layers, LayoutGrid, Palette, ShoppingCart, Smartphone, Globe } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const containerRef = useRef(null)
  const stickyRef = useRef(null)
  const mobileScrollRef = useRef(null)

  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeCardIndex, setActiveCardIndex] = useState(0)

  const servicesData = [
    {
      title: 'Business Website',
      tag: 'Corporate',
      accentColor: '#648c11',
      description: 'Corporate websites optimized for conversion, lead generation, and premium branding.',
      icon: <Globe className="w-12 h-12 text-white" />,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Admin Dashboard',
      tag: 'SaaS',
      accentColor: '#ff4500',
      description: 'Advanced custom dashboards with real-time analytics, charts, and data visualization.',
      icon: <LayoutGrid className="w-12 h-12 text-white" />,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'E-Commerce Store',
      tag: 'Retail',
      accentColor: '#1d4ed8',
      description: 'Luxury online shopping experiences with custom checkouts, payment gateways, and inventories.',
      icon: <ShoppingCart className="w-12 h-12 text-white" />,
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d296e?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Full Stack Web App',
      tag: 'App',
      accentColor: '#dc2626',
      description: 'Highly scalable web applications backed by secure databases and custom APIs.',
      icon: <Smartphone className="w-12 h-12 text-white" />,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Portfolio Website',
      tag: 'Creative',
      accentColor: '#09090b',
      description: 'High-end immersive portfolio experiences for creators, artists, and digital agencies.',
      icon: <Palette className="w-12 h-12 text-white" />,
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Website Redesign',
      tag: 'Design',
      accentColor: '#4b5563',
      description: 'Modern revamps with immersive animations, updated user experience, and optimized SEO.',
      icon: <Layers className="w-12 h-12 text-white" />,
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80'
    }
  ]

  // Desktop ScrollTrigger Setup
  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: stickyRef.current,
        pinSpacing: false,
        onUpdate: (self) => {
          setScrollProgress(self.progress)
        }
      })
    })

    return () => mm.revert()
  }, [])

  // Desktop active card index calculation
  useEffect(() => {
    const index = Math.round(scrollProgress * (servicesData.length - 1))
    if (index >= 0 && index < servicesData.length) {
      setActiveCardIndex(index)
    }
  }, [scrollProgress])

  // Mobile scroll trigger
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return
    const container = mobileScrollRef.current
    const scrollLeft = container.scrollLeft
    const width = container.clientWidth
    const index = Math.round(scrollLeft / (width * 0.82))
    if (index >= 0 && index < servicesData.length) {
      setActiveCardIndex(index)
    }
  }

  // Desktop 3D card positions based on scroll progress
  const calculateCardStyle = (index) => {
    const totalCards = servicesData.length
    const spacingAngle = 0.35
    const centerOffset = scrollProgress * (totalCards - 1)
    const cardOffset = index - centerOffset
    const angle = cardOffset * spacingAngle
    const radius = 700

    const x = Math.sin(angle) * radius
    const y = radius - Math.cos(angle) * radius
    const z = -Math.abs(cardOffset) * 60
    const rotationZ = angle * (180 / Math.PI)
    const scale = 1 - Math.abs(cardOffset) * 0.15
    const opacity = Math.max(0, 1 - Math.abs(cardOffset) * 0.32)

    return {
      transform: `translate3d(${x}px, ${y}px, ${z}px) rotateZ(${rotationZ}deg) scale(${scale})`,
      opacity,
      zIndex: 100 - Math.round(Math.abs(cardOffset) * 10),
      pointerEvents: Math.abs(cardOffset) < 0.6 ? 'auto' : 'none'
    }
  }

  return (
    <div
      id="service"
      ref={containerRef}
      className="relative w-full h-[350vh] lg:h-[450vh] overflow-hidden bg-white"
    >
      {/* Sticky Screen — bg-white so it covers content beneath when pinned */}
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen bg-white overflow-hidden flex flex-col justify-center items-center z-10"
      >
        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <h2 className="text-[20vw] font-black tracking-tight uppercase font-display select-none"
            style={{ color: 'rgba(9,9,11,0.04)' }}>
            SERVICES
          </h2>
        </div>

        {/* Section Header */}
        <div className="absolute top-24 z-20 text-center px-6">
          <span
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '99px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#09090b',
              background: 'rgba(9,9,11,0.06)',
              border: '1px solid rgba(9,9,11,0.10)',
            }}
          >
            Specialized Skills
          </span>
          <h3 className="text-3xl sm:text-5xl font-black text-zinc-950 tracking-tighter mt-3 font-display">
            Premium Web Services
          </h3>
        </div>

        {/* DESKTOP: 3D Curve Carousel — inline perspective + preserve-3d to ensure browser renders 3D */}
        <div
          className="hidden lg:flex relative w-full h-[600px] justify-center items-center z-10 mt-20"
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          {servicesData.map((service, index) => {
            const isCenter = index === activeCardIndex
            return (
              <div
                key={index}
                style={{
                  ...calculateCardStyle(index),
                  backgroundImage: `linear-gradient(to bottom, rgba(9,9,11,0.30) 0%, rgba(9,9,11,0.88) 100%), url(${service.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'absolute',
                  width: '400px',
                  height: '520px',
                  borderRadius: '30px',
                  border: isCenter
                    ? `1.5px solid ${service.accentColor}50`
                    : '1px solid rgba(255,255,255,0.12)',
                  boxShadow: isCenter
                    ? `0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px ${service.accentColor}20`
                    : '0 8px 30px rgba(0,0,0,0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '40px',
                  overflow: 'hidden',
                  transition: 'border 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                {/* Top accent bar on active card */}
                {isCenter && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                    background: `linear-gradient(90deg, transparent, ${service.accentColor}, transparent)`,
                  }} />
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{
                    padding: '12px', borderRadius: '16px',
                    background: 'rgba(255,255,255,0.10)',
                    backdropFilter: 'blur(8px)',
                  }}>
                    {service.icon}
                  </div>
                  <span style={{
                    fontSize: '10px', fontWeight: 700,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.6)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    padding: '3px 10px', borderRadius: '99px',
                  }}>
                    {service.tag}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <h4 style={{ margin: 0, fontSize: '28px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                    {service.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
                    {service.description}
                  </p>
                  <button
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      color: '#f4c400', fontWeight: 700, fontSize: '13px',
                      background: 'none', border: 'none', cursor: 'pointer',
                      padding: 0, width: 'fit-content',
                      transition: 'transform 0.25s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                  >
                    Book Service <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* MOBILE: Snap Horizontal Slider */}
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="lg:hidden w-full px-6 flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pointer-events-auto mt-28 z-10 pb-10"
        >
          {servicesData.map((service, index) => {
            const isActive = index === activeCardIndex
            return (
              <div
                key={index}
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(9,9,11,0.30) 0%, rgba(9,9,11,0.88) 100%), url(${service.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  flexShrink: 0,
                  width: '82vw',
                  maxWidth: '320px',
                  height: '440px',
                  borderRadius: '28px',
                  border: isActive ? `1.5px solid ${service.accentColor}50` : '1px solid rgba(255,255,255,0.10)',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                  scrollSnapAlign: 'center',
                  transform: isActive ? 'scale(1)' : 'scale(0.92)',
                  opacity: isActive ? 1 : 0.65,
                  transition: 'all 0.35s ease',
                  boxShadow: isActive ? '0 16px 48px rgba(0,0,0,0.30)' : '0 4px 16px rgba(0,0,0,0.15)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.12)' }}>
                    {service.icon}
                  </div>
                  <span style={{
                    fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    padding: '2px 8px', borderRadius: '99px',
                  }}>
                    {service.tag}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h4 style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>
                    {service.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.60)', lineHeight: 1.65 }}>
                    {service.description}
                  </p>
                  <button style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    color: '#f4c400', fontWeight: 700, fontSize: '12px',
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  }}>
                    Book Service <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Progress indicator dots */}
        <div className="absolute bottom-10 z-20 flex gap-2">
          {servicesData.map((_, index) => (
            <div
              key={index}
              style={{
                height: '6px',
                width: index === activeCardIndex ? '28px' : '6px',
                borderRadius: '99px',
                background: index === activeCardIndex ? '#09090b' : 'rgba(9,9,11,0.18)',
                transition: 'all 0.4s ease',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
