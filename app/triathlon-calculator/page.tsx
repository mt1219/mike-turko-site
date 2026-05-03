// app/triathlon-calculator/page.tsx
'use client';

import { useState, useEffect } from 'react';
import PageHero from '@/src/components/ui/PageHero';
import { TimerIcon } from 'lucide-react';

// Race distances and names
const raceDistances: Record<string, { swim: number; bike: number; run: number }> = {
    sprint: { swim: 820, bike: 12.4, run: 3.1 },
    olympic: { swim: 1640, bike: 24.8, run: 6.2 },
    '70.3': { swim: 2112, bike: 56, run: 13.1 },
    ironman: { swim: 4224, bike: 112, run: 26.2 }
};

const raceNames: Record<string, string> = {
    sprint: 'Sprint Triathlon',
    olympic: 'Olympic Triathlon',
    '70.3': '70.3 Ironman',
    ironman: 'Ironman'
};

export default function TriathlonCalculatorPage() {
    const [raceType, setRaceType] = useState<string>('olympic');
    const [swimPace, setSwimPace] = useState<string>('2:00');
    const [t1Time, setT1Time] = useState<string>('2:00');
    const [bikeSpeed, setBikeSpeed] = useState<string>('20.0');
    const [t2Time, setT2Time] = useState<string>('1:00');
    const [runPace, setRunPace] = useState<string>('8:00');

    const [results, setResults] = useState({
        swimTime: '0:00:00',
        bikeTime: '0:00:00',
        runTime: '0:00:00',
        totalTime: '0:00:00',
        distances: raceDistances.olympic,
        errors: {} as Record<string, string>
    });

    const parseTimeToMinutes = (timeString: string, fieldName: string): { value: number | null; error: string } => {
        if (!timeString) return { value: 0, error: '' };

        if (timeString.includes('.')) {
            return { value: null, error: `Use mm:ss format instead of decimal for ${fieldName}` };
        }

        const parts = timeString.split(':');
        if (parts.length < 1 || parts.length > 2 || isNaN(parseInt(parts[0])) || (parts[1] && isNaN(parseInt(parts[1])))) {
            return { value: null, error: `Invalid ${fieldName} format (use mm:ss)` };
        }

        const minutes = parseInt(parts[0], 10);
        const seconds = parts[1] ? parseInt(parts[1], 10) : 0;

        if (seconds >= 60) {
            return { value: null, error: `Seconds cannot exceed 59 for ${fieldName}` };
        }

        return { value: minutes + (seconds / 60), error: '' };
    };

    const formatTime = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const mins = Math.floor(minutes % 60);
        const secs = Math.round((minutes * 60) % 60);
        return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const calculateTime = () => {
        const distances = raceDistances[raceType];
        const errors: Record<string, string> = {};

        const swimResult = parseTimeToMinutes(swimPace, 'swim pace');
        const t1Result = parseTimeToMinutes(t1Time, 'T1');
        const t2Result = parseTimeToMinutes(t2Time, 'T2');
        const runResult = parseTimeToMinutes(runPace, 'run pace');

        const bikeSpeedNum = parseFloat(bikeSpeed);

        if (swimResult.error) errors.swim = swimResult.error;
        if (t1Result.error) errors.t1 = t1Result.error;
        if (t2Result.error) errors.t2 = t2Result.error;
        if (runResult.error) errors.run = runResult.error;
        if (isNaN(bikeSpeedNum)) errors.bike = 'Invalid bike speed';

        const swimTime = swimResult.value !== null ? (swimResult.value * distances.swim) / 100 : 0;
        const bikeTime = !isNaN(bikeSpeedNum) && bikeSpeedNum > 0 ? (distances.bike / bikeSpeedNum) * 60 : 0;
        const runTime = runResult.value !== null ? runResult.value * distances.run : 0;
        const t1 = t1Result.value !== null ? t1Result.value : 0;
        const t2 = t2Result.value !== null ? t2Result.value : 0;

        const total = swimTime + t1 + bikeTime + t2 + runTime;

        setResults({
            swimTime: swimResult.value !== null ? formatTime(swimTime) : '--:--:--',
            bikeTime: !isNaN(bikeSpeedNum) && bikeSpeedNum > 0 ? formatTime(bikeTime) : '--:--:--',
            runTime: runResult.value !== null ? formatTime(runTime) : '--:--:--',
            totalTime: formatTime(total),
            distances,
            errors
        });
    };

    useEffect(() => {
        calculateTime();
    }, [raceType, swimPace, t1Time, bikeSpeed, t2Time, runPace]);

    const getFieldClass = (hasError: boolean) => `
  w-full px-4 py-2 rounded-xl border-2 
  ${hasError
            ? 'border-red-500 bg-red-950/50 focus:border-red-500'
            : 'border-gray-700 bg-black/50 focus:border-[#00ff41] focus:ring-2 focus:ring-[#00ff41]/20'
        }
  transition-all outline-none text-white font-mono
`;

    return (
        <div>
            {/* Hero Section */}
            <PageHero
                title="Triathlon Time Calculator"
                description="Calculate your finish time for Sprint, Olympic, 70.3, or Ironman"
                icon={<TimerIcon className="w-10 h-10" />}
            />

            {/* Calculator Card */}
            {/* Calculator Card */}
            <div className="container mx-auto px-4 max-w-2xl py-12">
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl border border-[#00ff41]/20 overflow-hidden">
                    <div className="p-6 space-y-6">
                        {/* Race Type Selector */}
                        <div className="space-y-2">
                            <label className="block font-semibold text-gray-300">Race Type</label>
                            <select
                                value={raceType}
                                onChange={(e) => setRaceType(e.target.value)}
                                className="w-full px-4 py-2 rounded-xl border-2 border-gray-700 bg-black/50 text-white focus:border-[#00ff41] focus:ring-2 focus:ring-[#00ff41]/20 transition-all outline-none font-mono"
                            >
                                <option value="sprint">Sprint Triathlon</option>
                                <option value="olympic">Olympic Triathlon</option>
                                <option value="70.3">70.3 Ironman</option>
                                <option value="ironman">Ironman</option>
                            </select>
                        </div>

                        {/* Swim */}
                        <div className="space-y-2">
                            <label className="block font-semibold text-gray-300">Swim Pace (per 100 yards)</label>
                            <input
                                type="text"
                                value={swimPace}
                                onChange={(e) => setSwimPace(e.target.value)}
                                placeholder="mm:ss"
                                className={`${getFieldClass(!!results.errors.swim)} font-mono bg-black/50 border-gray-700 text-white focus:border-[#00ff41]`}
                            />
                            <p className="text-xs text-gray-500">Example: 2:30 = 2 minutes 30 seconds per 100 yards</p>
                            {results.errors.swim && <p className="text-sm text-red-500">{results.errors.swim}</p>}
                            <div className="bg-gray-900/50 rounded-xl p-3 mt-2 border border-gray-800">
                                <span className="text-gray-400">
                                    {results.distances.swim} yd Swim Time:
                                    <strong className="ml-2 text-[#00ff41] font-mono">{results.swimTime}</strong>
                                </span>
                            </div>
                        </div>

                        {/* T1 */}
                        <div className="space-y-2">
                            <label className="block font-semibold text-gray-300">T1 Transition Time</label>
                            <input
                                type="text"
                                value={t1Time}
                                onChange={(e) => setT1Time(e.target.value)}
                                placeholder="mm:ss"
                                className={`${getFieldClass(!!results.errors.t1)} font-mono bg-black/50 border-gray-700 text-white focus:border-[#00ff41]`}
                            />
                            {results.errors.t1 && <p className="text-sm text-red-500">{results.errors.t1}</p>}
                        </div>

                        {/* Bike */}
                        <div className="space-y-2">
                            <label className="block font-semibold text-gray-300">Bike Speed (mph)</label>
                            <input
                                type="number"
                                step="0.1"
                                value={bikeSpeed}
                                onChange={(e) => setBikeSpeed(e.target.value)}
                                className={`${getFieldClass(!!results.errors.bike)} font-mono bg-black/50 border-gray-700 text-white focus:border-[#00ff41]`}
                            />
                            {results.errors.bike && <p className="text-sm text-red-500">{results.errors.bike}</p>}
                            <div className="bg-gray-900/50 rounded-xl p-3 mt-2 border border-gray-800">
                                <span className="text-gray-400">
                                    {results.distances.bike} mi Bike Time:
                                    <strong className="ml-2 text-[#00ff41] font-mono">{results.bikeTime}</strong>
                                </span>
                            </div>
                        </div>

                        {/* T2 */}
                        <div className="space-y-2">
                            <label className="block font-semibold text-gray-300">T2 Transition Time</label>
                            <input
                                type="text"
                                value={t2Time}
                                onChange={(e) => setT2Time(e.target.value)}
                                placeholder="mm:ss"
                                className={`${getFieldClass(!!results.errors.t2)} font-mono bg-black/50 border-gray-700 text-white focus:border-[#00ff41]`}
                            />
                            {results.errors.t2 && <p className="text-sm text-red-500">{results.errors.t2}</p>}
                        </div>

                        {/* Run */}
                        <div className="space-y-2">
                            <label className="block font-semibold text-gray-300">Run Pace (per mile)</label>
                            <input
                                type="text"
                                value={runPace}
                                onChange={(e) => setRunPace(e.target.value)}
                                placeholder="mm:ss"
                                className={`${getFieldClass(!!results.errors.run)} font-mono bg-black/50 border-gray-700 text-white focus:border-[#00ff41]`}
                            />
                            <p className="text-xs text-gray-500">Example: 8:00 = 8 minutes per mile</p>
                            {results.errors.run && <p className="text-sm text-red-500">{results.errors.run}</p>}
                            <div className="bg-gray-900/50 rounded-xl p-3 mt-2 border border-gray-800">
                                <span className="text-gray-400">
                                    {results.distances.run} mi Run Time:
                                    <strong className="ml-2 text-[#00ff41] font-mono">{results.runTime}</strong>
                                </span>
                            </div>
                        </div>

                        {/* Total Time */}
                        <div className="pt-4 border-t border-gray-800">
                            <div className="bg-[#00ff41]/10 border border-[#00ff41] rounded-xl p-4 text-center">
                                <p className="text-[#00ff41]/80 text-sm mb-1">Estimated Finish Time</p>
                                <p className="text-[#00ff41] text-3xl font-bold tracking-wider font-mono">{results.totalTime}</p>
                                <p className="text-[#00ff41]/60 text-xs mt-2">
                                    for {raceNames[raceType]}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-center text-gray-500 text-xs mt-6">
                    Times are estimates. Actual race times may vary based on conditions, elevation, and other factors.
                </p>
            </div>
        </div>
    );
}