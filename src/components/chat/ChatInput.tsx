// src/components/chat/ChatInput.tsx
'use client';
import { Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type ChatStep = 'welcome' | 'message' | 'email' | 'complete';

interface ChatInputProps {
    step: ChatStep;
    message: string;
    email: string;
    isSubmitting: boolean;
    onMessageChange: (value: string) => void;
    onEmailChange: (value: string) => void;
    onMessageSubmit: () => void;
    onEmailSubmit: () => void;
    onStartChat: () => void;
}

export default function ChatInput({
    step,
    message,
    email,
    isSubmitting,
    onMessageChange,
    onEmailChange,
    onMessageSubmit,
    onEmailSubmit,
    onStartChat,
}: ChatInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (step !== 'welcome' && step !== 'complete') {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [step]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (step === 'message' && message.trim()) onMessageSubmit();
            if (step === 'email' && email.trim()) onEmailSubmit();
        }
    };

    const getInputValue = () => (step === 'message' ? message : email);
    const getPlaceholder = () => {
        if (step === 'message') return 'Type your message here...';
        if (step === 'email') return 'your.email@example.com';
        return '';
    };
    const getInputType = () => (step === 'email' ? 'email' : 'text');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (step === 'message') onMessageChange(value);
        if (step === 'email') onEmailChange(value);
    };

    const isSubmitDisabled = () => {
        if (isSubmitting) return true;
        if (step === 'message') return !message.trim();
        if (step === 'email') return !email.trim();
        return true;
    };

    const handleSubmit = () => {
        if (step === 'message') onMessageSubmit();
        if (step === 'email') onEmailSubmit();
    };

    if (step === 'welcome') {
        return (
            <div className="border-t border-gray-200 p-4">
                <button
                    onClick={onStartChat}
                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 px-4 font-medium text-white hover:opacity-90 transition-colors"
                >
                    Start Conversation
                </button>
                <p className="mt-2 text-center text-xs text-gray-500">
                    I'll get back to you within 24 hours.
                </p>
            </div>
        );
    }

    return (
        <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
                <input
                    ref={inputRef}
                    type={getInputType()}
                    value={getInputValue()}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder={getPlaceholder()}
                    disabled={isSubmitting}
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
                />
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled()}
                    className="flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Send message"
                >
                    {isSubmitting ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                        <Send size={20} />
                    )}
                </button>
            </div>
            <p className="mt-2 text-center text-xs text-gray-500">
                Press Enter to send • I'll respond within 24 hours
            </p>
        </div>
    );
}