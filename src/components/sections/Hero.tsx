'use client'

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!heroRef.current) return;
    
    gsap.to('.hero-bg', {
      yPercent: 5,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 2
      }
    });
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden z-60">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="hero-bg w-full h-[120%] bg-cover bg-center transform scale-110"
             style={{ backgroundImage: "url('/images/Field.png')" }} />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Title and subtitle */}
      <div className="w-full z-10 flex flex-col items-center justify-center text-center px-4 absolute bottom-0">
        <div className="flex flex-col items-end gap-2 mb-[clamp(40px,5vw,120px)] text-right w-full px-[clamp(2px,5vw,160px)]">
          <p className="text-[clamp(10px,1.5vw,16px)] font-medium leading-4 tracking-[0.3em] uppercase" style={{ color: '#F1EBE2', opacity: 0.9 }}>
          PAHRUMP REALTOR <br />THE RIDGE REALTY GROUP
          </p>
        </div>
        <h1 className="font-editorial-old text-[clamp(50px,10.5vw,300px)] leading-[0.51] tracking-[0.04em]" style={{ color: '#F1EBE2' }}>
          MARCI METZGER
        </h1>
      </div>
    </section>
  );
}