/**
 * Loading UI component for the application
 * Displays while pages are loading
 */
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1EBE2]">
      <div className="text-center">
        {/* Loading Spinner */}
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"/>
          <div className="absolute inset-0 border-4 border-black border-t-transparent rounded-full animate-spin"/>
        </div>
        
        {/* Loading Text */}
        <p className="text-black font-light text-lg uppercase tracking-wider">
          Loading...
        </p>
      </div>
    </div>
  )
}
