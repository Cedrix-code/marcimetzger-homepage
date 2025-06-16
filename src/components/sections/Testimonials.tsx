'use client'

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

// Define testimonial data with unique IDs
const testimonials = [
  {
    id: 'testimonial-1',
    rating: 5,
    text: "Marci made our first home buying experience so easy and stress-free. She was always available to answer our questions and went above and beyond to find us the perfect home.",
    name: "Sarah & David Johnson",
    role: "First-time Home Buyers"
  },
  {
    id: 'testimonial-2',
    rating: 5,
    text: "We've worked with Marci on multiple transactions over the years. Her market knowledge and negotiation skills are unmatched. She consistently delivers results that exceed our expectations.",
    name: "Michael Rodriguez",
    role: "Property Investor"
  },
  {
    id: 'testimonial-3',
    rating: 5,
    text: "Selling our family home of 25 years was emotional, but Marci guided us through the process with compassion and professionalism. She got us $50k over asking!",
    name: "Patricia & Robert Wilson",
    role: "Home Sellers"
  }
];

export default function Testimonials() {
  const testimonialsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!testimonialsRef.current) return;

    // Testimonials animation
    gsap.fromTo(
      testimonialsRef.current.querySelectorAll('.testimonial-card'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
    );
  }, []);

  return (
    <section id="testimonials" ref={testimonialsRef} className="py-20" style={{ backgroundColor: '#F1EBE2' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-blue-900"
          >
            Client Testimonials
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-700 max-w-2xl mx-auto"
          >
            Don&apos;t just take my word for it. Here&apos;s what my clients have to say about their experience.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card p-8 rounded-lg shadow-lg" style={{ backgroundColor: '#F1EBE2' }}>
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex" role="img" aria-label="5 star rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg 
                      key={`${testimonial.id}-star-${i}`}
                      className="w-5 h-5" 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      aria-hidden="true"
                    >
                      <title>{`Star ${i + 1}`}</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-blue-900">{testimonial.name}</p>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
