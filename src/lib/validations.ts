import { z } from 'zod'

/**
 * Form validation schemas using Zod
 */

// Contact form validation
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
    .optional(),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  preferredContact: z
    .enum(['email', 'phone', 'either'])
    .default('email'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Newsletter signup validation
export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address'),
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .optional(),
})

export type NewsletterData = z.infer<typeof newsletterSchema>

// Property search validation
export const propertySearchSchema = z.object({
  location: z
    .string()
    .min(2, 'Location must be at least 2 characters')
    .optional(),
  minPrice: z
    .number()
    .min(0, 'Minimum price must be positive')
    .optional(),
  maxPrice: z
    .number()
    .min(0, 'Maximum price must be positive')
    .optional(),
  bedrooms: z
    .number()
    .min(0, 'Bedrooms must be 0 or more')
    .max(10, 'Bedrooms must be 10 or less')
    .optional(),
  bathrooms: z
    .number()
    .min(0, 'Bathrooms must be 0 or more')
    .max(10, 'Bathrooms must be 10 or less')
    .optional(),
  propertyType: z
    .enum(['house', 'condo', 'townhouse', 'apartment', 'land'])
    .optional(),
})

export type PropertySearchData = z.infer<typeof propertySearchSchema>

// Listing inquiry validation
export const listingInquirySchema = z.object({
  listingId: z
    .string()
    .min(1, 'Listing ID is required'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
    .optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must be less than 500 characters'),
  inquiryType: z
    .enum(['viewing', 'information', 'offer'])
    .default('information'),
})

export type ListingInquiryData = z.infer<typeof listingInquirySchema>

// Validation helper functions
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\D/g, ''))
}

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '')
}
