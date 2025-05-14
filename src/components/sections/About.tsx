'use client'

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

export default function About() {
  const aboutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!aboutRef.current) return;

    // About section animation
    gsap.fromTo(
      aboutRef.current.querySelector('.about-content'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
  }, []);

  return (
    <section id="about" ref={aboutRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 about-content">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold mb-6 text-blue-900"
            >
              About Marci Metzger
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-700 mb-4"
            >
              With over 30 years of experience in San Diego real estate, I&apos;ve built my reputation on trust, integrity, and an unwavering commitment to my clients&apos; success.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-gray-700 mb-6"
            >
              Whether you&apos;re buying your first home, selling your current property, or looking for investment opportunities, I provide personalized service tailored to your unique needs and goals.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-3xl font-bold text-blue-600">30+</p>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-3xl font-bold text-blue-600">500+</p>
                <p className="text-gray-600">Happy Clients</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-3xl font-bold text-blue-600">$200M+</p>
                <p className="text-gray-600">Sales Volume</p>
              </div>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-64 h-64 bg-blue-100 rounded-full opacity-50"></div>
            <img src="/api/placeholder/600/800" alt="Marci Metzger" className="relative z-10 rounded-lg shadow-xl w-full max-w-md mx-auto" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}