import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Menu, X, MessageSquare, Send } from 'lucide-react'

export default function Navbar({ onAddTestimonial }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  
  // Modal form states
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const navbarRef = useRef(null)
  const menuLinksRef = useRef([])
  const logoRef = useRef(null)
  const feedbackBtnRef = useRef(null)

  // Last scroll position to detect direction
  const lastScrollY = useRef(0)

  // Navbar show/hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down - hide navbar
        gsap.to(navbarRef.current, {
          yPercent: -100,
          duration: 0.4,
          ease: 'power2.out',
        })
      } else {
        // Scrolling up - show navbar
        gsap.to(navbarRef.current, {
          yPercent: 0,
          duration: 0.4,
          ease: 'power2.out',
        })
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intro animations
  useEffect(() => {
    // Logo fade-in from left
    gsap.fromTo(logoRef.current, 
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
    )

    // Stagger nav links
    gsap.fromTo(menuLinksRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
    )

    // Feedback button fade-in from right
    gsap.fromTo(feedbackBtnRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.6 }
    )
  }, [])

  // Mobile menu open/close GSAP animations
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo('.mobile-overlay-link',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      )
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [mobileMenuOpen])

  const scrollToSection = (id) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSubmitFeedback = (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) {
      setError('Name and Message are required.')
      return
    }
    setError('')
    
    // Add to testimonials list
    if (onAddTestimonial) {
      onAddTestimonial({
        name,
        role: role.trim() || 'Client',
        message,
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`
      })
    }

    // Reset fields and close modal
    setName('')
    setRole('')
    setMessage('')
    setModalOpen(false)
  }

  return (
    <>
      {/* Navbar Container */}
      <nav
        ref={navbarRef}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300 py-5 px-6 md:px-12 flex justify-between items-center glassmorphism"
      >
        {/* Logo */}
        <div
          ref={logoRef}
          className="text-2xl font-black tracking-tighter cursor-pointer text-white hover:text-brand-yellow hover:shadow-[0_0_15px_rgba(250,204,21,0.5)] transition-all duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Jamshaid<span className="text-brand-yellow">.web</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'About', 'Portfolio', 'Service', 'Contact'].map((item, index) => {
            const sectionId = item === 'Home' ? 'portfolio-hero' : item.toLowerCase()
            return (
              <button
                key={item}
                ref={(el) => (menuLinksRef.current[index] = el)}
                onClick={() => scrollToSection(sectionId)}
                className="relative text-white font-medium hover:text-brand-yellow transition-colors duration-300 py-1 group cursor-pointer"
              >
                {item}
                {/* Hover underline slide animation */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-yellow transition-all duration-300 group-hover:w-full"></span>
              </button>
            )
          })}
        </div>

        {/* Actions & Hamburger */}
        <div className="flex items-center gap-4">
          {/* Feedback Modal Trigger */}
          <button
            ref={feedbackBtnRef}
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-brand-yellow text-zinc-950 font-semibold rounded-full hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-100 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <MessageSquare size={16} />
            <span className="hidden sm:inline">Add Review</span>
          </button>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-brand-yellow transition-colors duration-300 focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-3xl flex flex-col justify-center items-center">
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-brand-yellow transition-colors"
          >
            <X size={32} />
          </button>
          
          <div className="flex flex-col gap-8 text-center">
            {['Home', 'About', 'Portfolio', 'Service', 'Contact'].map((item) => {
              const sectionId = item === 'Home' ? 'portfolio-hero' : item.toLowerCase()
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(sectionId)}
                  className="mobile-overlay-link text-4xl md:text-5xl font-black text-white hover:text-brand-yellow transition-colors duration-300 tracking-tight"
                >
                  {item}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Feedback Modal Popup */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
          <div 
            className="w-full max-w-md rounded-2xl glassmorphism p-6 md:p-8 relative border border-white/10 shadow-2xl"
            data-aos="zoom-in"
          >
            <button
              onClick={() => {
                setModalOpen(false)
                setError('')
              }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-black text-white mb-2 font-display">
              Add <span className="text-brand-yellow">Testimonial</span>
            </h3>
            <p className="text-zinc-400 text-sm mb-6">
              Share your experience working with Jamshaid. Your testimonial will appear in the scroll showcase section.
            </p>

            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-zinc-900/60 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-yellow transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Role / Position
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="CEO, Acme Corp"
                  className="w-full px-4 py-3 bg-zinc-900/60 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-yellow transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Message *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Working with Jamshaid was an amazing experience..."
                  rows={4}
                  className="w-full px-4 py-3 bg-zinc-900/60 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-brand-yellow transition-colors resize-none"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-yellow hover:bg-white text-zinc-950 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-brand-yellow/20"
              >
                <Send size={16} />
                Submit Testimonial
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
