'use client'

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import BurgerMenu from './BurgerMenu';

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);



  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!navRef.current) return;

    // Original navigation hide animation
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

    // Wait for DOM to be fully ready
    const initScrollTrigger = () => {
      // Layered burger menu effect: Emerges from behind Hero section
      const heroSection = document.querySelector('section');

      if (!heroSection) {
        // Try again after a short delay
        setTimeout(initScrollTrigger, 100);
        return;
      }

      const heroScrollTrigger = ScrollTrigger.create({
        trigger: heroSection,
        start: "80% top", // Start revealing when Hero is 80% scrolled past
        end: "bottom top", // Complete reveal when Hero bottom reaches viewport top

        onUpdate: (self) => {
          if (window.innerWidth >= 1024) {
            // Progressive reveal based on scroll progress
            const progress = self.progress;
            setShowBurgerMenu(progress > 0);

            // Set opacity based on scroll progress for smooth transition
            const burgerElement = document.querySelector('[data-burger-menu]');
            if (burgerElement) {
              (burgerElement as HTMLElement).style.opacity = progress.toString();
            }
          }
        },

        // Hide burger menu only when scrolling back up and Hero comes back into view
        onLeaveBack: () => {
          if (window.innerWidth >= 1024) {
            setShowBurgerMenu(false);
            const burgerElement = document.querySelector('[data-burger-menu]');
            if (burgerElement) {
              (burgerElement as HTMLElement).style.opacity = '0';
            }
          }
        },

        // Ensure menu stays visible when scrolling further down
        onEnter: () => {
          if (window.innerWidth >= 1024) {
            setShowBurgerMenu(true);
            const burgerElement = document.querySelector('[data-burger-menu]');
            if (burgerElement) {
              (burgerElement as HTMLElement).style.opacity = '1';
            }
          }
        },

        onRefresh: () => {
          // Set initial state based on Hero visibility and scroll position
          if (window.innerWidth >= 1024) {
            if (heroSection) {
              const heroRect = heroSection.getBoundingClientRect();
              const viewportHeight = window.innerHeight;

              // Calculate how much of the Hero has scrolled past
              const heroHeight = heroRect.height;
              const scrolledPast = Math.max(0, -heroRect.top);
              const scrollProgress = Math.min(1, scrolledPast / (heroHeight * 0.2)); // 20% range for progressive reveal

              const shouldShow = heroRect.bottom <= viewportHeight * 0.2; // Show when 80% scrolled
              setShowBurgerMenu(shouldShow);

              const burgerElement = document.querySelector('[data-burger-menu]');
              if (burgerElement) {
                (burgerElement as HTMLElement).style.opacity = shouldShow ? '1' : scrollProgress.toString();
              }
            }
          }
        }
      });

      // Mobile screen handling
      const handleResize = () => {
        if (window.innerWidth < 1024) {
          // Always show on mobile
          setShowBurgerMenu(true);
          const burgerElement = document.querySelector('[data-burger-menu]');
          if (burgerElement) {
            (burgerElement as HTMLElement).style.opacity = '1';
          }
        } else {
          // On desktop, refresh the scroll trigger to check current state
          heroScrollTrigger.refresh();
        }
      };

      window.addEventListener('resize', handleResize);
      handleResize(); // Check initial screen size

      return () => {
        window.removeEventListener('resize', handleResize);
        heroScrollTrigger.kill();
      };
    };

    // Initialize after a short delay to ensure DOM is ready
    setTimeout(initScrollTrigger, 100);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <nav ref={navRef} className="fixed top-0 left-0 w-full z-80 items-center justify-between px-12 py-12 transition-transform duration-300 hidden lg:flex">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/images/MMLogowhite2.png" alt="Logo" width={220} height={220} className="rounded-full" />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-6 text-right">
          <a href="#home" className="group relative text-white text-[14px] font-semibold uppercase tracking-wider">
            <span className="inline-block mr-4 w-2 h-2 rounded-full bg-white scale-0 transition-transform duration-200 group-hover:scale-100"/>
            Home
          </a>
          <a href="#listings" className="group relative text-white text-[14px] font-semibold uppercase tracking-wider">
            <span className="inline-block mr-4 w-2 h-2 rounded-full bg-white scale-0 transition-transform duration-200 group-hover:scale-100"/>
            Listings
          </a>
          <a href="#move" className="group relative text-white text-[14px] font-semibold uppercase tracking-wider">
            <span className="inline-block mr-4 w-2 h-2 rounded-full bg-white scale-0 transition-transform duration-200 group-hover:scale-100"/>
            Let&apos;s move
          </a>
          <a href="#about" className="group relative text-white text-[14px] font-semibold uppercase tracking-wider">
            <span className="inline-block mr-4 w-2 h-2 rounded-full bg-white scale-0 transition-transform duration-200 group-hover:scale-100"/>
            About us
          </a>
        </div>
      </nav>

      {/* Mobile Burger Menu */}
      <BurgerMenu
        isOpen={isBurgerOpen}
        onToggle={() => setIsBurgerOpen(!isBurgerOpen)}
        isVisible={showBurgerMenu}
      />
    </>
  );
};

export default Navigation;