import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PhoneCall } from 'lucide-react'
import heroImg from '../assets/hero.png'

gsap.registerPlugin(ScrollTrigger)

/* ── Inline SVG icons ─────────────────────────────────────── */
const Instagram = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)
const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)
const Github = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

/* ── Role cards ───────────────────────────────────────────── */
const roles = [
  {
    title: 'UI / UX Designer',
    subtitle: 'Crafting Experiences',
    icon: '✦',
    accent: '#f4c400',
    tag: 'Design',
    skills: ['Figma', 'Prototyping', 'User Research'],
  },
  {
    title: 'Front-End Dev',
    subtitle: 'Building Interfaces',
    icon: '⬡',
    accent: '#09090b',
    tag: 'Code',
    skills: ['React', 'GSAP', 'TailwindCSS'],
  },
  {
    title: 'Full-Stack Dev',
    subtitle: 'End-to-End Solutions',
    icon: '◈',
    accent: '#f4c400',
    tag: 'Stack',
    skills: ['Node.js', 'MongoDB', 'REST APIs'],
  },
]

function RoleCards() {
  const [active, setActive] = useState(1)
  const autoRef = useRef(null)

  const advance = () => setActive((p) => (p + 1) % roles.length)

  useEffect(() => {
    autoRef.current = setInterval(advance, 3400)
    return () => clearInterval(autoRef.current)
  }, [])

  const handleClick = (i) => {
    clearInterval(autoRef.current)
    setActive(i)
    autoRef.current = setInterval(advance, 3400)
  }

  const getStyle = (i) => {
    const total = roles.length
    let offset = i - active
    if (offset > Math.floor(total / 2)) offset -= total
    if (offset < -Math.floor(total / 2)) offset += total
    const isCenter = offset === 0
    const absOff = Math.abs(offset)
    return {
      transform: `translateX(${offset * 230}px) translateZ(${isCenter ? 0 : -120}px) rotateY(${offset * -16}deg) scale(${isCenter ? 1 : 0.8})`,
      opacity: absOff > 1 ? 0 : isCenter ? 1 : 0.45,
      zIndex: isCenter ? 10 : 5 - absOff,
      cursor: isCenter ? 'default' : 'pointer',
      transition: 'all 0.6s cubic-bezier(0.34,1.4,0.64,1)',
      filter: isCenter ? 'none' : 'grayscale(0.3)',
    }
  }

  return (
    <div style={{ perspective: '1000px', height: '300px' }} className="relative w-full flex justify-center items-center">
      <div className="relative flex justify-center items-center w-full" style={{ transformStyle: 'preserve-3d' }}>
        {roles.map((role, i) => {
          const isCenter = i === active
          const accent = role.accent
          return (
            <div
              key={role.title}
              onClick={() => !isCenter && handleClick(i)}
              style={{ ...getStyle(i), position: 'absolute', width: '250px' }}
            >
              <div
                style={{
                  background: '#fff',
                  border: `1.5px solid ${isCenter ? accent + '60' : 'rgba(0,0,0,0.07)'}`,
                  boxShadow: isCenter
                    ? `0 12px 48px rgba(0,0,0,0.10), 0 2px 12px ${accent}22`
                    : '0 4px 16px rgba(0,0,0,0.06)',
                  borderRadius: '20px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  position: 'relative',
                  overflow: 'hidden',
                  background: '#ffffff',
                }}
              >
                {/* Accent top border */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                  background: isCenter ? accent : 'transparent',
                  borderRadius: '20px 20px 0 0',
                  transition: 'background 0.4s ease',
                }} />

                {/* Tag */}
                <span style={{
                  display: 'inline-block', width: 'fit-content',
                  padding: '3px 10px', borderRadius: '99px',
                  fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: accent === '#f4c400' ? '#92700a' : '#fff',
                  background: accent === '#f4c400' ? '#f4c40018' : '#09090b',
                  border: `1px solid ${accent === '#f4c400' ? '#f4c40035' : '#09090b'}`,
                }}>
                  {role.tag}
                </span>

                {/* Icon */}
                <div style={{ fontSize: '32px', color: accent === '#f4c400' ? '#d4a900' : '#09090b', lineHeight: 1 }}>
                  {role.icon}
                </div>

                {/* Title */}
                <div>
                  <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#09090b', lineHeight: 1.2 }}>
                    {role.title}
                  </h3>
                  <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'rgba(9,9,11,0.45)', fontWeight: 500 }}>
                    {role.subtitle}
                  </p>
                </div>

                {/* Skills */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {role.skills.map((s) => (
                    <span key={s} style={{
                      padding: '2px 8px', borderRadius: '6px',
                      background: 'rgba(9,9,11,0.05)',
                      border: '1px solid rgba(9,9,11,0.08)',
                      fontSize: '10px', color: 'rgba(9,9,11,0.6)', fontWeight: 600,
                    }}>
                      {s}
                    </span>
                  ))}
                </div>

                {/* Active bottom bar */}
                {isCenter && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                  }} />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Dot nav */}
      <div style={{
        position: 'absolute', bottom: '-4px', left: '50%',
        transform: 'translateX(-50%)', display: 'flex', gap: '6px',
      }}>
        {roles.map((_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            style={{
              width: i === active ? '24px' : '7px',
              height: '7px', borderRadius: '99px',
              background: i === active ? '#09090b' : 'rgba(9,9,11,0.2)',
              border: 'none', cursor: 'pointer',
              transition: 'all 0.35s ease', padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Main Hero ────────────────────────────────────────────── */
const socials = [
  { name: 'WhatsApp', icon: <PhoneCall size={16} />, url: 'https://wa.me/923022432685', color: '#10b981' },
  { name: 'Instagram', icon: <Instagram />, url: 'https://www.instagram.com/scaleadsagency_?igsh=bnU5aXF0ejRyNGFi', color: '#ec4899' },
  { name: 'LinkedIn', icon: <Linkedin />, url: 'https://linkedin.com', color: '#2563eb' },
  { name: 'GitHub', icon: <Github />, url: 'https://github.com', color: '#09090b' },
]

export default function Hero() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      // Set initial hidden state, then animate in
      gsap.set([leftRef.current, rightRef.current], { visibility: 'visible' })
      gsap.set(leftRef.current, { opacity: 0, y: 40 })
      gsap.set(rightRef.current, { opacity: 0, x: 40 })

      tl.to(leftRef.current, { opacity: 1, y: 0, duration: 0.9 })
        .to(rightRef.current, { opacity: 1, x: 0, duration: 0.9 }, '-=0.6')

      // Floating image idle animation
      gsap.to(imgRef.current, {
        y: -14,
        repeat: -1,
        yoyo: true,
        duration: 3.2,
        ease: 'sine.inOut',
        delay: 1,
      })

      // Scroll parallax — immediateRender:false prevents overriding entrance animation
      gsap.to(leftRef.current, {
        y: -50,
        opacity: 0.6,
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.4,
        },
      })
      gsap.to(imgRef.current, {
        y: 40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.4,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-white text-zinc-950 overflow-hidden flex items-center"
    >
      {/* Subtle grid pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.03) 1px,transparent 1px)',
        backgroundSize: '64px 64px',
      }} />

      {/* Faint yellow radial accent */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-80px', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(244,196,0,0.10) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* ── Grid ── */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-20 py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

        {/* LEFT — starts hidden; GSAP makes it visible */}
        <div ref={leftRef} style={{ visibility: 'hidden' }} className="flex flex-col gap-7">

          {/* Available badge */}
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            width: 'fit-content', padding: '5px 14px', borderRadius: '99px',
            background: 'rgba(244,196,0,0.10)', border: '1.5px solid rgba(244,196,0,0.3)',
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#92700a',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#f4c400', display: 'inline-block',
              animation: 'heroPulse 2s infinite',
            }} />
            Available for Work
          </span>

          {/* Name */}
          <div>
            <p style={{ margin: '0 0 6px', fontSize: '14px', fontWeight: 600, color: 'rgba(9,9,11,0.4)', letterSpacing: '0.04em' }}>
              Hello, I'm
            </p>
            <h1 style={{
              margin: 0,
              fontSize: 'clamp(42px, 5.5vw, 76px)',
              fontWeight: 900, lineHeight: 1,
              color: '#09090b', letterSpacing: '-0.03em',
            }}>
              Jamshaid
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #d4a900 0%, #f4c400 60%, #e8a500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Hassan
              </span>
            </h1>
          </div>

          {/* Description */}
          <p style={{
            margin: 0, fontSize: '15px', lineHeight: 1.75,
            color: 'rgba(9,9,11,0.5)', maxWidth: '430px', fontWeight: 400,
          }}>
            Passionate web developer crafting modern, interactive, and premium digital experiences with creative UI animations and thoughtful design aesthetics.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="#contact"
              style={{
                padding: '12px 26px', borderRadius: '10px',
                background: '#09090b', color: '#fff',
                fontWeight: 800, fontSize: '13px', letterSpacing: '0.03em',
                textDecoration: 'none', transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 4px 20px rgba(9,9,11,0.2)', display: 'inline-block',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(9,9,11,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(9,9,11,0.2)' }}
            >
              Hire Me
            </a>
            <a
              href="#portfolio"
              style={{
                padding: '12px 26px', borderRadius: '10px',
                background: '#fff', color: '#09090b',
                border: '1.5px solid rgba(9,9,11,0.12)',
                fontWeight: 700, fontSize: '13px',
                textDecoration: 'none', transition: 'border-color 0.2s ease, transform 0.2s ease',
                display: 'inline-block',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#09090b'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(9,9,11,0.12)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              View Work
            </a>
          </div>

          {/* Socials */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: 'rgba(9,9,11,0.3)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Connect
            </span>
            <div style={{ width: '24px', height: '1px', background: 'rgba(9,9,11,0.12)' }} />
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                style={{
                  width: '36px', height: '36px', borderRadius: '9px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: '#f7f7f7', border: '1px solid rgba(9,9,11,0.08)',
                  color: 'rgba(9,9,11,0.55)', textDecoration: 'none',
                  transition: 'all 0.22s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = s.color + '15'
                  e.currentTarget.style.borderColor = s.color + '50'
                  e.currentTarget.style.color = s.color
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = `0 6px 16px ${s.color}20`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#f7f7f7'
                  e.currentTarget.style.borderColor = 'rgba(9,9,11,0.08)'
                  e.currentTarget.style.color = 'rgba(9,9,11,0.55)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '28px', paddingTop: '20px', borderTop: '1px solid rgba(9,9,11,0.07)' }}>
            {[
              { label: 'Projects', value: '50+' },
              { label: 'Years Exp', value: '3+' },
              { label: 'Clients', value: '30+' },
            ].map((stat) => (
              <div key={stat.label}>
                <p style={{ margin: 0, fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 900, color: '#09090b', lineHeight: 1, letterSpacing: '-0.02em' }}>
                  {stat.value}
                </p>
                <p style={{ margin: '3px 0 0', fontSize: '10px', color: 'rgba(9,9,11,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — starts hidden; GSAP makes it visible */}
        <div ref={rightRef} style={{ visibility: 'hidden' }} className="flex flex-col items-center gap-10 lg:pl-8">

          {/* Transparent hero image — full opacity, floating */}
          <div ref={imgRef} style={{ position: 'relative', width: '100%', maxWidth: '460px' }}>
            {/* Subtle ground shadow */}
            <div style={{
              position: 'absolute', bottom: '-12px', left: '50%',
              transform: 'translateX(-50%)',
              width: '65%', height: '24px',
              background: 'radial-gradient(ellipse, rgba(0,0,0,0.12) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(8px)',
            }} />
            <img
              src={heroImg}
              alt="Jamshaid Hassan"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'contain',
                objectPosition: 'top center',
                opacity: 1,
                userSelect: 'none',
                pointerEvents: 'none',
                filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.12))',
              }}
            />
          </div>

          {/* Role Cards */}
          <div className="w-full">
            <p style={{
              textAlign: 'center', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(9,9,11,0.25)', marginBottom: '24px',
            }}>
              What I Do
            </p>
            <RoleCards />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '28px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
      }}>
        <div style={{
          width: '20px', height: '32px', borderRadius: '10px',
          border: '1.5px solid rgba(9,9,11,0.15)',
          display: 'flex', justifyContent: 'center', paddingTop: '5px',
        }}>
          <div style={{
            width: '3px', height: '7px', borderRadius: '2px',
            background: '#f4c400', animation: 'heroScrollDot 1.6s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes heroPulse {
          0%,100% { opacity:1; }
          50% { opacity:0.35; }
        }
        @keyframes heroScrollDot {
          0% { opacity:1; transform:translateY(0); }
          100% { opacity:0; transform:translateY(12px); }
        }
      `}</style>
    </section>
  )
}
