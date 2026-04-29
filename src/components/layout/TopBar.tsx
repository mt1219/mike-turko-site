'use client'

import { useState } from 'react'
import Link from 'next/link'

// All menu items
const allMenuItems = [
    { label: 'Home', href: '/' },
    { label: 'Articles', href: '/articles' },
    { label: 'Contact', href: '/contact' },
]

// Only show these on desktop (outside hamburger)
const visibleLinks = allMenuItems  // Show all 3 on desktop
const hamburgerItems = [] // No extra items beyond the 3

export default function TopBar() {
    const [isOpen, setIsOpen] = useState(false)
    const siteName = 'Mike'

    return (
        <>
            <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-sm font-bold">M</span>
                            </div>
                            <span className="font-semibold text-lg">{siteName}</span>
                        </Link>

                        {/* Right side: visible links + hamburger */}
                        <div className="flex items-center space-x-4">
                            {/* Visible links - desktop only */}
                            <nav className="hidden md:flex space-x-6">
                                {visibleLinks.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="text-gray-600 hover:text-gray-900 transition"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>

                            {/* Hamburger button - always visible */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition"
                                aria-label="Menu"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu dropdown - shows ALL links */}
            {isOpen && (
                <div className="fixed top-16 left-0 right-0 bottom-0 bg-white z-40 md:hidden overflow-y-auto">
                    <nav className="container mx-auto px-4 py-4">
                        {allMenuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block py-4 px-2 hover:bg-gray-50 rounded-lg text-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}

            <div className="h-16" />
        </>
    )
}