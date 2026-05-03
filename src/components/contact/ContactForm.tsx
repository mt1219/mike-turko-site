// src/components/contact/ContactForm.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/src/lib/supabase';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const { error } = await supabase
                .from('contact_messages')
                .insert([
                    {
                        name: formData.name.trim(),
                        email: formData.email.trim(),
                        message: formData.message.trim(),
                        status: 'unread'
                    }
                ]);

            if (error) throw error;

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Contact form error:', error);
            setStatus('error');
            setErrorMessage('Something went wrong. Please try again or use the chat button.');
        }
    };

    return (
        <div className="bg-[#0a0a0a] rounded-2xl border border-[#00ff41]/20 p-6 md:p-8">
            {status === 'success' ? (
                <div className="text-center py-8">
                    <div className="text-[#00ff41] text-4xl mb-4">✓</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400 mb-4">
                        Thanks for reaching out. I'll get back to you within 24 hours.
                    </p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="px-4 py-2 bg-[#00ff41]/10 border border-[#00ff41] rounded-lg text-[#00ff41] hover:bg-[#00ff41]/20 transition"
                    >
                        Send Another Message
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-[#00ff41] text-white transition"
                            placeholder="Your name"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-[#00ff41] text-white transition"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-[#00ff41] text-white transition resize-none"
                            placeholder="What would you like to say?"
                        />
                    </div>

                    {status === 'error' && (
                        <div className="text-red-500 text-sm text-center">{errorMessage}</div>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-3 bg-[#00ff41]/10 border border-[#00ff41] rounded-lg text-[#00ff41] font-medium hover:bg-[#00ff41]/20 transition disabled:opacity-50"
                    >
                        {status === 'loading' ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            )}
        </div>
    );
}