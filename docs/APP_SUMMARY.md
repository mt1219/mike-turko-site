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

=== MIKE TURKO (Personal Brand & Portfolio Site) ===

Folder: C:\Users\mturk\websites\mike-turko
URL: https://mike-turko.vercel.app
Purpose: Personal landing page, portfolio, interactive terminal
GitHub: Public repo
Deploy command: npm run deploy
Supabase: Connected (chat messages only)

--- Core Features ---

- Interactive terminal-style hero (command line interface)
- Type commands or click buttons to explore
- AI-powered answers via DeepSeek API ('ask [question]')
- Chat widget for contact messages
- Modular component structure (sections, layout, UI)

--- Terminal Commands ---

whoami - About Mike Turko
skills - Skills and expertise
projects - Current projects (book, WCU, dev)
book - "Toby Adopts a Hooman" details
wcu - World Canine Union info
contact - Email and social links
toby - Toby the rescue dog backstory
ask [q] - AI-powered answers (DeepSeek)
help - List all commands
clear - Clear terminal history

--- Visual Features ---

- ASCII art logo "TURKO" + bald head face
- Green-on-black terminal aesthetic
- Retro window controls (red/yellow/green dots)
- Mobile responsive (scales text and layout)
- Action buttons below terminal (👤 About, ⚡ Skills, 📁 Projects, etc.)
- Auto-scroll within terminal on commands

--- Tech Stack ---

- Next.js 16 (App Router)
- Tailwind CSS
- Lucide React (icons)
- DeepSeek API (AI chat)
- Vercel (hosting)
- Git (version control, public repo)

--- Component Structure ---

app/
├── page.tsx # Homepage with Hero section
├── layout.tsx # Root layout with TopBar + Footer
├── triathlon-calculator/ # Interactive calculator
├── contact/ # Contact page (placeholder)
└── api/ai/chat/route.ts # DeepSeek API endpoint

src/
├── components/
│ ├── layout/
│ │ ├── TopBar.tsx # Navigation with mobile menu
│ │ └── Footer.tsx
│ ├── sections/
│ │ ├── Hero.tsx # Terminal-style interactive hero
│ │ ├── AboutPreview.tsx # Bio section
│ │ ├── ProjectsPreview.tsx # Book + WCU cards
│ │ └── ContactPreview.tsx
│ └── ui/
│ └── PageHero.tsx # Reusable gradient hero
├── lib/
│ └── terminal-commands.tsx # Central command database
└── styles/

--- Navigation ---

Desktop: [Logo] [Triathlon Calc] [Contact] [☰]
Mobile: [Logo] [☰] → dropdown menu with all links

--- Chat System ---

- Floating chat button (bottom-right)
- Chat flow: message → email → submit
- Saves to Supabase 'chat_messages' table
- Status tracking (unread/read/replied)
- No conversation history saved (simple contact capture)

--- Additional Pages ---

/triathlon-calculator - Race time estimator (Sprint, Olympic, 70.3, Ironman)
/contact - Contact placeholder (chat recommended)

--- Environment Variables ---

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_NAME=Mike Turko
DEEPSEEK_API_KEY (for AI chat)

--- Deployment ---

vercel --prod --scope mike-elaynes-projects

Or using npm script: npm run deploy

--- To-Do / Future Enhancements ---

[ ] Add custom domain (miketurko.com)
[ ] Add book sales link
[ ] Add World Canine Union external link
[ ] Add professional photo/avatar
[ ] Expand AI capabilities (project-specific queries)
[ ] Add more terminal commands easily via config file

==================================================
