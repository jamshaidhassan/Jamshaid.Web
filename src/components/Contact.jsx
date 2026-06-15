import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Send, PhoneCall } from 'lucide-react'

const Instagram = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const Github = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  
  // Form States
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Pin section so footer slides over it
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'bottom bottom',
      pin: true,
      pinSpacing: false,
    })

    return () => {
      scrollTriggerInstance.kill()
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim()) {
      setError('Name is required')
      return
    }
    if (!message.trim()) {
      setError('Message is required')
      return
    }
    setError('')

    // Formatted WhatsApp message format
    const formattedText = `Hello Jamshaid,\n\nMy name is *${name.trim()}*.\n${
      email.trim() ? `Email: ${email.trim()}\n` : ''
    }\n*Inquiry Message:*\n"${message.trim()}"`
    
    const whatsappUrl = `https://wa.me/923022432685?text=${encodeURIComponent(formattedText)}`
    
    window.open(whatsappUrl, '_blank')
  }

  const socialLinks = [
    { 
      name: 'WhatsApp', 
      icon: <PhoneCall size={20} />, 
      url: 'https://wa.me/923022432685' 
    },
    { 
      name: 'Instagram', 
      icon: <Instagram size={20} />, 
      url: 'https://www.instagram.com/scaleadsagency_?igsh=bnU5aXF0ejRyNGFi' 
    },
    { 
      name: 'LinkedIn', 
      icon: <Linkedin size={20} />, 
      url: 'https://linkedin.com' 
    },
    { 
      name: 'GitHub', 
      icon: <Github size={20} />, 
      url: 'https://github.com' 
    }
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0a0a0a] rounded-t-[40px] flex flex-col justify-center items-center py-20 px-6 sm:px-12 overflow-hidden z-20 border-t border-white/5"
    >
      {/* Massive Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h2 className="text-[24vw] font-black uppercase text-white/[0.02] tracking-tighter leading-none font-display">
          CONNECT
        </h2>
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center gap-10 z-10 text-center">
        
        {/* Section Heading */}
        <div data-aos="fade-up">
          <span className="text-xs font-black uppercase tracking-widest text-brand-yellow bg-zinc-900 border border-white/10 px-3.5 py-1.5 rounded-full">
            Get In Touch
          </span>
          <h3 className="text-[10vw] sm:text-[7vw] leading-none font-black text-white uppercase tracking-tighter mt-4">
            LET'S TALK
          </h3>
        </div>

        {/* Contact Form & Socials Container */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-left mt-4">
          
          {/* Form Column */}
          <div 
            className="col-span-1 md:col-span-8 w-full glassmorphism p-6 sm:p-10 rounded-3xl border border-white/5 shadow-2xl"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    className="w-full px-5 py-4 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="w-full px-5 py-4 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Your Message *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can I help you?"
                  rows={4}
                  className="w-full px-5 py-4 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-white/50 transition-colors resize-none"
                />
              </div>

              {error && (
                <p className="text-red-500 text-xs font-semibold">{error}</p>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 bg-white hover:bg-zinc-200 text-zinc-950 font-bold uppercase tracking-widest text-xs rounded-xl shadow-lg hover:shadow-white/20 transition-all duration-300 cursor-pointer"
              >
                <Send size={14} />
                Send Inquiry via WhatsApp
              </button>
            </form>
          </div>

          {/* Social Links & Details Column */}
          <div 
            className="col-span-1 md:col-span-4 w-full flex flex-col gap-6"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            {/* Quick Contact Info */}
            <div className="glassmorphism p-6 rounded-3xl border border-white/5">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                Inquiries
              </h4>
              <p className="text-zinc-400 text-sm mb-1">jamshaidhassan685@gmail.com</p>
              <p className="text-zinc-400 text-sm">+92 302 243 2685</p>
            </div>

            {/* Glowing Social Circles */}
            <div className="glassmorphism p-6 rounded-3xl border border-white/5 flex flex-col gap-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">
                Follow Me
              </h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full border-2 border-white/20 text-white flex items-center justify-center bg-transparent hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.45)] hover:border-white scale-100 hover:scale-105 transition-all duration-500 cursor-pointer"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
