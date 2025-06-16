/**
 * Navigation utilities for handling programmatic routing and 404 errors
 */

import { notFound } from 'next/navigation'

/**
 * Valid routes in the application
 * Update this list when adding new routes
 */
export const VALID_ROUTES = [
  '/',
  '/test-errors',
  '/api/test', // Test API route
  // Add more routes as your application grows
] as const

/**
 * Type for valid route paths
 */
export type ValidRoute = typeof VALID_ROUTES[number]

/**
 * Check if a route path is valid
 */
export function isValidRoute(path: string): path is ValidRoute {
  // Normalize the path (remove trailing slash except for root)
  const normalizedPath = path === '/' ? '/' : path.replace(/\/$/, '')
  return VALID_ROUTES.includes(normalizedPath as ValidRoute)
}

/**
 * Safe navigation function that checks route validity
 * Use this for programmatic navigation to ensure 404 handling
 */
export function safeNavigate(path: string): void {
  if (!isValidRoute(path)) {
    // Trigger the not-found page
    notFound()
  }
  
  // If we reach here, the route is valid
  // You can add additional navigation logic here if needed
}

/**
 * Validate route parameters for dynamic routes
 * Use this in dynamic route components to validate params
 */
export function validateRouteParams(
  params: Record<string, string | string[]>,
  requiredParams: string[]
): boolean {
  for (const param of requiredParams) {
    if (!params[param] || params[param] === '') {
      return false
    }
  }
  return true
}

/**
 * Handle dynamic route validation
 * Call this in dynamic route components to trigger 404 for invalid params
 */
export function handleDynamicRoute(
  params: Record<string, string | string[]>,
  requiredParams: string[]
): void {
  if (!validateRouteParams(params, requiredParams)) {
    notFound()
  }
}

/**
 * Generate breadcrumb navigation for error pages
 */
export function generateBreadcrumbs(currentPath: string): Array<{
  label: string
  href: string
  isActive: boolean
}> {
  const pathSegments = currentPath.split('/').filter(Boolean)
  const breadcrumbs = [
    {
      label: 'Home',
      href: '/',
      isActive: currentPath === '/',
    },
  ]

  let currentHref = ''
  for (const segment of pathSegments) {
    currentHref += `/${segment}`
    breadcrumbs.push({
      label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      href: currentHref,
      isActive: currentHref === currentPath,
    })
  }

  return breadcrumbs
}

/**
 * Get suggested navigation items for 404 pages
 */
export function getNavigationSuggestions(): Array<{
  href: string
  label: string
  description: string
}> {
  return [
    {
      href: '/',
      label: 'Home',
      description: 'Return to the homepage',
    },
    {
      href: '/#about',
      label: 'About Us',
      description: 'Learn more about Marci Metzger',
    },
    {
      href: '/#listings',
      label: 'Listings',
      description: 'Browse available properties',
    },
    {
      href: '/#contact',
      label: 'Contact',
      description: 'Get in touch with us',
    },
  ]
}

/**
 * Log navigation errors for analytics
 */
export function logNavigationError(
  errorType: 'not-found' | 'invalid-params' | 'server-error',
  path: string,
  additionalData?: Record<string, unknown>
): void {
  const errorData = {
    timestamp: new Date().toISOString(),
    errorType,
    path,
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server',
    referrer: typeof window !== 'undefined' ? document.referrer : 'Unknown',
    ...additionalData,
  }

  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.warn('Navigation Error:', errorData)
  }

  // In production, you might want to send this to an analytics service
  // Example: analytics.track('navigation_error', errorData)
}

/**
 * Custom hook for handling navigation errors in client components
 */
export function useNavigationErrorHandler() {
  const handleNavigationError = (error: Error, path: string) => {
    logNavigationError('server-error', path, {
      errorMessage: error.message,
      errorStack: error.stack,
    })

    // You can add additional error handling logic here
    // such as showing a toast notification or redirecting
  }

  return { handleNavigationError }
}

/**
 * Utility to check if a URL is external
 */
export function isExternalUrl(url: string): boolean {
  try {
    const urlObj = new URL(url, window.location.origin)
    return urlObj.origin !== window.location.origin
  } catch {
    // If URL parsing fails, assume it's internal
    return false
  }
}

/**
 * Safe external link handler
 */
export function handleExternalLink(url: string): void {
  if (isExternalUrl(url)) {
    // Open external links in new tab for security
    window.open(url, '_blank', 'noopener,noreferrer')
  } else {
    // Handle as internal navigation
    window.location.href = url
  }
}
