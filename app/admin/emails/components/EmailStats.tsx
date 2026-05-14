'use client';

import { SupportEmail } from '../types';

interface EmailStatsProps {
    emails: SupportEmail[];
}

export default function EmailStats({ emails }: EmailStatsProps) {
    const total = emails.length;
    const unread = emails.filter(e => e.status === 'unread').length;
    const replied = emails.filter(e => e.status === 'replied').length;
    const contactForm = emails.filter(e => e.source === 'contact_form').length;
    const chatBot = emails.filter(e => e.source === 'chat_bot').length;

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4">
                <p className="text-gray-400 text-sm">Total</p>
                <p className="text-2xl font-bold text-white">{total}</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4">
                <p className="text-gray-400 text-sm">Unread</p>
                <p className="text-2xl font-bold text-red-400">{unread}</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4">
                <p className="text-gray-400 text-sm">Replied</p>
                <p className="text-2xl font-bold text-green-400">{replied}</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4">
                <p className="text-gray-400 text-sm">Contact Form</p>
                <p className="text-2xl font-bold text-blue-400">{contactForm}</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4">
                <p className="text-gray-400 text-sm">Chat Bot</p>
                <p className="text-2xl font-bold text-purple-400">{chatBot}</p>
            </div>
        </div>
    );
}