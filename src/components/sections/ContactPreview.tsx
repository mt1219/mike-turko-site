import Link from 'next/link'

export default function ContactPreview() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Have a question or just want to say hello? I'd love to hear from you.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
                    >
                        Contact Me
                    </Link>
                </div>
            </div>
        </section>
    )
}