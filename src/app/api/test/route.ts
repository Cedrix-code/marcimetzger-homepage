import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Test API route for verifying API functionality
 * This route exists to test that valid API routes work correctly
 */

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'API route is working correctly',
    timestamp: new Date().toISOString(),
    path: request.nextUrl.pathname,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    return NextResponse.json({
      message: 'POST request received',
      timestamp: new Date().toISOString(),
      path: request.nextUrl.pathname,
      receivedData: body,
    })
  } catch {
    return NextResponse.json(
      {
        error: 'Invalid JSON',
        message: 'Request body must be valid JSON',
        timestamp: new Date().toISOString(),
      },
      { status: 400 }
    )
  }
}
