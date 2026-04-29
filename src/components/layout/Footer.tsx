export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 mt-20">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="font-bold mb-4">Mike</h3>
                        <p className="text-gray-400 text-sm">
                            Building digital experiences & sharing ideas
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="/" className="hover:text-white transition">Home</a></li>
                            <li><a href="/articles" className="hover:text-white transition">Articles</a></li>
                            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Connect</h3>
                        <p className="text-gray-400 text-sm">
                            Coming soon: Newsletter & social links
                        </p>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} Mike. All rights reserved.
                </div>
            </div>
        </footer>
    )
}