'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

// All menu items (for mobile dropdown)
const allMenuItems = [
    { label: 'Home', href: '/' },
    { label: 'Triathlon Calc', href: '/triathlon-calculator' },
    { label: 'Contact', href: '/contact' },
    { label: 'Admin', href: '/admin' },
];

// Only show these on desktop (outside hamburger)
const desktopLinks = [
    { label: 'Home', href: '/' },
    { label: 'Triathlon Calc', href: '/triathlon-calculator' },
    { label: 'Contact', href: '/contact' },
    // Admin is NOT here - only in hamburger
];

export default function TopBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Mike Turko';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-black/90 backdrop-blur-md border-b border-[#00ff41]/20'
                : 'bg-transparent'
                }`}>
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-md border-2 border-[#00ff41] flex items-center justify-center shadow-[0_0_10px_#00ff41]">
                                <span className="text-[#00ff41] text-sm font-bold">M</span>
                            </div>
                            <span className={`font-semibold text-lg transition-colors duration-300 text-white`}>
                                {siteName}
                            </span>
                        </Link>

                        {/* Right side: desktop links + hamburger */}
                        <div className="flex items-center space-x-4">
                            {/* Desktop links - NO ADMIN here */}
                            <nav className="hidden md:flex space-x-6">
                                {desktopLinks.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`transition text-gray-300 hover:text-white ${pathname === item.href ? 'text-[#00ff41]' : ''}`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>

                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 rounded-lg transition hover:bg-white/10 text-white"
                                aria-label="Menu"
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu panel - shows ALL items including Admin */}
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />

                    <div className="fixed right-0 top-0 z-50 h-full w-72 md:w-96 bg-black/95 border-l border-[#00ff41]/20 shadow-xl">
                        <div className="flex h-full flex-col">
                            <div className="flex items-center justify-between border-b border-[#00ff41]/20 p-4 md:p-6">
                                <h3 className="font-semibold text-lg md:text-xl text-white">
                                    {siteName}
                                </h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-full p-2 hover:bg-white/10 transition"
                                    aria-label="Close menu"
                                >
                                    <X className="h-6 w-6 text-white" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto py-2 md:py-4">
                                <nav className="space-y-1 md:space-y-2 px-2 md:px-4">
                                    {allMenuItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`
                                                flex items-center rounded-lg px-3 py-3 md:px-4 md:py-4
                                                text-sm md:text-base font-medium
                                                transition-colors hover:bg-white/10
                                                ${pathname === item.href ? 'text-[#00ff41]' : 'text-gray-300'}
                                            `}
                                            onClick={handleLinkClick}
                                        >
                                            <span>{item.label}</span>
                                            {pathname === item.href && (
                                                <span className="ml-2 rounded-full bg-[#00ff41]/20 px-2 py-0.5 text-xs text-[#00ff41]">
                                                    Current
                                                </span>
                                            )}
                                        </Link>
                                    ))}
                                </nav>

                                <div className="mt-6 md:mt-8 px-4 md:px-6">
                                    <div className="rounded-lg bg-white/5 p-4 md:p-5 border border-[#00ff41]/20">
                                        <h4 className="font-semibold text-sm md:text-base text-white mb-2 md:mb-3">
                                            Let's Connect
                                        </h4>
                                        <p className="text-xs md:text-sm text-gray-400">
                                            Feel free to reach out via the chat widget. I'd love to hear from you.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-[#00ff41]/20 p-4 md:p-6">
                                <p className="text-xs md:text-sm text-gray-500 text-center">
                                    © {new Date().getFullYear()} {siteName}
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <div className="h-16" />
        </>
    );
}