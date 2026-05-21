// app/api/track-clicks/route.ts

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const supabase = createClient(supabaseUrl, supabaseKey);
    const clicks = await request.json();

    // Validate input
    if (!Array.isArray(clicks)) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 },
      );
    }

    // Prepare data for insertion
    const records = clicks.map((click: any) => ({
      button_name: click.button,
      page_path: click.path,
      extra_data: click.extra || {},
      screen_width: click.screenWidth,
      screen_height: click.screenHeight,
      user_agent: click.userAgent,
      referrer: click.referrer,
      created_at: click.time
        ? new Date(click.time).toISOString()
        : new Date().toISOString(),
    }));

    // Insert into button_clicks table
    const { error } = await supabase.from("button_clicks").insert(records);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: records.length });
  } catch (error) {
    console.error("Tracking API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
