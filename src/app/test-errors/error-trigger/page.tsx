'use client'

import { useEffect } from 'react'

export default function ErrorTriggerPage() {
  useEffect(() => {
    // Deliberately throw an error to trigger the error boundary
    throw new Error('This is a deliberate error to test error handling')
  }, [])

  // This won't render due to the error, but is needed for the component
  return <div>This page intentionally throws an error</div>
}