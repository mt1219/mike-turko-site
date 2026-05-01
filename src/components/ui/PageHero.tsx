// src/components/ui/PageHero.tsx
'use client';

interface PageHeroProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    gradient?: string;
}

export default function PageHero({
    title,
    description,
    icon,
    gradient = "from-[#0a0a0a] to-[#1a1a1a]"
}: PageHeroProps) {
    return (
        <div className="bg-black border-b border-[#00ff41]/20 pt-20 md:pt-24 relative">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 relative z-10">
                <div className="max-w-4xl">
                    {icon && (
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 mr-4 text-[#00ff41]">
                                {icon}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold font-mono text-[#00ff41] green-glow">
                                {title}
                            </h1>
                        </div>
                    )}
                    {!icon && (
                        <h1 className="text-4xl md:text-5xl font-bold font-mono text-[#00ff41] green-glow mb-6">
                            {title}
                        </h1>
                    )}
                    {description && (
                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}