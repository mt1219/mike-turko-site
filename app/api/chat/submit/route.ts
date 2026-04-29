// app/api/chat/submit/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("📨 Chat submission received:", body);

    const { message, email, source } = body;

    // Validate
    if (!message || !email) {
      console.log("❌ Missing fields:", { message: !!message, email: !!email });
      return NextResponse.json(
        { error: "Message and email are required" },
        { status: 400 },
      );
    }

    // Initialize Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Insert into Supabase
      const { error } = await supabase.from("chat_messages").insert([
        {
          message: message.trim(),
          email: email.trim(),
          source: source || "chat-widget",
          status: "unread",
        },
      ]);

      if (error) {
        console.error("❌ Supabase error:", error);
      } else {
        console.log("✅ Saved to Supabase");
      }
    } else {
      console.warn("⚠️ Supabase env vars missing - message not saved");
    }

    console.log("✅ Chat submission successful");
    return NextResponse.json({
      success: true,
      message: "Message received successfully",
    });
  } catch (error) {
    console.error("❌ Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
