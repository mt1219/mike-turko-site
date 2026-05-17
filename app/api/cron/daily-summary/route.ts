// app/api/cron/daily-summary/route.ts
import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/src/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  console.log("🔵 Daily summary cron started");

  try {
    const adminEmail = process.env.ADMIN_EMAIL || "mturko@outlook.com";

    // Get today's date
    const today = new Date().toISOString().split("T")[0];

    // Get messages from last 24 hours (using regular client for SELECT)
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data: contactMessages } = await supabase
      .from("contact_messages")
      .select("*")
      .is("deleted_at", null)
      .gt("created_at", yesterday);

    const { data: chatMessages } = await supabase
      .from("chat_messages")
      .select("*")
      .is("deleted_at", null)
      .gt("created_at", yesterday);

    const contactCount = contactMessages?.length || 0;
    const chatCount = chatMessages?.length || 0;
    const totalCount = contactCount + chatCount;

    console.log(
      `📊 Stats: Contact: ${contactCount}, Chat: ${chatCount}, Total: ${totalCount}`,
    );

    // Generate AI content
    let aiContent = "";
    if (totalCount > 0) {
      aiContent = `🐕 ${totalCount} new message(s) waiting for you!`;
    } else {
      aiContent = "😴 No new messages. Enjoy the silence!";
    }

    // Build and send email (same as before)
    const emailSubject = `📧 Daily Summary - ${today} | Mike Turko`;
    const emailBody = `<h1>Daily Message Summary</h1>
      <p><strong>Date:</strong> ${today}</p>
      <p>📋 Contact Form: ${contactCount} new message(s)</p>
      <p>💬 Chat Widget: ${chatCount} new message(s)</p>
      <p><strong>Total: ${totalCount} message(s)</strong></p>
      <p>💡 AI Says: "${aiContent}"</p>`;

    // Send email
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "Mike Turko <admin@miketurko.com>",
      to: [adminEmail],
      subject: emailSubject,
      html: emailBody,
    });

    if (emailError) {
      console.error("❌ Resend error:", emailError);
      throw new Error(emailError.message);
    }

    console.log("✅ Email sent:", emailData?.id);

    // ✅ Log to database using supabaseAdmin (bypasses RLS)
    const { error: logError } = await supabaseAdmin
      .from("daily_email_log")
      .insert({
        sent_date: today,
        contact_count: contactCount,
        chat_count: chatCount,
        total_count: totalCount,
        ai_content: aiContent,
        sent_at: new Date().toISOString(),
      });

    if (logError) {
      console.error("❌ Log error:", logError);
    } else {
      console.log("✅ Logged to database");
    }

    return NextResponse.json({
      success: true,
      message: "Daily summary sent",
      stats: { contactCount, chatCount, totalCount },
    });
  } catch (error) {
    console.error("❌ Cron error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to send daily summary",
      },
      { status: 500 },
    );
  }
}
