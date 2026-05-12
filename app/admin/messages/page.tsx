// app/admin/messages/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase';

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    message: string;
    status: string;
    created_at: string;
    source: 'contact_form';
}

interface ChatMessage {
    id: number;
    email: string;
    message: string;
    status: string;
    created_at: string;
    source: 'chat_bot';
    name?: string;
}

type Message = ContactMessage | ChatMessage;

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'contact_form' | 'chat_bot'>('all');
    const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');

    // Check if already authenticated (session stored)
    useEffect(() => {
        const auth = sessionStorage.getItem('admin_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchMessages();
        }
    }, [isAuthenticated]);

    const handleLogin = async () => {
        setAuthError('');

        const response = await fetch('/api/admin/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });

        if (response.ok) {
            sessionStorage.setItem('admin_auth', 'true');
            setIsAuthenticated(true);
        } else {
            setAuthError('Invalid password');
        }
    };

    const fetchMessages = async () => {
        setLoading(true);

        const { data: contactMessages } = await supabase
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false });

        const { data: chatMessages } = await supabase
            .from('chat_messages')
            .select('*')
            .order('created_at', { ascending: false });

        const contactMsgs: ContactMessage[] = (contactMessages || []).map(m => ({
            ...m,
            source: 'contact_form' as const
        }));

        const chatMsgs: ChatMessage[] = (chatMessages || []).map(m => ({
            ...m,
            source: 'chat_bot' as const,
            name: 'Chat User'
        }));

        const combined = [...contactMsgs, ...chatMsgs];
        combined.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        setMessages(combined);
        setLoading(false);
    };

    const markAsRead = async (source: string, id: number) => {
        const table = source === 'contact_form' ? 'contact_messages' : 'chat_messages';
        await supabase.from(table).update({ status: 'read' }).eq('id', id);
        fetchMessages();
    };

    const markAsReplied = async (source: string, id: number) => {
        const table = source === 'contact_form' ? 'contact_messages' : 'chat_messages';
        await supabase.from(table).update({ status: 'replied' }).eq('id', id);
        fetchMessages();
    };

    const getFilteredMessages = () => {
        let filtered = messages;
        if (filter !== 'all') {
            filtered = filtered.filter(m => m.source === filter);
        }
        if (statusFilter !== 'all') {
            filtered = filtered.filter(m => m.status === statusFilter);
        }
        return filtered;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'unread': return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'read': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'replied': return 'bg-green-500/20 text-green-400 border-green-500/30';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };

    const getDisplayName = (msg: Message) => {
        if (msg.source === 'contact_form') {
            return msg.name;
        }
        return 'Chat User';
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="bg-gray-800 p-6 rounded-xl shadow-md w-96 border border-gray-700">
                    <h2 className="text-xl font-bold mb-4 text-white">Admin Access</h2>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg mb-4 text-white"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleLogin();
                            }
                        }}
                        autoFocus
                    />
                    {authError && (
                        <p className="text-red-400 text-sm mb-4">{authError}</p>
                    )}
                    <button
                        onClick={handleLogin}
                        className="w-full bg-[#00ff41] text-black py-2 rounded-lg font-semibold hover:bg-[#00cc33] transition"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    const filteredMessages = getFilteredMessages();
    const unreadCount = messages.filter(m => m.status === 'unread').length;

    return (
        <div className="min-h-screen bg-gray-900 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Messages</h1>
                        <p className="text-gray-400 mt-1">
                            {unreadCount} unread {unreadCount === 1 ? 'message' : 'messages'}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                sessionStorage.removeItem('admin_auth');
                                setIsAuthenticated(false);
                            }}
                            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                        >
                            Logout
                        </button>
                        <button
                            onClick={fetchMessages}
                            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                        >
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-6">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg transition ${filter === 'all' ? 'bg-[#00ff41] text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        All Sources
                    </button>
                    <button
                        onClick={() => setFilter('contact_form')}
                        className={`px-4 py-2 rounded-lg transition ${filter === 'contact_form' ? 'bg-[#00ff41] text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        📧 Contact Form
                    </button>
                    <button
                        onClick={() => setFilter('chat_bot')}
                        className={`px-4 py-2 rounded-lg transition ${filter === 'chat_bot' ? 'bg-[#00ff41] text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        💬 Chat Bot
                    </button>

                    <div className="w-px h-8 bg-gray-700 mx-2" />

                    <button
                        onClick={() => setStatusFilter('all')}
                        className={`px-4 py-2 rounded-lg transition ${statusFilter === 'all' ? 'bg-gray-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        All Status
                    </button>
                    <button
                        onClick={() => setStatusFilter('unread')}
                        className={`px-4 py-2 rounded-lg transition ${statusFilter === 'unread' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        Unread
                    </button>
                </div>

                {/* Messages List */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-pulse text-gray-500">Loading messages...</div>
                    </div>
                ) : filteredMessages.length === 0 ? (
                    <div className="text-center py-20 bg-gray-800/50 rounded-xl">
                        <p className="text-gray-500">No messages found</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredMessages.map((msg) => (
                            <div
                                key={`${msg.source}-${msg.id}`}
                                className={`bg-gray-800/50 rounded-xl border p-5 transition ${msg.status === 'unread' ? 'border-[#00ff41]/50 shadow-lg shadow-[#00ff41]/5' : 'border-gray-700'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <span className="text-sm font-mono text-gray-400">#{msg.id}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(msg.status)}`}>
                                            {msg.status}
                                        </span>
                                        <span className="px-2 py-1 rounded-full text-xs bg-gray-700 text-gray-300">
                                            {msg.source === 'contact_form' ? '📧 Contact Form' : '💬 Chat Bot'}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {new Date(msg.created_at).toLocaleString()}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <p className="text-white font-medium">
                                        {getDisplayName(msg)}
                                    </p>
                                    <p className="text-[#00ff41] text-sm">
                                        {msg.email}
                                    </p>
                                </div>

                                <div className="bg-gray-900/50 rounded-lg p-3 mb-4">
                                    <p className="text-gray-300 whitespace-pre-wrap">
                                        {msg.message}
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    {msg.status !== 'read' && (
                                        <button
                                            onClick={() => markAsRead(msg.source, msg.id)}
                                            className="text-sm text-blue-400 hover:text-blue-300 transition"
                                        >
                                            Mark Read
                                        </button>
                                    )}
                                    {msg.status !== 'replied' && (
                                        <button
                                            onClick={() => markAsReplied(msg.source, msg.id)}
                                            className="text-sm text-green-400 hover:text-green-300 transition"
                                        >
                                            Mark Replied
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}