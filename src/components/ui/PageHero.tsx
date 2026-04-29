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
    gradient = "from-blue-600 to-purple-600"
}: PageHeroProps) {
    return (
        <div className={`bg-gradient-to-r ${gradient} text-white pt-20 md:pt-24`}>
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                <div className="max-w-4xl">
                    {icon && (
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 mr-4">
                                {icon}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold">
                                {title}
                            </h1>
                        </div>
                    )}
                    {!icon && (
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            {title}
                        </h1>
                    )}
                    {description && (
                        <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}