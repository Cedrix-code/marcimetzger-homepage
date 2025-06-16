import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Error Handling Tests',
  description: 'Test page for verifying 404 and error handling functionality',
  robots: {
    index: false,
    follow: false,
  },
}

export default function TestErrorsPage() {
  const testCases = [
    {
      title: 'Basic 404 - Non-existent Page',
      description: 'Test a simple non-existent route',
      href: '/this-page-does-not-exist',
      type: 'link',
    },
    {
      title: 'Nested 404 - Deep Path',
      description: 'Test a deeply nested non-existent route',
      href: '/some/deep/nested/path/that/does/not/exist',
      type: 'link',
    },
    {
      title: 'File Extension 404',
      description: 'Test a route that looks like a file',
      href: '/document.pdf',
      type: 'link',
    },
    {
      title: 'Query Parameters 404',
      description: 'Test non-existent route with query parameters',
      href: '/nonexistent?param=value&another=test',
      type: 'link',
    },
    {
      title: 'Hash Fragment 404',
      description: 'Test non-existent route with hash fragment',
      href: '/nonexistent#section',
      type: 'link',
    },
    {
      title: 'Trailing Slash Test',
      description: 'Test trailing slash handling (should redirect)',
      href: '/test-errors/',
      type: 'link',
    },
    {
      title: 'API Route 404',
      description: 'Test non-existent API endpoint',
      href: '/api/nonexistent',
      type: 'api',
    },
    {
      title: 'Static Asset 404',
      description: 'Test non-existent static file',
      href: '/images/nonexistent.jpg',
      type: 'asset',
    },
  ]

  return (
    <div className="min-h-screen bg-[#F1EBE2] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#2D1810] mb-4">
            404 Error Handling Test Suite
          </h1>
          <p className="text-lg text-[#5D4037] max-w-2xl mx-auto">
            This page contains various test cases to verify that our 404 handling system
            works correctly across different scenarios. Each test should properly trigger
            the not-found.tsx component or appropriate error handling.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-[#8B5A3C] text-white rounded-md hover:bg-[#6D4428] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {testCases.map((testCase, index) => (
            <div
              key={`test-case-${testCase.href}-${index}`}
              className="p-6 bg-white/60 border border-[#E0D3CC] rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-semibold text-[#2D1810]">
                  Test {index + 1}: {testCase.title}
                </h2>
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  testCase.type === 'link' ? 'bg-blue-100 text-blue-800' :
                  testCase.type === 'api' ? 'bg-green-100 text-green-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {testCase.type.toUpperCase()}
                </span>
              </div>

              <p className="text-[#5D4037] mb-4 text-sm leading-relaxed">
                {testCase.description}
              </p>

              <div className="space-y-3">
                <div className="text-xs text-[#8B5A3C] font-mono bg-[#F1EBE2] p-2 rounded border">
                  URL: {testCase.href}
                </div>

                <Link
                  href={testCase.href}
                  className="block w-full bg-[#8B5A3C] text-white text-center px-4 py-3 rounded-md hover:bg-[#6D4428] transition-colors font-medium"
                >
                  Test This Route →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Testing Instructions */}
        <div className="mt-12 p-6 bg-white/80 border border-[#E0D3CC] rounded-lg">
          <h2 className="text-2xl font-semibold text-[#2D1810] mb-4">
            Testing Instructions
          </h2>

          <div className="space-y-4 text-[#5D4037]">
            <div>
              <h3 className="font-semibold text-[#2D1810] mb-2">What to Verify:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Each test should navigate to the custom 404 page (not-found.tsx)</li>
                <li>The 404 page should display with the warm beige background (#F1EBE2)</li>
                <li>Navigation suggestions should work correctly</li>
                <li>The &ldquo;Return Home&rdquo; button should navigate back to the homepage</li>
                <li>Browser back button should work properly</li>
                <li>Direct URL access should also trigger the 404 page</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[#2D1810] mb-2">Expected Behavior:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Page Routes:</strong> Should show the custom not-found.tsx component</li>
                <li><strong>API Routes:</strong> Should return JSON error response with 404 status</li>
                <li><strong>Static Assets:</strong> Should return 404 with appropriate headers</li>
                <li><strong>Trailing Slashes:</strong> Should redirect to non-trailing slash version</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[#2D1810] mb-2">Browser Developer Tools:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Check Network tab for proper 404 HTTP status codes</li>
                <li>Verify no JavaScript errors in Console</li>
                <li>Check that middleware logging appears in server console</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}