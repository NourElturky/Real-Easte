import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, password } = data;
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    
    // Make direct request to the Laravel API login endpoint
    const response = await fetch(`${baseUrl}/api/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    
    // Get the raw response
    const responseData = await response.json();
    
    // Return the raw response
    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      data: responseData,
    });
  } catch (error) {
    console.error('Test auth error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
