// app/contact/page.tsx
import PageHero from '@/src/components/ui/PageHero';
import { MailIcon } from 'lucide-react';

export default function ContactPage() {
    return (
        <div>
            <PageHero
                title="Get in Touch"
                description="Questions about World Canine Union, my book, or just want to say hello? I'd love to hear from you."
                icon={<MailIcon className="w-10 h-10" />}
            />

            <div className="container mx-auto px-4 py-12 max-w-2xl">
                <div className="bg-[#0a0a0a] rounded-2xl border border-[#00ff41]/20 p-8">
                    <p className="text-gray-400 text-center">
                        💬 Use the chat button below to send me a message. I'll get back to you within 24 hours.
                    </p>
                </div>
            </div>
        </div>
    );
}