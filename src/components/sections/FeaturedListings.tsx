'use client'

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function FeaturedListings() {
  const listingsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!listingsRef.current) return;

    // Listings animation
    gsap.fromTo(
      listingsRef.current.querySelectorAll('.listing-card'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
    );
  }, []);

  return (
    <section ref={listingsRef} className="py-20" style={{ backgroundColor: '#F1EBE2' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-blue-900"
          >
            Featured Listings
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-700 max-w-2xl mx-auto"
          >
            Browse through some of my current featured properties in San Diego County.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <motion.div 
              key={item}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + (item * 0.1) }}
              whileHover={{ y: -10 }}
              className="listing-card rounded-lg overflow-hidden shadow-lg"
              style={{ backgroundColor: '#F1EBE2' }}
            >
              <div className="relative pb-2/3">
                <Image
                  src="/api/placeholder/600/400"
                  alt={`Featured Property ${item}`}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-md font-semibold">
                  For Sale
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-900">Beautiful Family Home</h3>
                <p className="text-gray-600 mb-4">123 Palm Avenue, San Diego, CA</p>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-2xl font-bold text-blue-600">$1,250,000</p>
                  <div className="flex space-x-4 text-gray-700">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <title>Bedrooms</title>
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                      </svg>
                      <span>4</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <title>Bathrooms</title>
                        <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
                      </svg>
                      <span>3</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <title>Square footage</title>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>2,450 sqft</span>
                    </div>
                  </div>
                </div>
                {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
                <a href="#" className="block text-center bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-2 px-4 rounded-md transition-colors">
                  View Details
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
          <a href="#" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
            View All Listings
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <title>Arrow pointing right</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}