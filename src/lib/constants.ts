/**
 * Application constants and configuration values
 */

// Site metadata
export const SITE_CONFIG = {
  name: 'Marci Metzger Homes',
  description: 'San Diego\'s trusted real estate expert with over 30 years of experience helping clients buy and sell homes throughout San Diego County.',
  url: 'https://marcimetzger.com',
  ogImage: '/images/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/marcimetzger',
    facebook: 'https://facebook.com/marcimetzgerhomes',
    instagram: 'https://instagram.com/marcimetzgerhomes',
    linkedin: 'https://linkedin.com/in/marcimetzger',
  },
} as const

// Contact information
export const CONTACT_INFO = {
  phone: '(619) 555-0123',
  email: 'marci@marcimetzger.com',
  address: {
    street: '123 Main Street',
    city: 'San Diego',
    state: 'CA',
    zip: '92101',
  },
  office: {
    name: 'Marci Metzger Real Estate',
    license: 'DRE #01234567',
  },
} as const

// Navigation menu items
export const NAVIGATION_ITEMS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#listings', label: 'Listings' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
] as const

// Animation durations (in seconds)
export const ANIMATION_DURATIONS = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
  slowest: 1.2,
} as const

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

// Z-index layers
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
} as const

// Form validation messages
export const VALIDATION_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be no more than ${max} characters`,
} as const

// API endpoints (if using external APIs)
export const API_ENDPOINTS = {
  contact: '/api/contact',
  newsletter: '/api/newsletter',
  listings: '/api/listings',
} as const
