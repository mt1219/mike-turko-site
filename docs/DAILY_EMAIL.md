=== DAILY EMAIL SUMMARY SYSTEM - COMPLETE SUMMARY ===

Purpose: Send a daily email with new message counts, AI-generated content, and message previews

--- Cron Schedule ---

Schedule: 0 8 \* \* \* (8:00 AM UTC daily)
Execution: Vercel Cron Jobs (free tier)
Endpoint: /api/cron/daily-summary
Function: Node.js runtime (not edge)

--- What It Does ---

1. Runs once per day at 8:00 AM UTC
2. Queries contact_messages and chat_messages from last 24 hours
3. Counts new messages (contact form + chat bot)
4. Generates AI content (witty one-liner about message count)
5. Sends email to ADMIN_EMAIL via Resend
6. Logs to daily_email_log table (prevents duplicates)

--- Environment Variables Required ---

| Variable                      | Purpose               | Example Value           |
| ----------------------------- | --------------------- | ----------------------- |
| RESEND_API_KEY                | Send emails           | re_xxxxxxxxxxxx         |
| DEEPSEEK_API_KEY              | Generate AI content   | sk-xxxxxxxxxxxx         |
| ADMIN_EMAIL                   | Where to send summary | mturko@outlook.com      |
| NEXT_PUBLIC_SUPABASE_URL      | Supabase connection   | https://xxx.supabase.co |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase public key   | eyJhbGciOiJ...          |
| SUPABASE_SERVICE_ROLE_KEY     | For database inserts  | eyJhbGciOiJ...          |

--- Database Table ---

daily_email_log:
id SERIAL PRIMARY KEY
sent_date DATE NOT NULL UNIQUE
contact_count INTEGER DEFAULT 0
chat_count INTEGER DEFAULT 0
total_count INTEGER DEFAULT 0
ai_content TEXT
sent_at TIMESTAMP

RLS: Disabled (admin log table, no sensitive data)

--- Email Content ---

Subject: 📧 Daily Summary - [DATE] | Mike Turko
From: Mike Turko <mike@worldcanineunion.org>
To: ADMIN_EMAIL

Body includes:

- Date
- Contact form count
- Chat widget count
- Total messages
- AI-generated one-liner
- Message previews (first 3-5 messages)
- Reply link (https://miketurko.com/admin/emails)

--- File Location ---

app/api/cron/daily-summary/route.ts

--- Configuration Files ---

vercel.json (in project root):
{
"crons": [
{
"path": "/api/cron/daily-summary",
"schedule": "0 8 * * *"
}
]
}

--- Local Testing ---

Visit: https://miketurko.com/api/cron/daily-summary
Or trigger via Vercel dashboard → Cron Jobs → Run

--- Current Status (as of 2026-05-17) ---

✅ RESEND_API_KEY: Configured
✅ DEEPSEEK_API_KEY: Configured
✅ ADMIN_EMAIL: mturko@outlook.com
✅ Cron job: Running at 8:00 AM UTC
✅ Duplicate prevention: Working (already sent today)

--- Key Settings Summary ---

1. Resend Account: Active (from: mike@worldcanineunion.org)
2. Domain Verified: miketurko.com (for sending emails)
3. Vercel Cron: Enabled via vercel.json
4. Supabase: Connected (SELECT using anon key, INSERT via service role or RLS disabled)

==================================================
