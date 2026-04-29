// src/components/chat/ChatMessages.tsx
'use client';
import { useEffect, useRef } from 'react';

interface Message {
    text: string;
    isBot: boolean;
}

interface ChatMessagesProps {
    messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="p-4 space-y-4">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`flex ${msg.isBot ? '' : 'justify-end'}`}
                >
                    <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.isBot
                            ? 'rounded-tl-none bg-white border border-gray-200 text-gray-800'
                            : 'rounded-tr-none bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            }`}
                    >
                        <span className="break-words whitespace-pre-wrap">
                            {msg.text}
                        </span>
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}