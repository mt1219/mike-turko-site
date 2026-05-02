// src/lib/terminal-commands.ts

export interface CommandResponse {
  text: string | React.ReactNode;
  ai?: boolean;  // If true, will call AI API
  requiresApiKey?: boolean;
}

export interface Command {
  name: string;
  description: string;
  response: CommandResponse;
  aliases?: string[];
}

// Static command responses (update these easily)
export const staticCommands: Command[] = [
  {
    name: 'whoami',
    description: 'About me',
    response: { text: `Graphic designer + full stack developer + amateur triathlete. I built a dog registry for mixed breeds (because purebreds have enough options and mutts rule), co-authored and illustrated a book you're supposed to read TO your dog (yes, really), and I make websites.` }
  },
  {
    name: 'skills',
    description: 'What I do (allegedly)',
    response: {
      text: (
        <div className="space-y-1">
          <div>⚡ <span className="text-[#00ff41]">Full Stack Development</span> — Public platforms (WCU) + personal tools (bookkeeping, memory bank, admin systems)</div>
          <div>🎨 Graphic Design — Making things look good since before Canva existed</div>
          <div>🖥️ HTML/CSS/Tailwind — Hand-coded, responsive, no framework drama</div>
          <div>🤖 AI Integration — DeepSeek API. JavaScript? Barely. Let the AI do the work.</div>
          <div>🏊‍♂️🚴‍♂️🏃‍♂️ Triathlete — Podium? Never heard of her. Finish line? Yes.</div>
          <div>☕ Professional Coffee Drinker — The real expertise</div>
          <div className="text-gray-500 text-xs mt-2">⚠️ Next.js/React? I use it when I have to. This site is the exception, not the rule.</div>
        </div>
      )
    }
  },
  {
    name: 'projects',
    description: 'Current projects',
    response: {
      text: (
        <div className="space-y-3">
          <div>
            📖 <span className="text-[#00ff41] font-bold">"Toby Adopts a Hooman"</span>
            <br />
            A first-of-its-kind storytime book made for dogs and their humans. Read it TO your dog. Yes, really.
            <br />
            🔗 <a href="https://tobythestorydog.com" target="_blank" rel="noopener noreferrer" className="text-[#00ff41] hover:underline">tobythestorydog.com →</a>
          </div>
          <div>
            🐕 <span className="text-[#00ff41] font-bold">World Canine Union</span>
            <br />
            A modern dog registry celebrating mixed breeds and rescues. Every dog deserves to be celebrated.
            <br />
            🔗 <a href="https://worldcanineunion.org" target="_blank" rel="noopener noreferrer" className="text-[#00ff41] hover:underline">worldcanineunion.org →</a>
          </div>
          <div>
            💼 <span className="text-[#00ff41] font-bold">Freelance Development</span>
            <br />
            Laravel, PHP, custom web applications. Available for hire — let's build something.
            <br />
            📧 Use the chat button to reach me.
          </div>
        </div>
      )
    }
  },
  {
    name: 'contact',
    description: 'How to reach me',
    response: {
      text: (
        <div>
          💬 Chat: Use the button below — I actually respond<br />
          📧 Email: Nice try, bots. Not today. (Use chat or contact  instead)<br />
          🐦 X/Twitter: @miketurko<br />
          💼 LinkedIn: I'd rather swim with jellyfish. Literally. I'm a triathlete.
        </div>
      )
    }
  },
  {
    name: 'toby',
    description: 'Who is Toby?',
    response: {
      text: '🐕 Toby is our rescue dog and the inspiration for "Toby Adopts a Hooman and World Canine Union". He thinks he adopted me. He\'s probably right.'
    }
  },
  {
    name: 'book',
    description: 'About my book',
    response: {
      text: (
        <div>
          📖 <span className="text-[#00ff41] font-bold">"Toby Adopts a Hooman"</span><br />
          A first-of-its-kind storytime book made for dogs and their humans.
          Toby is a scruffy stray with a heart-shaped patch — and one big dream: to find a human who truly gets him.
          Not just any human, but one who loves long walks, playful games, and belly rubs!
          <br /><br />
          🔗 <a href="https://tobythestorydog.com" target="_blank" rel="noopener noreferrer" className="text-[#00ff41] hover:underline">Learn more about Toby →</a>
        </div>
      )
    }
  },
  {
    name: 'wcu',
    description: 'World Canine Union',
    response: {
      text: (
        <div>
          🐕 <span className="text-[#00ff41] font-bold">World Canine Union</span><br />
          A modern dog registry born from a simple truth: every dog deserves to be celebrated.
          We started with a love for those beautiful mixed breeds that don't fit traditional categories
          — the dogs with mismatched ears, surprising color patterns, and personalities that defy description.
          Each one tells a unique story, and we wanted to create a place where those stories could shine.
          <br /><br />
          🔗 <a href="https://worldcanineunion.org" target="_blank" rel="noopener noreferrer" className="text-[#00ff41] hover:underline">Visit World Canine Union →</a>
        </div>
      )
    }
  },
];

// AI-ready commands (will call DeepSeek API)
export const aiCommands: Command[] = [
  {
    name: 'ask',
    description: 'Ask me anything (AI-powered)',
    response: { text: '', ai: true }
  },
  {
    name: 'explain',
    description: 'Get detailed explanation (AI)',
    response: { text: '', ai: true }
  }
];

// Action buttons for quick access
export const actionButtons = [
  { command: 'whoami', icon: '👤', label: 'About' },
  { command: 'skills', icon: '⚡', label: 'Skills' },
  { command: 'projects', icon: '📁', label: 'Projects' },
  { command: 'wcu', icon: '🐕', label: 'WCU' },
  { command: 'book', icon: '📖', label: 'Book' },
  { command: 'contact', icon: '📧', label: 'Contact' },
  { command: 'clear', icon: '🗑️', label: 'Clear' },
  { command: 'help', icon: '❓', label: 'Help' }
];

// Help command content (auto-generated from commands)
export const generateHelpResponse = () => {
  return (
    <div className="space-y-2">
      <div className="text-yellow-400 text-sm font-bold">🤖 How to use this terminal:</div>

      <div className="text-gray-300 text-xs space-y-1">
        <div>• <span className="text-green-400">Type anything</span> — My AI assistant will respond naturally</div>
        <div>• <span className="text-green-400">Click any button below</span> — Get quick answers about me, my skills, projects, book, or dog registry</div>
        <div>• <span className="text-green-400">Clear button</span> — Wipes the screen clean</div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-700">
        <div className="text-gray-400 text-xs">
          💡 Just start typing. Try: <span className="text-green-300">"What do you do?"</span>
        </div>
      </div>
    </div>
  );
};