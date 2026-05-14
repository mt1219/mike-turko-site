'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, RefreshCw, ArrowLeft, Trash2, CheckCircle } from 'lucide-react';
import { supabase } from '@/src/lib/supabase';
import ReplyForm from './components/ReplyForm';

interface EmailItem {
    id: string;
    original_id: number;
    from_email: string;
    from_name: string;
    subject: string;
    message_text: string;
    received_at: Date;
    status: 'unread' | 'read' | 'replied';
    source: 'contact_form' | 'chat_bot';
}

export default function EmailAdminPage() {
    const router = useRouter();
    const [emails, setEmails] = useState<EmailItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(null);

    // Auth state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');

    useEffect(() => {
        const auth = sessionStorage.getItem('admin_emails_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            loadEmails();
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
            sessionStorage.setItem('admin_emails_auth', 'true');
            setIsAuthenticated(true);
        } else {
            setAuthError('Invalid password');
        }
    };

    const loadEmails = async () => {
        setLoading(true);
        try {
            const { data: contactMessages } = await supabase
                .from('contact_messages')
                .select('*')
                .is('deleted_at', null)
                .order('created_at', { ascending: false });

            const { data: chatMessages } = await supabase
                .from('chat_messages')
                .select('*')
                .is('deleted_at', null)
                .order('created_at', { ascending: false });

            const formattedEmails: EmailItem[] = [
                ...(contactMessages || []).map(m => ({
                    id: `contact-${m.id}`,
                    original_id: m.id,
                    from_email: m.email,
                    from_name: m.name,
                    subject: 'Contact Form Message',
                    message_text: m.message,
                    received_at: new Date(m.created_at),
                    status: m.status || 'unread',
                    source: 'contact_form' as const,
                })),
                ...(chatMessages || []).map(m => ({
                    id: `chat-${m.id}`,
                    original_id: m.id,
                    from_email: m.email,
                    from_name: 'Chat User',
                    subject: 'Chat Message',
                    message_text: m.message,
                    received_at: new Date(m.created_at),
                    status: m.status || 'unread',
                    source: 'chat_bot' as const,
                }))
            ];

            formattedEmails.sort((a, b) => b.received_at.getTime() - a.received_at.getTime());
            setEmails(formattedEmails);

            if (formattedEmails.length > 0 && !selectedEmail) {
                setSelectedEmail(formattedEmails[0]);
            }
        } catch (error) {
            console.error('Error loading emails:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (email: EmailItem) => {
        if (email.status === 'unread') {
            const table = email.source === 'contact_form' ? 'contact_messages' : 'chat_messages';

            console.log(`📝 Updating ${table} id ${email.original_id} to 'read'`);

            const { error, data } = await supabase
                .from(table)
                .update({ status: 'read' })
                .eq('id', email.original_id)
                .select();

            if (error) {
                console.error('❌ Error marking as read:', error);
            } else {
                console.log('✅ Updated:', data);

                // Update local state
                setEmails(prev => prev.map(e =>
                    e.id === email.id ? { ...e, status: 'read' as const } : e
                ));

                if (selectedEmail?.id === email.id) {
                    setSelectedEmail({ ...email, status: 'read' });
                }
            }
        }
    };

    const deleteEmail = async (email: EmailItem) => {
        if (!confirm('Delete this message?')) return;

        const table = email.source === 'contact_form' ? 'contact_messages' : 'chat_messages';
        await supabase.from(table).update({ deleted_at: new Date().toISOString() }).eq('id', email.original_id);

        setEmails(prev => prev.filter(e => e.id !== email.id));
        if (selectedEmail?.id === email.id) {
            setSelectedEmail(emails[0] || null);
        }
    };

    const handleSendReply = async (replyText: string) => {
        if (!selectedEmail) return;

        console.log("🔵 Sending reply to:", selectedEmail.from_email);
        console.log("🔵 Subject:", `Re: ${selectedEmail.subject}`);
        console.log("🔵 Message:", replyText);
        console.log("🔵 support_email_id:", selectedEmail.original_id);
        console.log("🔵 source:", selectedEmail.source);

        try {
            const response = await fetch('/admin/emails/api/reply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: selectedEmail.from_email,
                    subject: `Re: ${selectedEmail.subject}`,
                    message: replyText,
                    support_email_id: selectedEmail.original_id,
                    source: selectedEmail.source
                })
            });

            const result = await response.json();
            console.log("🔵 Response status:", response.status);
            console.log("🔵 Response body:", result);

            if (!response.ok) {
                throw new Error(result.error || `HTTP ${response.status}`);
            }

            // Update status to replied
            const table = selectedEmail.source === 'contact_form' ? 'contact_messages' : 'chat_messages';
            await supabase.from(table).update({ status: 'replied' }).eq('id', selectedEmail.original_id);

            setEmails(prev => prev.map(e =>
                e.id === selectedEmail.id ? { ...e, status: 'replied' as const } : e
            ));

            setSelectedEmail({ ...selectedEmail, status: 'replied' });
            alert('Reply sent successfully!');
        } catch (error) {
            console.error('❌ Error:', error);
            alert(`Failed to send reply: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    // Login screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="bg-gray-800 p-6 rounded-xl shadow-md w-96 border border-gray-700">
                    <h2 className="text-xl font-bold mb-4 text-white text-center">Email Admin</h2>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg mb-4 text-white"
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
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

    if (loading) {
        return <div className="p-6 text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/admin')}
                            className="text-gray-400 hover:text-white transition flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </button>
                        <h1 className="text-2xl font-bold text-white">Messages</h1>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                sessionStorage.removeItem('admin_emails_auth');
                                setIsAuthenticated(false);
                            }}
                            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                        >
                            Logout
                        </button>
                        <button
                            onClick={loadEmails}
                            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                        >
                            <RefreshCw className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Email List - Left Column */}
                    <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto">
                        {emails.map(email => (
                            <div
                                key={email.id}
                                onClick={() => {
                                    setSelectedEmail(email);
                                    markAsRead(email);
                                }}
                                className={`p-3 rounded-lg cursor-pointer transition border ${selectedEmail?.id === email.id
                                    ? 'bg-gray-700/70 border-[#00ff41]/50'
                                    : 'bg-gray-800/30 border-gray-700 hover:bg-gray-700/30'
                                    } ${email.status === 'unread' ? 'border-l-4 border-l-yellow-500' : ''}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className={`text-sm font-medium truncate ${email.status === 'unread' ? 'text-white' : 'text-gray-300'}`}>
                                                {email.from_name}
                                            </p>
                                            {email.status === 'replied' && (
                                                <CheckCircle className="h-3 w-3 text-green-400" />
                                            )}
                                        </div>
                                        <p className="text-xs truncate text-gray-500 mt-1">{email.subject}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(email.received_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteEmail(email);
                                        }}
                                        className="text-gray-500 hover:text-red-400 transition p-1"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {emails.length === 0 && (
                            <div className="p-4 text-center text-gray-500 bg-gray-800/30 rounded-xl">
                                No messages
                            </div>
                        )}
                    </div>

                    {/* Email Detail - Right Column */}
                    <div className="lg:col-span-2">
                        {selectedEmail ? (
                            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold text-white">{selectedEmail.subject}</h2>
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="text-gray-400">
                                            From: {selectedEmail.from_name} &lt;{selectedEmail.from_email}&gt;
                                        </p>
                                        <div className="flex items-center gap-2">
                                            {selectedEmail.status === 'unread' && (
                                                <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                                                    Unread
                                                </span>
                                            )}
                                            {selectedEmail.status === 'replied' && (
                                                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                                                    Replied
                                                </span>
                                            )}
                                            <button
                                                onClick={() => deleteEmail(selectedEmail)}
                                                className="text-red-400 hover:text-red-300 transition"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-700 pt-4">
                                    <p className="text-gray-300 whitespace-pre-wrap">{selectedEmail.message_text}</p>
                                </div>

                                <ReplyForm onSubmit={handleSendReply} disabled={!selectedEmail} />
                            </div>
                        ) : (
                            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-12 text-center">
                                <Mail className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-white">Select a message</h3>
                                <p className="text-gray-400">Click on a message to view and reply</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}