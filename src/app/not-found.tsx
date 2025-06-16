import Link from 'next/link'
import type { Metadata } from 'next'
import styles from './not-found.module.css'

/**
 * Metadata for the 404 Not Found page
 */
export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found.',
  robots: {
    index: false,
    follow: false,
  },
}

/**
 * 404 Not Found page component
 * Displays when a page is not found in the App Router
 *
 * This component is automatically triggered by Next.js when:
 * - A route doesn't match any page.tsx files
 * - A dynamic route returns notFound()
 * - A middleware redirects to a non-existent route
 */
export default function NotFound() {
  const navigationSuggestions = [
    { href: '/', label: 'Home', description: 'Return to the homepage' },
    { href: '/#about', label: 'About Us', description: 'Learn more about Marci Metzger' },
    { href: '/#listings', label: 'Listings', description: 'Browse available properties' },
    { href: '/#contact', label: 'Contact', description: 'Get in touch with us' },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Error Code */}
        <div className={styles.errorCode}>
          <span className={styles.errorNumber}>404</span>
          <div className={styles.errorDivider} />
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.description}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          {/* Navigation Suggestions */}
          <div className={styles.suggestions}>
            <h2 className={styles.suggestionsTitle}>Try these instead:</h2>
            <div className={styles.suggestionsList}>
              {navigationSuggestions.map((suggestion) => (
                <Link
                  key={suggestion.href}
                  href={suggestion.href}
                  className={styles.suggestionLink}
                >
                  <span className={styles.suggestionLabel}>{suggestion.label}</span>
                  <span className={styles.suggestionDescription}>{suggestion.description}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Primary Action */}
          <Link href="/" className={styles.homeButton}>
            <span>Return Home</span>
            <svg
              className={styles.homeIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
