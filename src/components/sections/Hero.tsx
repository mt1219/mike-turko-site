// src/components/sections/Hero.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';
import { staticCommands, actionButtons, generateHelpResponse } from '@/src/lib/terminal-commands';

interface HistoryItem {
    input: string;
    output: string | React.ReactNode;
}

export default function Hero() {
    const [inputValue, setInputValue] = useState('');
    //const [history, setHistory] = useState<HistoryItem[]>([]); // Start empty
    const [history, setHistory] = useState<HistoryItem[]>([
        {
            input: 'whoami',
            output: staticCommands.find(c => c.name === 'whoami')?.response.text || ''
        },

    ]);
    const [isProcessing, setIsProcessing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalEndRef = useRef<HTMLDivElement>(null);
    const terminalBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [history]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const scrollToBottom = () => {
        setTimeout(() => {
            terminalEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 10);
    };

    // Handle button clicks (static commands)
    const handleButtonClick = async (command: string) => {
        // Blur the input to dismiss keyboard
        inputRef.current?.blur();

        if (command === 'clear') {
            setHistory([]);
            setInputValue('');
            return;
        }

        if (command === 'help') {
            setHistory(prev => [...prev, {
                input: command,
                output: generateHelpResponse()
            }]);
            setInputValue('');
            return;
        }

        const staticCmd = staticCommands.find(c => c.name === command);
        if (staticCmd) {
            setHistory(prev => [...prev, {
                input: command,
                output: staticCmd.response.text
            }]);
        }
        setInputValue('');
    };

    // Handle user typing (anything = AI)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const question = inputValue.trim();
        if (!question || isProcessing) return;

        setIsProcessing(true);
        setHistory(prev => [...prev, { input: question, output: '🤔 Thinking...' }]);
        setInputValue('');
        scrollToBottom();

        try {
            const response = await fetch('/api/deepseek', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: question })
            });

            const data = await response.json();

            setHistory(prev => {
                const newHistory = [...prev];
                newHistory[newHistory.length - 1] = {
                    input: question,
                    output: data.response || 'Sorry, I had trouble processing that.'
                };
                return newHistory;
            });
        } catch (error) {
            setHistory(prev => {
                const newHistory = [...prev];
                newHistory[newHistory.length - 1] = {
                    input: question,
                    output: '⚠️ AI service unavailable. Please try again.'
                };
                return newHistory;
            });
        } finally {
            setIsProcessing(false);
            scrollToBottom();
        }
    };

    const asciiArt = `████████╗██╗   ██╗██████╗ ██╗  ██╗ ██████╗ 
╚══██╔══╝██║   ██║██╔══██╗██║ ██╔╝██╔═══██╗
   ██║   ██║   ██║██████╔╝█████╔╝ ██║   ██║
   ██║   ██║   ██║██╔══██╗██╔═██╗ ██║   ██║
   ██║   ╚██████╔╝██║  ██║██║  ██╗╚██████╔╝
   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ `;

    return (
        <section className="min-h-screen flex justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-16 md:pt-20">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
            <div className="hero-terminal container mx-auto px-2 sm:px-4 max-w-5xl mt-0 text-sm sm:text-base">
                <div className="mx-auto w-full max-w-[95vw] sm:max-w-full">

                    <div className="bg-black/90 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden backdrop-blur-sm">

                        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0a0a0a] border-b border-[#00ff41]/20">
                            <div className="flex space-x-1.5 sm:space-x-2">
                                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]"></div>
                                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]"></div>
                                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]"></div>
                            </div>
                            <div className="flex items-center space-x-2 text-[#00ff41] text-[10px] sm:text-sm">
                                <Terminal size={12} className="sm:w-4 sm:h-4" />
                                <span className="green-glow">mike@turko:~/portfolio$</span>
                            </div>
                            <div className="w-8 sm:w-16"></div>
                        </div>

                        <div
                            ref={terminalBodyRef}
                            className="p-3 sm:p-6 font-mono h-[450px] overflow-y-auto pt-6 sm:pt-8"
                            onClick={() => inputRef.current?.focus()}
                        >
                            <pre className="text-green-400 text-[9px] sm:text-xs md:text-sm mb-6 leading-tight overflow-x-auto whitespace-pre-wrap">
                                {asciiArt}
                            </pre>

                            <div className="space-y-3 text-gray-300">
                                {history.map((item, idx) => (
                                    <div key={idx}>
                                        <div className="flex items-center text-green-400">
                                            <span className="text-[#00ff41] mr-2 green-glow">$</span>
                                            <span>{item.input}</span>
                                        </div>
                                        <div className="ml-4 text-gray-300 mt-1">
                                            {typeof item.output === 'string' ? item.output : item.output}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleSubmit} className="mt-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-400 mr-2">$</span>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className="flex-1 bg-transparent outline-none text-[#00ff41] font-mono"
                                        autoFocus
                                        spellCheck={false}
                                        disabled={isProcessing}
                                        placeholder={isProcessing ? "Thinking..." : "Ask me anything..."}
                                    />
                                    <button
                                        type="submit"
                                        disabled={!inputValue.trim() || isProcessing}
                                        className="px-3 py-1.5 bg-[#00ff41]/10 border border-[#00ff41] rounded-lg text-[#00ff41] text-xs hover:bg-[#00ff41]/20 transition disabled:opacity-50"
                                    >
                                        Send
                                    </button>
                                </div>
                            </form>

                            <div ref={terminalEndRef} />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                    {actionButtons.map((btn) => (
                        <button
                            key={btn.command}
                            onClick={() => handleButtonClick(btn.command)}
                            disabled={isProcessing}
                            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-300 transition flex items-center gap-1.5 disabled:opacity-50"
                        >
                            <span className="text-base sm:text-lg">{btn.icon}</span>
                            <span>{btn.label}</span>
                        </button>
                    ))}
                </div>

                <p className="text-center text-gray-500 mt-4">
                    💡 Ask anything • Click buttons for quick info
                </p>
            </div>
        </section>
    );
}