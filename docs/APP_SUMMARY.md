=== MIKE TURKO WEBSITE - COMPLETE SUMMARYww ===

Folder: C:\Users\mturk\websites\mike-turko
URL: https://mike-turko.vercel.app
Purpose: Personal brand / portfolio site for Mike Turko
(Graphic designer, full-stack developer, children's book author,
creator of World Canine Union dog registry)
GitHub: Public repo
Deploy command: npm run deploy
Supabase: One project (shared with mike-and-elayne gallery)

--- Core Features ---

- Terminal-style interactive hero (command line interface)
- Type anything → AI responds via DeepSeek API
- Action buttons for quick info (About, Skills, Projects, WCU, Book, Contact)
- Mobile-first responsive design
- Dark/cyber theme with green (#00ff41) accents
- Gradient backgrounds on pages (from-gray-900 via-gray-800 to-black)
- Custom font stack: Inter for body, JetBrains Mono for terminal

--- Navigation ---

Desktop visible links: Home, Triathlon Calc, Contact
Mobile/Hamburger: All links (Home, Triathlon Calc, Contact, Admin)
Logo: Neon green border "M" with glow effect
Top bar: Transparent at top, solid black on scroll

--- Pages ---

/ - Homepage with terminal hero
/triathlon-calculator - Race time estimator (Sprint, Olympic, 70.3, Ironman)
/contact - Contact page with form and chat button
/admin - Admin dashboard with stats cards
/admin/messages - View and manage contact form + chat messages
/admin/emails - Email system for replying to messages

--- Terminal Commands ---

whoami - About Mike Turko
skills - Skills and expertise (PHP/Laravel, graphic design, etc.)
projects - Current projects (Toby book, WCU, freelance)
wcu - World Canine Union details with link
book - "Toby Adopts a Hooman" book info
contact - How to reach (chat, email, X)
toby - Toby the rescue dog backstory
clear - Clear terminal history
help - List all commands

--- AI Integration ---

- DeepSeek API for intelligent responses
- Witty, slightly sarcastic personality
- Pop culture references encouraged
- System prompt customized to Mike Turko's brand
- API endpoint: /api/deepseek/route.ts

--- Chat System ---

- Floating chat button (bottom-right)
- Chat flow: message → email → submit
- Saves to Supabase 'chat_messages' table
- Status tracking (unread/read/replied)
- Honeypot protection against spam
- Admin panel to view and reply

--- Contact Form ---

- Name, email, message fields
- Saves to Supabase 'contact_messages' table
- Honeypot protection
- Dark theme matching site design
- Admin panel integration

--- Admin Panel ---

- Password protected (ADMIN_PASSWORD env variable)
- Dashboard with stats cards
- View messages from both contact form and chat
- Mark as read / replied
- Delete messages (soft delete with deleted_at)
- Filter by source (contact_form / chat_bot)
- Filter by status (unread / read / replied)

==================================================

=== EMAIL SYSTEM - CURRENT STATUS ===

Purpose: Send replies to messages from the admin panel
Status: ✅ Fully functional (sends real emails via Resend)

--- Tables ---

contact_messages - Stores contact form submissions
chat_messages - Stores chat widget submissions
email_logs - Tracks all sent replies

--- Features (Current) ---

✅ Reply to any message from admin panel
✅ Resend integration for actual email delivery
✅ Status updates (unread → read → replied)
✅ Delete messages (soft delete)
✅ Message preview with expand on click
✅ Auto-mark as read when viewing
✅ Green "replied" icon on messages
✅ Dark theme matching site design
✅ Password protected (separate session from main admin)

--- Email Flow ---

User submits message → contact_messages or chat_messages
↓
Admin views message → clicks Reply
↓
Admin types reply → sends via Resend API
↓
Email delivered to user's inbox
↓
Status updates to "replied" in database

--- API Routes ---

/admin/emails/api/reply - Sends email via Resend + updates status
/admin/emails/api/delete - Soft deletes messages

--- Components ---

EmailAdminPage - Main email interface
EmailStats - Stats cards (total, unread, replied, etc.)
EmailListItem - Individual message in list
ReplyForm - Compose reply form
ReplyItem - Display sent replies

--- Email Logging ---

email_logs table tracks:

- to_email, from_email
- subject, message_text
- resend_message_id
- support_email_id (link to original)
- source (contact_form / chat_bot)
- sent_at timestamp

==================================================

=== FUTURE EMAIL ENHANCEMENTS ===

--- Phase 1: Daily Summary Email ---

Goal: Send a daily email to Mike's inbox with summary of new messages

Features:

- Daily cron job (via Vercel Cron Jobs)
- Query new messages from last 24 hours
- Count of new contact form submissions
- Count of new chat messages
- List of senders and message previews
- Sent every morning (e.g., 8:00 AM)

--- Phase 2: AI-Powered Daily Email ---

Goal: Make the daily email fun and engaging with AI

Features:

- AI-generated quote of the day (via DeepSeek)
- Witty subject line (e.g., "🐕 You've got mail! (and Toby says hi)")
- Personalized greeting based on message count
- AI summary of message themes ("2 people asked about the book")
- Fun dog-related emojis and humor
- Optional: AI-generated action items

--- Phase 3: Incoming Email Replies (Threading) ---

Goal: Receive replies from users and link them to original conversations

Requirements:

- Resend webhook for incoming emails
- Parse "In-Reply-To" and "References" headers
- Store incoming replies in email_logs (type: 'inbound')
- Link to original support_email_id
- Show reply threads in admin panel
- Notify admin of new replies

--- Phase 4: Additional Email Features ---

- Compose new email (not just reply to existing)
- Email templates for common responses
- Send test email feature
- Mark important messages (star/folder)
- Search messages
- Export messages to CSV
- Auto-responder for common questions
- Batch reply to multiple messages

--- Phase 5: Workout Tracker Integration ---

Goal: Include daily workout in email summary

Features:

- workouts table (date, type, distance, duration, notes)
- Daily workout suggestion from AI
- Weekly workout summary
- Progress tracking

==================================================

=== TECHNICAL STACK ===

Frontend: Next.js 16 (App Router), Tailwind CSS
Backend: Supabase (PostgreSQL, Auth, Storage)
Email: Resend API
AI: DeepSeek API
Hosting: Vercel (Hobby plan)
Fonts: Inter, JetBrains Mono
Icons: Lucide React
Authentication: Password-based (sessionStorage) + API route

==================================================

=== DEPLOYMENT ===

Local: npm run dev
Production: npm run deploy (vercel --prod --scope mturko-7385)
URL: https://mike-turko.vercel.app

Environment variables required:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_SITE_NAME=Mike Turko
- ADMIN_PASSWORD (admin panel)
- RESEND_API_KEY (email sending)
- DEEPSEEK_API_KEY (AI chat)

==================================================
