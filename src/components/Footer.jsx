import React from 'react'
import footerImg from '../assets/Footer.png'

export default function Footer() {
  const marqueeText = 'JAMSHAID HASSAN • CREATIVE DEVELOPER • DESIGNER • FREELANCER • ART DIRECTION • '

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative w-full bg-[#f4c400] text-zinc-950 overflow-hidden z-30">

      {/* ── Watermark marquee rows ── */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none select-none py-6 z-0">
        {[
          { dir: 'animate-marquee-left-css', op: 'opacity-[0.04]' },
          { dir: 'animate-marquee-right-css', op: 'opacity-[0.05]' },
          { dir: 'animate-marquee-left-css', op: 'opacity-[0.03]' },
          { dir: 'animate-marquee-right-css', op: 'opacity-[0.04]' },
        ].map((layer, i) => (
          <div key={i} className={`flex w-full overflow-hidden ${layer.op}`}>
            <div className={`flex whitespace-nowrap gap-4 text-[9vw] font-black uppercase tracking-tighter leading-none font-display ${layer.dir}`}>
              <span>{marqueeText}</span>
              <span>{marqueeText}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Floating Footer Image ── */}
      <div className="relative z-10 w-full flex justify-center items-end pt-10" style={{ minHeight: '280px' }}>
        {/* Shadow beneath */}
        <div style={{
          position: 'absolute', bottom: '-4px', left: '50%',
          transform: 'translateX(-50%)',
          width: '50%', height: '24px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.15) 0%, transparent 70%)',
          filter: 'blur(10px)',
          borderRadius: '50%',
        }} />
        <img
          src={footerImg}
          alt="Jamshaid Hassan"
          style={{
            height: '360px',
            width: 'auto',
            maxWidth: '100%',
            display: 'block',
            objectFit: 'contain',
            objectPosition: 'bottom center',
            opacity: 1,
            userSelect: 'none',
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.18))',
          }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-8 pt-4 pb-10 px-6">

        {/* Action buttons */}
        <div className="flex flex-wrap gap-4 justify-center items-center" data-aos="fade-up">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-[#2563eb] text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-blue-700 hover:shadow-[0_0_24px_rgba(37,99,235,0.55)] transition-all duration-400 hover:scale-105 cursor-pointer"
          >
            Follow
          </a>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-3 bg-zinc-950 text-white text-xs font-black uppercase tracking-widest rounded-full hover:shadow-xl hover:-translate-y-0.5 transition-all duration-400 hover:scale-105 cursor-pointer"
          >
            Message
          </button>
        </div>

        {/* Brand */}
        <div data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter">
            <span className="text-zinc-950">JAMSHAID</span>{' '}
            <span className="text-white drop-shadow-[0_0_6px_rgba(0,0,0,0.18)]">HASSAN</span>
          </h2>
          <p className="text-xs font-bold tracking-widest uppercase text-zinc-900/55 mt-2">
            Premium Interfaces • Modern Design Systems • Interactive Development
          </p>
        </div>

        {/* Nav links */}
        <div
          className="flex flex-wrap justify-center gap-6 sm:gap-10 text-xs font-black uppercase tracking-widest"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {['Home', 'About', 'Portfolio', 'Service', 'Contact'].map((item) => {
            const id = item === 'Home' ? 'portfolio-hero' : item.toLowerCase()
            return (
              <button
                key={item}
                onClick={() => scrollToSection(id)}
                className="hover:text-zinc-950/60 transition-colors duration-300 cursor-pointer"
              >
                {item}
              </button>
            )
          })}
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-zinc-950/10 rounded-full" />

        {/* Copyright */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-900/50">
          <p>© {new Date().getFullYear()} Jamshaid Hassan. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-950 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-950 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
