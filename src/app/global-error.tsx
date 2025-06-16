'use client'

import { useEffect } from 'react'

/**
 * Global error UI component
 * Catches errors that occur in the root layout
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global application error:', error)
  }, [error])

  return (
    <html lang="en">
      <body className="font-sans text-gray-800 bg-[#F1EBE2]">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            {/* Error Icon */}
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-red-100 rounded-full">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <title>Global Error Warning Icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl font-bold text-black mb-4">
              Application Error
            </h1>
            
            <p className="text-gray-600 mb-8">
              A critical error occurred. Please refresh the page or contact support if the problem persists.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={reset}
                className="block w-full bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 uppercase tracking-wider font-medium"
              >
                Try again
              </button>

              <button
                type="button"
                onClick={() => { window.location.href = '/' }}
                className="block w-full border-2 border-black text-black px-6 py-3 rounded-md hover:bg-black hover:text-white transition-colors duration-200 uppercase tracking-wider font-medium"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
