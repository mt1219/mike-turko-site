export default function DailyTrend({ data }: { data: { date: string; clicks: number }[] }) {
    if (!data.length) return null;

    const maxClicks = Math.max(...data.map(d => d.clicks));

    return (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-8">
            <h2 className="font-semibold mb-3 text-white">Daily Click Trend</h2>
            <div className="space-y-2">
                {data.slice(0, 14).map(({ date, clicks }) => (
                    <div key={date} className="flex items-center gap-4">
                        <div className="w-24 text-sm font-mono text-gray-400">{date}</div>
                        <div className="flex-1 h-8 bg-gray-700 rounded overflow-hidden">
                            <div
                                className="h-full bg-[#00ff41] text-xs text-black flex items-center px-2 font-bold"
                                style={{ width: `${(clicks / maxClicks) * 100}%` }}
                            >
                                {clicks}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}