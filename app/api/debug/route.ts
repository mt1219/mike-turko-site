import { NextResponse } from "next/server";

export async function GET() {
  // Check what environment variables are available
  const debug = {
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    urlValue: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + "...",
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
  };

  return NextResponse.json(debug);
}
