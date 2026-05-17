import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/src/lib/supabase";

// Initialize Resend only if API key exists
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: NextRequest) {
  console.log("🔵 API route called");

  try {
    const body = await request.json();
    console.log("📦 Request body:", body);

    const { to, subject, message, support_email_id, source } = body;

    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject, message" },
        { status: 400 },
      );
    }

    // 1. Send actual email via Resend (if configured)
    let emailSent = false;
    if (resend && resendApiKey) {
      console.log(`📧 Attempting to send email to: ${to}`);

      const { data: emailData, error: emailError } = await resend.emails.send({
        from: "Mike Turko <admin@miketurko.com>", // Use Resend's test domain for now
        to: [to],
        subject: subject,
        text: `${message}\n\n--\nMike Turko\nhttps://miketurko.com`,
        html: `<div style="font-family: sans-serif; line-height: 1.6;">${message.replace(/\n/g, "<br/>")}<br/><br/><hr/><p style="font-size: 12px; color: #666;">Mike Turko<br/><a href="https://miketurko.com" style="color: #00ff41;">miketurko.com</a></p></div>`,
      });

      if (emailError) {
        console.error("❌ Resend error:", emailError);
        return NextResponse.json(
          { error: emailError.message },
          { status: 500 },
        );
      }

      console.log("✅ Email sent via Resend:", emailData?.id);
      emailSent = true;
    } else {
      console.log(
        "⚠️ Resend not configured - email not sent (only database updated)",
      );
    }

    // 2. Update status in database
    const table =
      source === "contact_form" ? "contact_messages" : "chat_messages";
    const { error: updateError } = await supabase
      .from(table)
      .update({ status: "replied" })
      .eq("id", support_email_id);

    if (updateError) {
      console.error("❌ Database update error:", updateError);
    }

    return NextResponse.json({
      success: true,
      emailSent: emailSent,
      message: emailSent
        ? "Email sent and status updated"
        : "Status updated (email not sent - configure Resend)",
    });
  } catch (error) {
    console.error("❌ API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
