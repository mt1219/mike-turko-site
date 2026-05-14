'use client';

import { MessageSquare } from 'lucide-react';
import { EmailReply } from '../types';

interface ReplyItemProps {
    reply: EmailReply;
}

export default function ReplyItem({ reply }: ReplyItemProps) {
    return (
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-[#00ff41]" />
                <span className="text-xs text-gray-500">
                    Sent {new Date(reply.created_at).toLocaleString()}
                </span>
                <span className="text-xs text-green-400 ml-auto">{reply.current_status}</span>
            </div>
            <p className="text-gray-300 text-sm whitespace-pre-wrap">{reply.message_text}</p>
        </div>
    );
}