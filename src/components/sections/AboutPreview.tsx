// src/components/sections/AboutPreview.tsx
export default function AboutPreview() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
                    <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                        <p>
                            I'm a technologist and entrepreneur passionate about connecting people with pets.
                            I build tools to help dog owners, breeders, and shelters work better together.
                        </p>
                        <p>
                            When I'm not coding, I'm writing children's books or working with dog registries.
                            My latest project, <span className="font-semibold">"Toby Adopts a Hooman"</span>,
                            tells the heartwarming story of a dog finding his perfect human companion.
                        </p>
                        <p>
                            Through the <span className="font-semibold">World Canine Union</span>,
                            I'm helping modernize dog registration and create better connections within the
                            canine community.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}