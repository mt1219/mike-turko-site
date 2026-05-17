// app/api/cron/daily-summary/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";
import { Resend } from "resend";

export async function GET() {
  console.log("🔵 Daily summary cron started");

  try {
    // Check environment variables
    console.log("🔑 Checking env vars...");
    console.log("  RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
    console.log("  DEEPSEEK_API_KEY exists:", !!process.env.DEEPSEEK_API_KEY);
    console.log("  ADMIN_EMAIL:", process.env.ADMIN_EMAIL || "not set");

    const adminEmail = process.env.ADMIN_EMAIL || "mturko@outlook.com";

    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Get today's date
    const today = new Date().toISOString().split("T")[0];
    console.log(`📅 Today: ${today}`);

    // Check if we already sent email today
    const { data: existingLog, error: checkError } = await supabase
      .from("daily_email_log")
      .select("id")
      .eq("sent_date", today)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("❌ Database check error:", checkError);
    }

    if (existingLog) {
      console.log("✅ Email already sent today");
      return NextResponse.json({ message: "Already sent today" });
    }

    // Get messages from last 24 hours
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    console.log(`📅 Since: ${yesterday}`);

    const { data: contactMessages, error: contactError } = await supabase
      .from("contact_messages")
      .select("*")
      .is("deleted_at", null)
      .gt("created_at", yesterday);

    const { data: chatMessages, error: chatError } = await supabase
      .from("chat_messages")
      .select("*")
      .is("deleted_at", null)
      .gt("created_at", yesterday);

    if (contactError) console.error("❌ Contact error:", contactError);
    if (chatError) console.error("❌ Chat error:", chatError);

    const contactCount = contactMessages?.length || 0;
    const chatCount = chatMessages?.length || 0;
    const totalCount = contactCount + chatCount;

    console.log(
      `📊 Stats: Contact: ${contactCount}, Chat: ${chatCount}, Total: ${totalCount}`,
    );

    // Generate AI content (skip if no messages)
    let aiContent = "";
    if (totalCount > 0) {
      if (process.env.DEEPSEEK_API_KEY) {
        try {
          const aiResponse = await fetch(
            "https://api.deepseek.com/v1/chat/completions",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
              },
              body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                  {
                    role: "system",
                    content: `Generate a short, funny one-liner about receiving ${totalCount} new message(s). Keep it under 100 characters.`,
                  },
                ],
                temperature: 0.8,
                max_tokens: 100,
              }),
            },
          );

          const aiData = await aiResponse.json();
          aiContent =
            aiData.choices?.[0]?.message?.content ||
            `🐕 ${totalCount} new message(s) waiting!`;
        } catch (aiError) {
          console.error("AI error:", aiError);
          aiContent = `🐕 ${totalCount} new message(s) waiting for you!`;
        }
      } else {
        aiContent = `🐕 ${totalCount} new message(s) waiting for you!`;
      }
    } else {
      aiContent = "😴 No new messages. Enjoy the silence!";
    }

    // Build email content
    const emailSubject = `📧 Daily Summary - ${today} | Mike Turko`;

    let emailBody = `<h1>Daily Message Summary</h1>
      <p><strong>Date:</strong> ${today}</p>
      <p>📋 Contact Form: ${contactCount} new message(s)</p>
      <p>💬 Chat Widget: ${chatCount} new message(s)</p>
      <p><strong>Total: ${totalCount} message(s)</strong></p>
      <p>💡 AI Says: "${aiContent}"</p>`;

    if (totalCount > 0) {
      emailBody += `<h3>New Messages:</h3>`;
      if (contactMessages && contactMessages.length > 0) {
        contactMessages.slice(0, 3).forEach((msg) => {
          emailBody += `<p><strong>From:</strong> ${msg.name} &lt;${msg.email}&gt;<br/><strong>Message:</strong> ${msg.message.substring(0, 100)}</p><hr/>`;
        });
      }
      if (chatMessages && chatMessages.length > 0) {
        chatMessages.slice(0, 3).forEach((msg) => {
          emailBody += `<p><strong>From:</strong> ${msg.email} (via Chat)<br/><strong>Message:</strong> ${msg.message.substring(0, 100)}</p><hr/>`;
        });
      }
      emailBody += `<p><a href="https://miketurko.com/admin/emails">→ Reply to messages here</a></p>`;
    }

    // Send email
    console.log(`📧 Sending email to: ${adminEmail}`);
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

    // Log to database
    const { error: logError } = await supabase.from("daily_email_log").insert({
      sent_date: today,
      contact_count: contactCount,
      chat_count: chatCount,
      total_count: totalCount,
      ai_content: aiContent,
      sent_at: new Date().toISOString(),
    });

    if (logError) {
      console.error("❌ Log error:", logError);
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
