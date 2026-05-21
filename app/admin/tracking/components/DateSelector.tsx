'use client';

export default function DateSelector({ currentDays, setDays }: { currentDays: number; setDays: (days: number) => void }) {
    const DAYS_OPTIONS = [1, 7, 30, 60, 90];

    return (
        <div className="flex gap-2">
            {DAYS_OPTIONS.map(days => (
                <button
                    key={days}
                    onClick={() => setDays(days)}
                    className={`px-3 py-1 rounded transition-colors ${currentDays === days
                        ? 'bg-[#00ff41] text-black'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                        }`}
                >
                    {days}d
                </button>
            ))}
        </div>
    );
}