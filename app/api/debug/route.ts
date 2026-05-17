import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let clientCreated = false;
  let error = null;

  try {
    const client = createClient(url || "", key || "");
    clientCreated = !!client;
  } catch (err: any) {
    error = err.message;
  }

  return NextResponse.json({
    hasUrl: !!url,
    hasKey: !!key,
    urlPreview: url?.substring(0, 30),
    clientCreated,
    error,
    nodeEnv: process.env.NODE_ENV,
  });
}
