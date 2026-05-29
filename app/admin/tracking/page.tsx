'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import DateSelector from './components/DateSelector';
import SummaryCards from './components/SummaryCards';
import DailyTrend from './components/DailyTrend';
import ButtonTable from './components/ButtonTable';
import PageTable from './components/PageTable';

export default function MikeTrackingPage() {
    const [days, setDays] = useState(30);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');

    // Check auth on mount
    useEffect(() => {
        const auth = localStorage.getItem('admin_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    // Fetch data when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [days, isAuthenticated]);

    const handleLogin = async () => {
        setAuthError('');
        const response = await fetch('/api/admin/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });

        if (response.ok) {
            localStorage.setItem('admin_auth', 'true');
            setIsAuthenticated(true);
        } else {
            setAuthError('Invalid password');
        }
    };

    const fetchData = async () => {
        setLoading(true);
        const res = await fetch(`/api/mike-tracking?days=${days}`);
        const { clicks } = await res.json();

        // Separate page views from button clicks
        const pageViewsData = clicks?.filter((c: any) => c.button_name === 'page_view') || [];
        const buttonClicks = clicks?.filter((c: any) => c.button_name !== 'page_view') || [];

        const buttonMap = new Map<string, number>();
        const pageMap = new Map<string, number>();
        const dailyMap = new Map<string, number>();

        // Process ONLY button clicks (not page views) for daily and button stats
        buttonClicks.forEach((click: any) => {
            const date = new Date(click.created_at).toISOString().split('T')[0];
            dailyMap.set(date, (dailyMap.get(date) || 0) + 1);
            buttonMap.set(click.button_name, (buttonMap.get(click.button_name) || 0) + 1);
            pageMap.set(click.page_path, (pageMap.get(click.page_path) || 0) + 1);
        });

        const topButtons = Array.from(buttonMap.entries())
            .map(([name, clicks]) => ({ name, clicks }))
            .sort((a, b) => b.clicks - a.clicks);

        const topPages = Array.from(pageMap.entries())
            .map(([path, views]) => ({ path, views }))
            .sort((a, b) => b.views - a.views);

        const dailyData = Array.from(dailyMap.entries())
            .map(([date, clicks]) => ({ date, clicks }))
            .sort((a, b) => b.date.localeCompare(a.date));

        const totalClicks = buttonClicks.length;
        const pageViews = pageViewsData.length;
        const uniqueButtons = buttonMap.size;
        const avgClicksPerDay = Math.round(totalClicks / days);

        setData({ topButtons, topPages, dailyData, totalClicks, pageViews, uniqueButtons, avgClicksPerDay });
        setLoading(false);
    };

    // Show login screen if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="bg-gray-800 p-6 rounded-xl shadow-md w-96 border border-gray-700 pt-6">
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

    if (loading || !data) {
        return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-white">Loading tracking data...</div>
        </div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="container mx-auto px-4 max-w-7xl pt-12">
                <div className="mb-6">
                    <Link href="/admin" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00ff41] transition">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <h1 className="text-2xl font-bold text-white">📊 Mike Turko - Tracking Analytics</h1>
                    <DateSelector currentDays={days} setDays={setDays} />
                </div>

                <SummaryCards
                    totalClicks={data.totalClicks}
                    pageViews={data.pageViews}
                    uniqueButtons={data.uniqueButtons}
                    avgClicksPerDay={data.avgClicksPerDay}
                    days={days}
                />

                <DailyTrend data={data.dailyData} />

                <div className="grid md:grid-cols-2 gap-8">
                    <ButtonTable data={data.topButtons} />
                    <PageTable data={data.topPages} />
                </div>
            </div>
        </div>
    );
}