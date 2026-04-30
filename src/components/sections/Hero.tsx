// src/components/sections/Hero.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';
import { staticCommands, aiCommands, actionButtons, generateHelpResponse } from '@/src/lib/terminal-commands';

interface HistoryItem {
    input: string;
    output: string | React.ReactNode;
}

export default function Hero() {
    const [inputValue, setInputValue] = useState('');
    const [history, setHistory] = useState<HistoryItem[]>([
        { input: 'whoami', output: staticCommands.find(c => c.name === 'whoami')?.response.text || '' },
        { input: 'skills', output: staticCommands.find(c => c.name === 'skills')?.response.text || '' }
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

    const handleCommand = async (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();

        if (trimmedCmd === 'clear') {
            setHistory([]);
            setInputValue('');
            return;
        }

        if (trimmedCmd === 'help') {
            setHistory(prev => [...prev, {
                input: cmd,
                output: generateHelpResponse()
            }]);
            setInputValue('');
            return;
        }

        const staticCmd = staticCommands.find(c =>
            c.name === trimmedCmd || c.aliases?.includes(trimmedCmd)
        );

        if (staticCmd) {
            setHistory(prev => [...prev, {
                input: cmd,
                output: staticCmd.response.text
            }]);
            setInputValue('');
            return;
        }

        if (trimmedCmd.startsWith('ask ')) {
            setIsProcessing(true);
            const question = trimmedCmd.substring(4);

            setHistory(prev => [...prev, { input: cmd, output: '🤔 Thinking...' }]);
            setInputValue('');
            scrollToBottom();

            try {
                const response = await fetch('/api/ai/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: question })
                });

                const data = await response.json();

                setHistory(prev => {
                    const newHistory = [...prev];
                    newHistory[newHistory.length - 1] = {
                        input: cmd,
                        output: data.response || 'Sorry, I had trouble processing that.'
                    };
                    return newHistory;
                });
            } catch (error) {
                setHistory(prev => {
                    const newHistory = [...prev];
                    newHistory[newHistory.length - 1] = {
                        input: cmd,
                        output: '⚠️ AI service unavailable. Please try again.'
                    };
                    return newHistory;
                });
            } finally {
                setIsProcessing(false);
            }
            return;
        }

        setHistory(prev => [...prev, {
            input: cmd,
            output: `Command not found: "${cmd}". Type 'help' for available commands.`
        }]);
        setInputValue('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() && !isProcessing) {
            handleCommand(inputValue);
        }
    };

    const asciiArt = `████████╗██╗   ██╗██████╗ ██╗  ██╗ ██████╗ 
╚══██╔══╝██║   ██║██╔══██╗██║ ██╔╝██╔═══██╗
   ██║   ██║   ██║██████╔╝█████╔╝ ██║   ██║
   ██║   ██║   ██║██╔══██╗██╔═██╗ ██║   ██║
   ██║   ╚██████╔╝██║  ██║██║  ██╗╚██████╔╝
   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ `;

    return (
        <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8 sm:py-16">
            <div className="container mx-auto px-2 sm:px-4 max-w-5xl mt-10">
                <div className="mx-auto w-full max-w-[95vw] sm:max-w-full">


                    <div className="bg-black/90 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden backdrop-blur-sm">

                        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800 border-b border-gray-700">
                            <div className="flex space-x-1.5 sm:space-x-2">
                                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-400 text-[10px] sm:text-sm">
                                <Terminal size={12} className="sm:w-4 sm:h-4" />
                                <span>mike@turko:~</span>
                            </div>
                            <div className="w-8 sm:w-16"></div>
                        </div>

                        <div
                            ref={terminalBodyRef}
                            className="p-3 sm:p-6 font-mono text-[10px] sm:text-xs md:text-sm h-[450px] overflow-y-auto pt-6 sm:pt-8"
                            onClick={() => inputRef.current?.focus()}
                        >
                            <pre className="text-green-400 text-[8px] sm:text-xs md:text-sm mb-6 leading-tight overflow-x-auto whitespace-pre-wrap">
                                {asciiArt}
                            </pre>

                            <div className="space-y-3 text-gray-300">
                                {history.map((item, idx) => (
                                    <div key={idx}>
                                        <div className="flex items-center text-green-400">
                                            <span className="mr-2">$</span>
                                            <span>{item.input}</span>
                                        </div>
                                        <div className="ml-4 text-gray-300 mt-1">
                                            {typeof item.output === 'string' ? item.output : item.output}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleSubmit} className="mt-3 flex items-center">
                                <span className="text-green-400 mr-2">$</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="flex-1 bg-transparent outline-none text-gray-300 font-mono text-[10px] sm:text-xs md:text-sm"
                                    autoFocus
                                    spellCheck={false}
                                    disabled={isProcessing}
                                />
                            </form>

                            <div ref={terminalEndRef} />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                    {actionButtons.map((btn) => (
                        <button
                            key={btn.command}
                            onClick={() => handleCommand(btn.command)}
                            disabled={isProcessing}
                            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-xs sm:text-sm text-gray-300 transition flex items-center gap-1.5 disabled:opacity-50"
                        >
                            <span className="text-base sm:text-lg">{btn.icon}</span>
                            <span>{btn.label}</span>
                        </button>
                    ))}
                </div>

                <p className="text-center text-gray-500 text-[10px] sm:text-xs mt-4">
                    💡 Type <span className="text-green-400">'ask [your question]'</span> for AI-powered answers
                </p>
            </div>
        </section>
    );
}