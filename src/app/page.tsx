'use client'

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Layout components
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

// Section components
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Testimonials from '@/components/sections/Testimonials';
import FeaturedListings from '@/components/sections/FeaturedListings';
import Contact from '@/components/sections/Contact';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mainRef.current) return;

    // Initialize GSAP animations
    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.from('.hero-content', {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: 'power3.out'
      });

      // Section headings animation
      for (const heading of gsap.utils.toArray<HTMLElement>('.section-heading')) {
        const split = new SplitText(heading, { type: 'lines,words,chars' });

        gsap.from(split.chars, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          stagger: 0.02,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });
      }

      // Fade in sections
      for (const section of gsap.utils.toArray<HTMLElement>('.section')) {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });
      }

      // Parallax effect for background elements
      for (const bg of gsap.utils.toArray<HTMLElement>('.parallax-bg')) {
        gsap.to(bg, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: bg,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navigation />
      <main ref={mainRef} className="overflow-hidden">
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <FeaturedListings />
        <Contact />
      </main>
      <Footer />
    </>
  );
}