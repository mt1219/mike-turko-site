'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

interface ReplyFormProps {
    onSubmit: (replyText: string) => Promise<void>;
    disabled?: boolean;
}

export default function ReplyForm({ onSubmit, disabled }: ReplyFormProps) {
    const [replyText, setReplyText] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        setIsSending(true);
        try {
            await onSubmit(replyText);
            setReplyText('');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border-t pt-6">
            <h3 className="font-semibold text-white mb-3">Reply</h3>
            <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply here..."
                rows={6}
                disabled={disabled || isSending}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00ff41] resize-none"
            />
            <div className="flex justify-end mt-3">
                <button
                    type="submit"
                    disabled={disabled || isSending || !replyText.trim()}
                    className="flex items-center gap-2 px-4 py-2 bg-[#00ff41] text-black rounded-lg font-semibold hover:bg-[#00cc33] transition disabled:opacity-50"
                >
                    <Send className="h-4 w-4" />
                    {isSending ? 'Sending...' : 'Send Reply'}
                </button>
            </div>
        </form>
    );
}