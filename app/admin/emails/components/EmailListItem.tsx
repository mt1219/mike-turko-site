'use client';

import { Mail, MessageCircle, CheckCircle } from 'lucide-react';
import { SupportEmail } from '../types';

interface EmailListItemProps {
    email: SupportEmail;
    isSelected: boolean;
    onClick: () => void;
}

export default function EmailListItem({ email, isSelected, onClick }: EmailListItemProps) {
    const getSourceIcon = () => {
        if (email.source === 'contact_form') {
            return <Mail className="h-4 w-4 text-blue-400" />;
        }
        return <MessageCircle className="h-4 w-4 text-purple-400" />;
    };

    const getStatusBadge = () => {
        switch (email.status) {
            case 'unread':
                return <span className="w-2 h-2 rounded-full bg-red-500 ml-2"></span>;
            case 'replied':
                return <CheckCircle className="h-3 w-3 text-green-400 ml-2" />;
            default:
                return null;
        }
    };

    return (
        <div
            onClick={onClick}
            className={`p-3 rounded-lg cursor-pointer transition border ${isSelected
                    ? 'bg-gray-700/50 border-[#00ff41]/50'
                    : 'bg-gray-800/30 border-gray-700 hover:bg-gray-700/30'
                } ${email.status === 'unread' ? 'border-l-4 border-l-red-500' : ''}`}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                        {getSourceIcon()}
                        <p className={`ml-2 text-sm font-medium truncate ${email.status === 'unread' ? 'text-white' : 'text-gray-300'}`}>
                            {email.from_name}
                        </p>
                        {getStatusBadge()}
                    </div>
                    <p className={`text-xs truncate mt-1 ${email.status === 'unread' ? 'text-gray-300' : 'text-gray-500'}`}>
                        {email.subject}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        {new Date(email.received_at).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}