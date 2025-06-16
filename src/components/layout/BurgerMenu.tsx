'use client'

import { useEffect, useRef, useState } from 'react';
import type React from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

interface BurgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  isVisible: boolean;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, onToggle, isVisible }) => {
  const burgerRef = useRef<HTMLButtonElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2aRef = useRef<HTMLDivElement>(null); // First middle line
  const line2bRef = useRef<HTMLDivElement>(null); // Second middle line
  const line3Ref = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure component only runs animations on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!burgerRef.current) return;

    // Progressive reveal is handled by ScrollTrigger in Navigation component
    // Only manage pointer events here
    burgerRef.current.style.pointerEvents = isVisible ? 'auto' : 'none';
  }, [isVisible]);

  useEffect(() => {
    if (!isClient || !backgroundRef.current || !line1Ref.current || !line2aRef.current || !line2bRef.current || !line3Ref.current) return;

    if (isOpen) {
      // Create timeline for sequential animation
      const tl = gsap.timeline();

      // Background expansion - Phase 1: Horizontal expansion
      tl.to(backgroundRef.current, {
        width: '50vw',
        duration: 0.5,
        ease: "power2.out"
      }, 0) // Start immediately
      // Background expansion - Phase 2: Vertical expansion (after horizontal)
      .to(backgroundRef.current, {
        height: '100vh',
        duration: 0.5,
        ease: "power2.out"
      }, 0.5); // Start after horizontal expansion

      // Phase 1: Hide top and bottom lines by shrinking width to 0
      tl.to([line1Ref.current, line3Ref.current], {
        width: 0,
        duration: 0.25,
        ease: "power2.in"
      }, 0) // Start with background animation
      // Phase 2: Transform the two middle lines into X formation (with delay)
      .to(line2aRef.current, {
        rotation: 45,
        duration: 0.3,
        ease: "power2.out",
        transformOrigin: "center center"
      }, 0.15) // 0.15s delay after Phase 1
      .to(line2bRef.current, {
        rotation: 135,
        duration: 0.3,
        ease: "power2.out",
        transformOrigin: "center center"
      }, 0.15); // Start at same time as line2aRef

      // Animate logo (after background expansion completes)
      gsap.fromTo('.burger-menu-logo', {
        x: -30,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        delay: 1.0, // Start after background expansion completes (0.5s + 0.5s)
        ease: "power2.out"
      });

      // Animate brand text (after background expansion completes)
      gsap.fromTo('.burger-menu-brand', {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        delay: 1.0, // Start after background expansion completes (0.5s + 0.5s)
        ease: "power2.out"
      });

      // Animate menu items (after background expansion completes)
      gsap.fromTo('.burger-menu-item', {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        delay: 1.0, // Start after background expansion completes (0.5s + 0.5s)
        ease: "power2.out"
      });
    } else {
      // Create timeline for sequential reverse animation
      const tl = gsap.timeline();

      // Background contraction - Phase 1: Vertical shrinking (first)
      tl.to(backgroundRef.current, {
        height: '5rem', // h-20 = 5rem
        duration: 0.4,
        ease: "power2.in"
      }, 0) // Start immediately
      // Background contraction - Phase 2: Horizontal shrinking (after vertical)
      .to(backgroundRef.current, {
        width: '20rem', // w-80 = 20rem
        duration: 0.4,
        ease: "power2.in"
      }, 0.4); // Start after vertical shrinking

      // Phase 1: Reset the two middle lines back to horizontal (first)
      tl.to([line2aRef.current, line2bRef.current], {
        rotation: 0,
        duration: 0.3,
        ease: "power2.in",
        transformOrigin: "center center"
      }, 0) // Start with background animation
      // Phase 2: Restore top and bottom lines by expanding width back to full (with delay)
      .to([line1Ref.current, line3Ref.current], {
        width: '1.5rem', // w-6 = 1.5rem
        duration: 0.25,
        ease: "power2.out"
      }, 0.15); // 0.15s delay after Phase 1

      // Hide logo, brand text, and menu items immediately
      gsap.to('.burger-menu-logo', {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in"
      });

      gsap.to('.burger-menu-brand', {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in"
      });

      gsap.to('.burger-menu-item', {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in"
      });
    }
  }, [isOpen, isClient]);

  const menuItems = [
    { href: "#home", label: "Home" },
    { href: "#listings", label: "Listings" },
    { href: "#move", label: "Let's move" },
    { href: "#about", label: "About us" }
  ];

  const handleMenuItemClick = (href: string) => {
    // Close menu when item is clicked
    onToggle();
    
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Rectangular Background with Menu Items */}
      <div ref={backgroundRef} className="fixed top-0 right-0 w-80 h-20 bg-[#e0d3cc] z-40 overflow-hidden">
        {/* Logo Container */}
        <div className="absolute top-4 left-12 flex items-center">
          <Image
            src="/images/MMLogo.png"
            alt="Marci Metzger Homes Logo"
            width={160}
            height={60}
            className="burger-menu-logo opacity-0 object-contain"
            priority
          />
        </div>

        {/* Menu Items Container */}
        <div className="absolute top-0 right-0 flex flex-col items-end space-y-6 px-8 pt-32 pr-12">
          {menuItems.map((item) => (
            <button
              type="button"
              key={item.href}
              onClick={() => handleMenuItemClick(item.href)}
              className="burger-menu-item group relative text-black text-lg font-semibold uppercase tracking-wider opacity-0 hover:text-black/70 transition-colors duration-200 text-right"
            >
              <span className="inline-block mr-4 w-2 h-2 rounded-full bg-black scale-0 transition-transform duration-200 group-hover:scale-100" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Brand Name Text */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <h2 className="burger-menu-brand text-black text-4xl uppercase opacity-0 text-center whitespace-nowrap font-editorial-old text-[clamp(20px,10.5vw,100px)] font-light leading-[0.21] tracking-[0.04em]">
            Marci Metzger
          </h2>
        </div>
      </div>

      {/* Navigation Container */}
      <div
        className="fixed top-0 right-0 w-60 h-20 z-50 flex items-center justify-center gap-4 px-4"
        style={{
          pointerEvents: isVisible ? 'auto' : 'none',
          opacity: isVisible ? 1 : 0
        }}
      >
        {/* Book Now Text */}
        <button
          type="button"
          className="cursor-pointer bg-transparent border-none p-0 text-black font-light text-[16px] uppercase tracking-wider transition-colors duration-200 whitespace-nowrap relative group"
          onClick={() => {
            // Handle book now action - could open a booking modal, navigate to booking page, etc.
            console.log('Book now clicked');
          }}
          aria-label="Book an appointment"
        >
          Book now
          {/* Animated Underline */}
          <div
            className="absolute left-0 w-full h-[1.5px] bg-black transition-all duration-300 ease-in-out group-hover:w-[0.5px]"
            style={{
              bottom: '1px',
              transformOrigin: 'right'
            }}
          />
        </button>

        {/* Burger Button */}
        <button
          type="button"
          ref={burgerRef}
          data-burger-menu
          className="cursor-pointer bg-transparent border-none p-0 flex-shrink-0"
          onClick={onToggle}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          style={{ transform: 'none' }} // Ensure no initial transforms
        >
        <div className="w-8 h-8 flex flex-col justify-center items-center relative">
          {/* Top line */}
          <div
            ref={line1Ref}
            className="w-6 h-0.5 bg-black absolute"
            style={{
              top: '8px',
              transformOrigin: 'center',
              transition: 'none'
            }}
          />

          {/* Two middle lines stacked in center */}
          <div
            ref={line2aRef}
            className="w-6 h-0.5 bg-black absolute"
            style={{
              top: '16px',
              transformOrigin: 'center',
              transition: 'none'
            }}
          />
          <div
            ref={line2bRef}
            className="w-6 h-0.5 bg-black absolute"
            style={{
              top: '16px',
              transformOrigin: 'center',
              transition: 'none'
            }}
          />

          {/* Bottom line */}
          <div
            ref={line3Ref}
            className="w-6 h-0.5 bg-black absolute"
            style={{
              top: '24px',
              transformOrigin: 'center',
              transition: 'none'
            }}
          />
        </div>
        </button>
      </div>



      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              onToggle();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Close menu"
        />
      )}
    </>
  );
};

export default BurgerMenu;
