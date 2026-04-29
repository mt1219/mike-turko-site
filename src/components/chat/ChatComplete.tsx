// src/components/chat/ChatComplete.tsx
'use client';
import { CheckCircle, Mail } from 'lucide-react';

interface ChatCompleteProps {
    onNewChat: () => void;
}

export default function ChatComplete({ onNewChat }: ChatCompleteProps) {
    return (
        <div className="border-t border-gray-200 p-6 text-center">
            <CheckCircle className="mx-auto mb-3 text-green-500" size={48} />
            <h4 className="mb-2 font-semibold text-gray-800">Message Sent Successfully!</h4>
            <p className="mb-4 text-gray-600">
                Thanks for reaching out! I'll review your message and respond within 24 hours.
            </p>

            <button
                onClick={onNewChat}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 px-6 font-medium text-white hover:opacity-90 transition-colors"
            >
                Start New Conversation
            </button>

            <p className="mt-4 text-xs text-gray-500">
                Thank you for reaching out!
            </p>
        </div>
    );
}
