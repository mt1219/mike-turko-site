// src/components/sections/ProjectsPreview.tsx
import { BookIcon, PawPrintIcon } from 'lucide-react';

export default function ProjectsPreview() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Current Projects</h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                    {/* Toby Book Card */}
                    <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">
                        <div className="flex items-center mb-4">
                            <BookIcon className="w-8 h-8 text-amber-600 mr-3" />
                            <h3 className="text-xl font-semibold text-gray-800">Toby Adopts a Hooman</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            A heartwarming children's book about a dog who adopts his perfect human companion.
                        </p>
                        <a
                            href="#"
                            className="inline-block text-amber-600 font-medium hover:underline"
                        >
                            Learn More →
                        </a>
                    </div>

                    {/* World Canine Union Card */}
                    <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">
                        <div className="flex items-center mb-4">
                            <PawPrintIcon className="w-8 h-8 text-blue-600 mr-3" />
                            <h3 className="text-xl font-semibold text-gray-800">World Canine Union</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            A modern dog registry platform for breeders, owners, and canine professionals.
                        </p>
                        <a
                            href="#"
                            className="inline-block text-blue-600 font-medium hover:underline"
                        >
                            Visit Site →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}