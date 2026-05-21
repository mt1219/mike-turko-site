export default function ButtonTable({ data }: { data: { name: string; clicks: number }[] }) {
    return (
        <div className="bg-gray-800 rounded-lg border border-gray-700 mb-8">
            <h2 className="font-semibold p-4 border-b border-gray-700 text-white">Button Data</h2>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-900/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm text-gray-400">Button Name</th>
                            <th className="px-4 py-3 text-left text-sm text-gray-400">Clicks</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {data.map((row) => (
                            <tr key={row.name} className="hover:bg-gray-700/50">
                                <td className="px-4 py-2 text-sm text-white font-mono">{row.name}</td>
                                <td className="px-4 py-2 text-sm text-white">{row.clicks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}