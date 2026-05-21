export default function SummaryCards({
    totalClicks,
    pageViews,
    uniqueButtons,
    avgClicksPerDay,
    days
}: {
    totalClicks: number;
    pageViews: number;
    uniqueButtons: number;
    avgClicksPerDay: number;
    days: number;
}) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="text-2xl font-bold text-white">{totalClicks.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total Clicks</div>
                <div className="text-xs text-gray-500">Last {days} days</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="text-2xl font-bold text-white">{pageViews.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Page Views</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="text-2xl font-bold text-white">{uniqueButtons.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Unique Buttons</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="text-2xl font-bold text-white">{avgClicksPerDay.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Avg Clicks/Day</div>
            </div>
        </div>
    );
}