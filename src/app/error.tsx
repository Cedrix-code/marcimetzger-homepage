'use client'

import { useEffect } from 'react'

/**
 * Error UI component for the application
 * Displays when an error occurs in the app
 */
export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1EBE2] px-4">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-red-100 rounded-full">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <title>Error Warning Icon</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h2 className="text-2xl font-bold text-black mb-4">
          Something went wrong!
        </h2>
        
        <p className="text-gray-600 mb-6">
          We apologize for the inconvenience. An error occurred while loading the page.
        </p>

        {/* Retry Button */}
        <button
          type="button"
          onClick={reset}
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 uppercase tracking-wider font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
