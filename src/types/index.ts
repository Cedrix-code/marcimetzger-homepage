/**
 * Global type definitions for the application
 */

// Common utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

// Navigation types
export interface NavigationItem {
  href: string
  label: string
  external?: boolean
}

// Contact types
export interface ContactInfo {
  phone: string
  email: string
  address: Address
  office: OfficeInfo
}

export interface Address {
  street: string
  city: string
  state: string
  zip: string
}

export interface OfficeInfo {
  name: string
  license: string
}

// Property/Listing types
export interface Property {
  id: string
  title: string
  description: string
  price: number
  address: Address
  bedrooms: number
  bathrooms: number
  squareFootage: number
  propertyType: PropertyType
  status: PropertyStatus
  images: PropertyImage[]
  features: string[]
  listingDate: Date
  agent: Agent
}

export type PropertyType = 'house' | 'condo' | 'townhouse' | 'apartment' | 'land'
export type PropertyStatus = 'active' | 'pending' | 'sold' | 'off-market'

export interface PropertyImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
  order: number
}

export interface Agent {
  id: string
  name: string
  email: string
  phone: string
  photo?: string
  bio?: string
  license: string
}

// Form types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio'
  required?: boolean
  placeholder?: string
  options?: FormOption[]
  validation?: ValidationRule[]
}

export interface FormOption {
  value: string
  label: string
}

export interface ValidationRule {
  type: 'required' | 'email' | 'phone' | 'minLength' | 'maxLength' | 'pattern'
  value?: string | number
  message: string
}

// API types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Animation types
export interface AnimationConfig {
  duration: number
  delay?: number
  ease?: string
  stagger?: number
}

export interface ScrollTriggerConfig {
  trigger: string | Element
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  toggleActions?: string
}

// Component prop types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface SectionProps extends BaseComponentProps {
  id?: string
  title?: string
  subtitle?: string
}

// Theme types
export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  muted: string
  border: string
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: Record<string, unknown>
}

// SEO types
export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonical?: string
  noindex?: boolean
}
