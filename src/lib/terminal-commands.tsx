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
    response: { text: `Graphic designer + full stack developer + amateur triathlete. I built a dog registry for mixed breeds (because purebreds have enough options and mutts rule), co-authored a book you're supposed to read TO your dog (yes, really), and I make websites. I have a sense of humor, slightly sarcastic, and I think dogs should be included in everything.` }
  },
  {
    name: 'skills',
    description: 'What I do',
    response: {
      text: (
        <div className="space-y-1">
          <div>💻 Full Stack Developer</div>
          <div>📚 Children\'s book publishing</div>
          <div>💻 React/Next.js development</div>
          <div>🐾 Canine technology consulting</div>
        </div>
      )
    }
  },
  {
    name: 'projects',
    description: 'Current projects',
    response: {
      text: (
        <div className="space-y-2">
          <div><strong>📖 "Toby Adopts a Hooman"</strong> — Children's book made for dogs</div>
          <div><strong>🐕 World Canine Union</strong> — Modern dog registry platform</div>
          <div><strong>💼 Freelance</strong> — Full-stack development available</div>
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
          📧 Email: use chat button or contact form<br />
          💬 Chat: Use the chat button below<br />
          🐦 X/Twitter: @miketurko<br />
          💼 LinkedIn:  ugh
        </div>
      )
    }
  },
  {
    name: 'toby',
    description: 'Who is Toby?',
    response: {
      text: '🐕 Toby is my rescue dog and the inspiration for "Toby Adopts a Hooman and World Canine Union". He thinks he adopted me. He\'s probably right.'
    }
  },
  {
    name: 'book',
    description: 'About my book',
    response: {
      text: '📖 "Toby Adopts a Hooman" — A heartwarming tale of a dog who chooses his perfect human companion. Coming soon to Amazon.'
    }
  },
  {
    name: 'wcu',
    description: 'World Canine Union',
    response: {
      text: '🐕 World Canine Union is a modern dog registry born from a simple truth: every dog deserves to be celebrated. We started with a love for those beautiful mixed breeds that don`t fit traditional categories — the dogs with mismatched ears, surprising color patterns, and personalities that defy description. Each one tells a unique story, and we wanted to create a place where those stories could shine.'
    }
  }
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
  { command: 'book', icon: '📖', label: 'Book' },
  { command: 'wcu', icon: '🐕', label: 'WCU' },
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