export default function PageTable({ data }: { data: { path: string; views: number }[] }) {
    return (
        <div className="bg-gray-800 rounded-lg border border-gray-700">
            <h2 className="font-semibold p-4 border-b border-gray-700 text-white">Page Data</h2>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-900/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm text-gray-400">Page Path</th>
                            <th className="px-4 py-3 text-left text-sm text-gray-400">Views</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {data.map((row) => (
                            <tr key={row.path} className="hover:bg-gray-700/50">
                                <td className="px-4 py-2 text-sm text-white font-mono">{row.path}</td>
                                <td className="px-4 py-2 text-sm text-white">{row.views}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}