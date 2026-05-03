// app/contact/page.tsx
import PageHero from '@/src/components/ui/PageHero';
import { MailIcon } from 'lucide-react';
import ContactForm from '@/src/components/contact/ContactForm';

export default function ContactPage() {
    return (
        <div>
            <PageHero
                title="Get in Touch"
                description="Have a question about WCU, the book, or just want to say hello? I'd love to hear from you."
                icon={<MailIcon className="w-10 h-10" />}
            />

            <div className="container mx-auto px-4 py-12 max-w-2xl">
                <ContactForm />

            </div>
        </div>
    );
}