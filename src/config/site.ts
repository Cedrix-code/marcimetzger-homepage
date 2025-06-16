/**
 * Site configuration
 * Centralized configuration for the application
 */

export const siteConfig = {
  name: "Marci Metzger Homes",
  description: "San Diego's trusted real estate expert with over 30 years of experience helping clients buy and sell homes throughout San Diego County.",
  url: "https://marcimetzger.com",
  ogImage: "/images/og-image.jpg",
  creator: "Marci Metzger",
  keywords: [
    "San Diego real estate",
    "real estate agent",
    "homes for sale",
    "property listings",
    "Marci Metzger",
    "San Diego homes",
    "real estate expert"
  ],
  links: {
    twitter: "https://twitter.com/marcimetzger",
    facebook: "https://facebook.com/marcimetzgerhomes",
    instagram: "https://instagram.com/marcimetzgerhomes",
    linkedin: "https://linkedin.com/in/marcimetzger",
  },
  contact: {
    phone: "(619) 555-0123",
    email: "marci@marcimetzger.com",
    address: {
      street: "123 Main Street",
      city: "San Diego",
      state: "CA",
      zip: "92101",
    },
  },
} as const

export type SiteConfig = typeof siteConfig
