import React, { useEffect, useState } from 'react'
import Lenis from 'lenis'
import AOS from 'aos'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Components
import Navbar from './components/Navbar'
import Portfolio from './components/Portfolio'
import Hero from './components/Hero'
import Welcome from './components/Welcome'
import Projects from './components/Projects'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

import './App.css'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

function App() {
  const [testimonials, setTestimonials] = useState([
    { 
      name: 'Sarah Connor', 
      role: 'Product Manager at Cyberdyne', 
      message: 'Jamshaid is a genius! He delivered our dashboard ahead of schedule with flawless animations.', 
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah' 
    },
    { 
      name: 'Bruce Wayne', 
      role: 'CEO of Wayne Enterprises', 
      message: 'Outstanding design work. Extremely futuristic, robust, and clean code.', 
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Bruce' 
    },
    { 
      name: 'Tony Stark', 
      role: 'Director at Stark Industries', 
      message: 'His attention to details and premium animations are top-notch. Highly recommended!', 
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Tony' 
    },
    { 
      name: 'Clark Kent', 
      role: 'Reporter at Daily Planet', 
      message: 'Fantastic speed and responsiveness. The website feels super organic and modern.', 
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Clark' 
    },
    { 
      name: 'Peter Parker', 
      role: 'Photographer', 
      message: 'Super smooth scrolling and high-fidelity transitions. He really knows his craft.', 
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Peter' 
    }
  ])

  // Add a newly submitted testimonial to the list
  const handleAddTestimonial = (newTestimonial) => {
    setTestimonials((prev) => [newTestimonial, ...prev])
  }

  // Smooth scrolling (Lenis) and GSAP ticker sync
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 2
    })

    // Synchronize ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Tick function
    const rafUpdate = (time) => {
      lenis.raf(time * 1000)
    }
    
    gsap.ticker.add(rafUpdate)
    gsap.ticker.lagSmoothing(0)

    // ScrollTrigger default settings
    ScrollTrigger.defaults({
      markers: false
    })

    return () => {
      gsap.ticker.remove(rafUpdate)
      lenis.destroy()
    }
  }, [])

  // AOS (Animate on Scroll) Initialization
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    })
  }, [])

  return (
    <div className="relative w-full bg-white text-zinc-950 selection:bg-brand-yellow selection:text-zinc-950 min-h-screen">
      {/* Noise Texture Overlay */}
      <div className="noise-overlay"></div>

      {/* Header / Navigation */}
      <Navbar onAddTestimonial={handleAddTestimonial} />

      {/* 
        1. Fixed Background Portfolio Section
        This remains fixed in the background while other components scroll over it.
      */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <Portfolio />
      </div>

      {/* 
        2. Scrolling Content Overlap
        This container scrolls over the fixed portfolio section due to the mt-screen margin.
      */}
      <div className="relative z-10 w-full mt-screen bg-white shadow-[0_-20px_60px_rgba(0,0,0,0.35)]">
        {/* Hero Section */}
        <Hero />

        {/* Welcome & Marquee Testimonial Section */}
        <Welcome testimonials={testimonials} />

        {/* Projects Section */}
        <Projects />

        {/* Services Section */}
        <Services />

        {/* Contact Section */}
        <Contact />

        {/* Footer Section */}
        <Footer />
      </div>
    </div>
  )
}

export default App
