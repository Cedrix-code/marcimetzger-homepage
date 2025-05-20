'use client'

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!navRef.current) return;

    gsap.to(navRef.current, {
      yPercent: -100,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: "h1",
        start: "top 10%",
        end: "top 5%",
        scrub: true
      }
    });
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-30 flex items-center justify-between px-12 py-12 transition-transform duration-300">
      {/* Logo */}
      <div className="flex items-center">
        <Image src="/images/MMLogo.png" alt="Logo" width={220} height={220} className="rounded-full" />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-6 text-right">
        <a href="#home" className="group relative text-white text-[14px] font-semibold uppercase tracking-wider">
          <span className="inline-block mr-4 w-2 h-2 rounded-full bg-white scale-0 transition-transform duration-200 group-hover:scale-100"></span>
          Home
        </a>
        <a href="#listings" className="group relative text-white text-[14px] font-semibold uppercase tracking-wider">
          <span className="inline-block mr-4 w-2 h-2 rounded-full bg-white scale-0 transition-transform duration-200 group-hover:scale-100"></span>
          Listings
        </a>
        <a href="#move" className="group relative text-white text-[14px] font-semibold uppercase tracking-wider">
          <span className="inline-block mr-4 w-2 h-2 rounded-full bg-white scale-0 transition-transform duration-200 group-hover:scale-100"></span>
          Let&apos;s move
        </a>
        <a href="#about" className="group relative text-white text-[14px] font-semibold uppercase tracking-wider">
          <span className="inline-block mr-4 w-2 h-2 rounded-full bg-white scale-0 transition-transform duration-200 group-hover:scale-100"></span>
          About us
        </a>
      </div>
    </nav>
  );
};

export default Navigation;