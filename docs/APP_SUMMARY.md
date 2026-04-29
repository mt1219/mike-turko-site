=== MIKE + ELAYNE (Wedding & Family Gallery) ===

Folder: C:\Users\mturk\websites\mike-and-elayne
URL: https://mike-elayne.vercel.app
Purpose: Wedding photos, family gallery, life memories
GitHub: Private repo
Deploy command: npm run deploy
Supabase: Connected (703 images)

--- Features ---

- 703 optimized wedding/family photos
- Category filters (Wedding, Vacation, Family)
- Subcategory filters (Ceremony, Reception, Couple, etc.)
- Mobile-first design with hamburger menu
- Lightbox with zoom (pinch on mobile)
- ID overlay on thumbnails for categorizing
- Admin panel for deleting images
- Responsive grid (2-3-4 columns)

--- Tech Stack ---

- Next.js 16 (App Router)
- Tailwind CSS
- Supabase (Storage + Database)
- Vercel (Hosting)

==================================================

=== MIKE TURKO (Personal Bio Site) ===

Folder: C:\Users\mturk\websites\mike-turko
URL: https://mike-turko.vercel.app
Purpose: Personal bio, blog, chat contact
GitHub: Public repo
Deploy command: npm run deploy
Supabase: Connected (chat messages)

--- Features ---

- Modular homepage sections (Hero, About, Contact)
- Mobile-first hamburger menu
- Floating chat widget (fake AI style)
- Chat collects: name, email, message
- Saves messages to Supabase chat_messages table
- Status tracking (unread, read, replied)
- Responsive design (mobile + desktop)

--- Tech Stack ---

- Next.js 16 (App Router)
- Tailwind CSS
- Supabase (Database for chat)
- Lucide React (icons)
- Vercel (Hosting)

==================================================

=== DEPLOYMENT WORKFLOW (Both Sites) ===

Gallery: cd C:\Users\mturk\websites\mike-and-elayne && npm run deploy
Bio: cd C:\Users\mturk\websites\mike-turko && npm run deploy

Both use: "deploy": "dotenv -- vercel --prod" in package.json

==================================================

=== ENVIRONMENT VARIABLES (Vercel) ===

Mike + Elayne:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_SITE_NAME=Mike + Elayne

Mike Turko:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_SITE_NAME=Mike Turko

==================================================
