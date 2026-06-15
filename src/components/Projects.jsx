import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Folder } from 'lucide-react'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const containerRef = useRef(null)
  const stickyRef = useRef(null)
  const folderFrontRef = useRef(null)
  const cardsRef = useRef([])

  const projectList = [
    { id: 1, title: 'Quantum SaaS', category: 'Finance Platform', color: 'bg-emerald-600/90', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80', link: '#' },
    { id: 2, title: 'Aetheria Retail', category: 'Luxury E-Commerce', color: 'bg-blue-600/90', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80', link: '#' },
    { id: 3, title: 'Lumina Analytics', category: 'Data Visualization', color: 'bg-purple-600/90', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80', link: '#' },
    { id: 4, title: 'Nebula Gaming', category: 'WebGL Studio', color: 'bg-rose-600/90', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80', link: '#' },
    { id: 5, title: 'Vesper Brand', category: 'Agency Branding', color: 'bg-orange-600/90', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', link: '#' },
    { id: 6, title: 'Nova AI Integration', category: 'AI Automation', color: 'bg-zinc-800/90', image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80', link: '#' },
  ]

  useEffect(() => {
    // Media Query for Desktop (screen width >= 1024px)
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      // 3D Folder Explosion Timeline
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

      // 1. Rotate folder front flap down (hinged at bottom)
      tl.to(folderFrontRef.current, {
        rotationX: -120,
        duration: 1.5,
        ease: 'power1.inOut'
      })

      // 2. Explode cards out from the folder
      // Target grid offsets
      const positions = [
        { x: -380, y: -240, rotate: -8, scale: 1 },  // Top Left
        { x: 0, y: -280, rotate: 2, scale: 1 },      // Top Center
        { x: 380, y: -240, rotate: 8, scale: 1 },   // Top Right
        { x: -390, y: 140, rotate: -4, scale: 1 },   // Bottom Left
        { x: 0, y: 180, rotate: 0, scale: 1 },       // Bottom Center
        { x: 390, y: 140, rotate: 4, scale: 1 }      // Bottom Right
      ]

      cardsRef.current.forEach((card, index) => {
        if (card) {
          tl.to(card, {
            x: positions[index].x,
            y: positions[index].y,
            rotation: positions[index].rotate,
            scale: 1,
            opacity: 1,
            zIndex: 30,
            duration: 2.5,
            ease: 'power3.out'
          }, '-=1.2')
        }
      })

      // Add a floating idle animation to cards after they expand
      tl.to(cardsRef.current, {
        y: '+=15',
        stagger: {
          each: 0.1,
          repeat: -1,
          yoyo: true
        },
        duration: 2,
        ease: 'sine.inOut'
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <div 
      id="portfolio" 
      ref={containerRef} 
      className="relative w-full h-[180vh] lg:h-[220vh] bg-white overflow-hidden"
    >
      {/* Sticky Inner Page Container */}
      <div 
        ref={stickyRef} 
        className="sticky top-0 left-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden"
      >
        {/* Soft yellow ambient blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-[#f4c400]/10 rounded-full blur-[140px] pointer-events-none z-0"></div>

        {/* Big Watermark Text */}
        <div className="absolute select-none pointer-events-none z-0 text-center">
          <h2 className="text-[18vw] font-black uppercase text-zinc-900/[0.03] tracking-tighter leading-none font-display">
            MY WORK
          </h2>
        </div>

        {/* ----------------- DESKTOP: 3D Folder Explosion System ----------------- */}
        <div
          className="hidden lg:flex relative w-full h-full justify-center items-center"
          style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
        >
          
          {/* Project Cards (Initial state hidden inside folder) */}
          {projectList.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute w-[280px] h-[190px] rounded-[24px] border border-zinc-200 shadow-md flex flex-col justify-between hover:shadow-xl hover:scale-105 hover:border-[#f4c400] transition-all duration-300 pointer-events-auto cursor-pointer text-white overflow-hidden p-6"
              style={{
                opacity: 0,
                transform: 'scale(0.2) translate(0px, 150px)',
                zIndex: 10,
                backgroundImage: `linear-gradient(to bottom, rgba(9,9,11,0.35) 0%, rgba(9,9,11,0.80) 100%), url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="flex justify-between items-start z-10">
                <span className={`text-[10px] uppercase font-bold text-white px-2.5 py-1 rounded-full ${project.color}`}>
                  {project.category}
                </span>
                <ExternalLink size={16} className="text-white/60 hover:text-white transition-colors" />
              </div>
              <div className="z-10">
                <h4 className="text-xl font-black text-white tracking-tight mb-1">{project.title}</h4>
                <p className="text-xs text-white/60">Case Study & Demo &rarr;</p>
              </div>
            </div>
          ))}

          {/* 3D Archive Folder Parent */}
          <div className="relative w-[340px] h-[240px] z-20 pointer-events-none mt-20 flex justify-center items-end">
            
            {/* Folder Back Plate */}
            <div 
              className="absolute inset-0 bg-[#e0b400] rounded-[28px] border-b-8 border-zinc-950/20 shadow-2xl flex items-center justify-center"
              style={{
                backgroundImage: 'radial-gradient(rgba(0,0,0,0.03) 1px, transparent 0)',
                backgroundSize: '12px 12px'
              }}
            >
              <Folder size={64} className="text-[#f7f6f2]/40" />
            </div>

            {/* Folder Front Flap (Hinged at bottom, rotates towards viewer) */}
            <div
              ref={folderFrontRef}
              className="absolute inset-x-0 bottom-0 h-full bg-[#f4c400] rounded-[28px] border-t-2 border-white/20 origin-bottom shadow-2xl flex flex-col justify-between p-6"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateX(0deg)'
              }}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase tracking-widest font-black text-zinc-950 bg-white/40 px-2 py-0.5 rounded">
                  ARCHIVE v2.6
                </span>
                <div className="w-4 h-4 rounded-full bg-zinc-900/10"></div>
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-black text-zinc-950 tracking-tighter uppercase leading-tight">
                  Jamshaid
                </h3>
                <p className="text-[9px] font-bold text-zinc-800 tracking-wide uppercase">
                  Selected Works 2024-2026
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- MOBILE: Horizontal Swipe Carousel ----------------- */}
        <div className="lg:hidden w-full px-6 flex flex-col gap-6 select-none pointer-events-auto">
          <div className="text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold bg-zinc-100 px-3 py-1 rounded-full">
              Projects
            </span>
            <h3 className="text-3xl font-black text-zinc-900 tracking-tight mt-2">
              Selected Showcase
            </h3>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-none w-full">
            {projectList.map((project) => (
              <div
                key={project.id}
                className="snap-center shrink-0 w-[80vw] max-w-[320px] aspect-[4/3] rounded-3xl border border-zinc-200 shadow-lg p-6 flex flex-col justify-between text-white overflow-hidden"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(9,9,11,0.35) 0%, rgba(9,9,11,0.80) 100%), url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="flex justify-between items-start z-10">
                  <span className={`text-[10px] uppercase font-bold text-white px-3 py-1 rounded-full ${project.color}`}>
                    {project.category}
                  </span>
                  <ExternalLink size={18} className="text-white/80 hover:text-white transition-colors" />
                </div>
                <div className="z-10">
                  <h4 className="text-2xl font-black text-white tracking-tight mb-1">
                    {project.title}
                  </h4>
                  <p className="text-xs text-white/60">
                    Swipe left to browse &rarr;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
