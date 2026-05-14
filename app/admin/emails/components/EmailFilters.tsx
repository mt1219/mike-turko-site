'use client';

import { useState } from 'react';
import { SupportEmail } from '../types';

interface EmailFiltersProps {
    emails: SupportEmail[];
    onFilterChange: (filtered: SupportEmail[]) => void;
}

export default function EmailFilters({ emails, onFilterChange }: EmailFiltersProps) {
    const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');
    const [sourceFilter, setSourceFilter] = useState<'all' | 'contact_form' | 'chat_bot'>('all');

    const applyFilters = () => {
        let filtered = [...emails];

        if (statusFilter !== 'all') {
            filtered = filtered.filter(e => e.status === statusFilter);
        }
        if (sourceFilter !== 'all') {
            filtered = filtered.filter(e => e.source === sourceFilter);
        }

        onFilterChange(filtered);
    };

    const handleFilterChange = (type: 'status' | 'source', value: string) => {
        if (type === 'status') {
            setStatusFilter(value as any);
        } else {
            setSourceFilter(value as any);
        }

        setTimeout(() => applyFilters(), 0);
    };

    return (
        <div className="space-y-3 mb-4">
            <div className="flex gap-2">
                <button
                    onClick={() => handleFilterChange('status', 'all')}
                    className={`px-3 py-1 rounded-full text-xs transition ${statusFilter === 'all' ? 'bg-[#00ff41] text-black' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                >
                    All
                </button>
                <button
                    onClick={() => handleFilterChange('status', 'unread')}
                    className={`px-3 py-1 rounded-full text-xs transition ${statusFilter === 'unread' ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                >
                    Unread
                </button>
                <button
                    onClick={() => handleFilterChange('status', 'read')}
                    className={`px-3 py-1 rounded-full text-xs transition ${statusFilter === 'read' ? 'bg-yellow-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                >
                    Read
                </button>
                <button
                    onClick={() => handleFilterChange('status', 'replied')}
                    className={`px-3 py-1 rounded-full text-xs transition ${statusFilter === 'replied' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                >
                    Replied
                </button>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => handleFilterChange('source', 'all')}
                    className={`px-3 py-1 rounded-full text-xs transition ${sourceFilter === 'all' ? 'bg-gray-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                >
                    All Sources
                </button>
                <button
                    onClick={() => handleFilterChange('source', 'contact_form')}
                    className={`px-3 py-1 rounded-full text-xs transition ${sourceFilter === 'contact_form' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                >
                    📧 Contact
                </button>
                <button
                    onClick={() => handleFilterChange('source', 'chat_bot')}
                    className={`px-3 py-1 rounded-full text-xs transition ${sourceFilter === 'chat_bot' ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                >
                    💬 Chat
                </button>
            </div>
        </div>
    );
}
