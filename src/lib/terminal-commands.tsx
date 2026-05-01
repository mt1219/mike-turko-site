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
    response: { text: 'I just like to make things — websites, illustrations, stories, coding projects — anything that starts as an idea and ends up real. A designer, developer, and casual triathlete, I approach creativity like training: with curiosity, persistence, and the occasional laugh. My projects usually mix humor, heart, and clever details—and I always try to work a dog—or some other furry friend—into the mix.' }
  },
  {
    name: 'skills',
    description: 'What I do',
    response: {
      text: (
        <div className="space-y-1">
          <div>🐕 Dog registry systems</div>
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
          <div><strong>📖 "Toby Adopts a Hooman"</strong> — Children's book coming soon</div>
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
          📧 Email: mike@worldcanineunion.org<br />
          💬 Chat: Use the chat button below<br />
          🐦 X/Twitter: @miketurko<br />
          💼 LinkedIn: /in/miketurko
        </div>
      )
    }
  },
  {
    name: 'toby',
    description: 'Who is Toby?',
    response: {
      text: '🐕 Toby is my rescue dog and the inspiration for "Toby Adopts a Hooman". He thinks he adopted me. He\'s probably right.'
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
      text: '🐕 World Canine Union is a modern dog registry platform helping breeders, owners, and canine professionals connect and manage pedigrees.'
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
  const allCommands = [...staticCommands, ...aiCommands];
  return (
    <div className="space-y-1">
      {allCommands.map(cmd => (
        <div key={cmd.name}>
          <span className="text-green-400">{cmd.name}</span>
          <span className="text-gray-500 ml-2">— {cmd.description}</span>
        </div>
      ))}
      <div className="mt-2 text-gray-500 text-xs">Tip: Type 'ask [your question]' for AI-powered answers</div>
    </div>
  );
};