// app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import Link from 'next/link';
import { Mail, MessageCircle, Settings, Send } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        contactUnread: 0,
        chatUnread: 0,
        contactTotal: 0,
        chatTotal: 0
    });
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');

    useEffect(() => {
        const auth = sessionStorage.getItem('admin_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchStats();
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

    const fetchStats = async () => {
        setLoading(true);

        const { data: contact } = await supabase.from('contact_messages').select('status');
        const { data: chat } = await supabase.from('chat_messages').select('status');

        setStats({
            contactUnread: contact?.filter(m => m.status === 'unread').length || 0,
            chatUnread: chat?.filter(m => m.status === 'unread').length || 0,
            contactTotal: contact?.length || 0,
            chatTotal: chat?.length || 0
        });

        setLoading(false);
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
                            if (e.key === 'Enter') handleLogin();
                        }}
                        autoFocus
                    />
                    {authError && <p className="text-red-400 text-sm mb-4">{authError}</p>}
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

    return (
        <div className="min-h-screen bg-gray-900 py-18">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                    <button
                        onClick={() => {
                            sessionStorage.removeItem('admin_auth');
                            setIsAuthenticated(false);
                        }}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                    >
                        Logout
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <Link href="/admin/messages?source=contact_form" className="block">
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-[#00ff41]/50 transition">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-500/20 rounded-lg">
                                    <Mail className="w-6 h-6 text-blue-400" />
                                </div>
                                <span className="text-3xl font-bold text-white">{stats.contactTotal}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-1">Contact Form</h3>
                            <p className="text-gray-400 text-sm">
                                {stats.contactUnread} unread messages
                            </p>
                        </div>
                    </Link>

                    <Link href="/admin/messages?source=chat_bot" className="block">
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-[#00ff41]/50 transition">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-green-500/20 rounded-lg">
                                    <MessageCircle className="w-6 h-6 text-green-400" />
                                </div>
                                <span className="text-3xl font-bold text-white">{stats.chatTotal}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-1">Chat Bot</h3>
                            <p className="text-gray-400 text-sm">
                                {stats.chatUnread} unread messages
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/admin/messages"
                            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                        >
                            View All Messages
                        </Link>
                        <button
                            disabled
                            className="px-4 py-2 bg-gray-700 text-gray-500 rounded-lg cursor-not-allowed"
                        >
                            Send Email (Coming Soon)
                        </button>
                        <button
                            disabled
                            className="px-4 py-2 bg-gray-700 text-gray-500 rounded-lg cursor-not-allowed"
                        >
                            Settings (Coming Soon)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}