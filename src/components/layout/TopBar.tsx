'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

// Menu items for mike-turko
const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Triathlon Calc', href: '/triathlon-calculator' },
    { label: 'Contact', href: '/contact' },
];

export default function TopBar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Mike Turko';

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
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
            {/* Top bar */}
            <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-black to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-sm font-bold">M</span>
                            </div>
                            <span className="font-semibold text-lg">{siteName}</span>
                        </Link>

                        {/* Right side: visible links + hamburger */}
                        <div className="flex items-center space-x-4">
                            {/* Visible links - desktop only */}
                            <nav className="hidden md:flex space-x-6">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`text-gray-600 hover:text-gray-900 transition ${pathname === item.href ? 'text-blue-600 font-medium' : ''
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>

                            {/* Hamburger button */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition"
                                aria-label="Menu"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu panel */}
            {isOpen && (
                <>
                    {/* Overlay with backdrop blur */}
                    <div
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />

                    {/* Menu panel - right side column */}
                    <div className="fixed right-0 top-0 z-50 h-full w-72 md:w-96 bg-white shadow-xl">
                        <div className="flex h-full flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between border-b p-4 md:p-6">
                                <h3 className="font-semibold text-lg md:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    {siteName}
                                </h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-full p-2 hover:bg-gray-100 transition"
                                    aria-label="Close menu"
                                >
                                    <X className="h-6 w-6 md:h-7 md:w-7 text-gray-600" />
                                </button>
                            </div>

                            {/* Scrollable nav links */}
                            <div className="flex-1 overflow-y-auto py-2 md:py-4">
                                <nav className="space-y-1 md:space-y-2 px-2 md:px-4">
                                    {menuItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`
                        flex items-center rounded-lg px-3 py-3 md:px-4 md:py-4
                        text-sm md:text-base font-medium
                        transition-colors hover:bg-gray-50
                        ${pathname === item.href
                                                    ? 'bg-gray-50 text-blue-600'
                                                    : 'text-gray-700'
                                                }
                      `}
                                            onClick={handleLinkClick}
                                        >
                                            <span>{item.label}</span>
                                            {pathname === item.href && (
                                                <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-600">
                                                    Current
                                                </span>
                                            )}
                                        </Link>
                                    ))}
                                </nav>

                                {/* Additional info section */}
                                <div className="mt-6 md:mt-8 px-4 md:px-6">
                                    <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 md:p-5">
                                        <h4 className="font-semibold text-sm md:text-base text-gray-800 mb-2 md:mb-3">
                                            Let's Connect
                                        </h4>
                                        <p className="text-xs md:text-sm text-gray-600">
                                            Feel free to reach out via the chat widget or email. I'd love to hear from you.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="border-t p-4 md:p-6">
                                <p className="text-xs md:text-sm text-gray-500 text-center">
                                    © {new Date().getFullYear()} {siteName}
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Spacer for fixed header */}
            <div className="h-16" />
        </>
    );
}