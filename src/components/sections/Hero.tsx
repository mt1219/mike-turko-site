export default function Hero() {
    return (
        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm mb-6">
                        Welcome to my corner of the web
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Mike
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-8">
                        Building digital experiences & sharing ideas
                    </p>
                    <div className="flex gap-4 justify-center">
                        <a href="/articles" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
                            View Articles
                        </a>
                        <a href="/contact" className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition">
                            Contact Me
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}