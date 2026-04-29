export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8">Contact</h1>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">
                    Contact form coming soon. For now, you can reach me at:
                </p>
                <p className="mt-4">
                    <a href="mailto:hello@mike.com" className="text-blue-600 hover:underline">
                        hello@mike.com
                    </a>
                </p>
            </div>
        </div>
    )
}