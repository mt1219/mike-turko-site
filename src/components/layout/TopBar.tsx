'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Wrench } from 'lucide-react';
import { trackClick } from '@/lib/track-clicks';

const tools = [
    { label: 'Triathlon Calculator', href: '/triathlon-calculator' },
    { label: 'PDF to Text', href: '/pdf-to-text' },
];

const allMenuItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact' },
];

const desktopLinks = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact' },
];

export default function TopBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [toolsOpen, setToolsOpen] = useState(false);
    const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Mike Turko';
    const toolsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        setToolsOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    // Close tools dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
                setToolsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isToolActive = tools.some((t) => t.href === pathname);

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
                            <span className="font-semibold text-lg transition-colors duration-300 text-white">
                                {siteName}
                            </span>
                        </Link>

                        {/* Right side: desktop links + hamburger */}
                        <div className="flex items-center space-x-4">
                            <nav className="hidden md:flex items-center space-x-6">
                                {desktopLinks.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => trackClick(`nav_${item.label.toLowerCase().replace(/\s+/g, '_')}`, {
                                            location: 'desktop_topbar',
                                            destination: item.href,
                                            timestamp: Date.now()
                                        })}
                                        className={`transition text-gray-300 hover:text-white ${pathname === item.href ? 'text-[#00ff41]' : ''}`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}

                                {/* Tools Dropdown */}
                                <div ref={toolsRef} className="relative">
                                    <button
                                        onClick={() => setToolsOpen(!toolsOpen)}
                                        className={`flex items-center gap-1.5 transition text-gray-300 hover:text-white ${isToolActive ? 'text-[#00ff41]' : ''}`}
                                    >
                                        <Wrench className="w-3.5 h-3.5" />
                                        Tools
                                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {toolsOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-52 bg-black/95 border border-[#00ff41]/20 rounded-xl overflow-hidden shadow-xl shadow-black/50">
                                            {tools.map((tool) => (
                                                <Link
                                                    key={tool.href}
                                                    href={tool.href}
                                                    onClick={() => {
                                                        trackClick(`nav_${tool.label.toLowerCase().replace(/\s+/g, '_')}`, {
                                                            location: 'desktop_tools_dropdown',
                                                            destination: tool.href,
                                                            timestamp: Date.now()
                                                        });
                                                        setToolsOpen(false);
                                                    }}
                                                    className={`flex items-center px-4 py-3 text-sm transition hover:bg-white/10 ${pathname === tool.href ? 'text-[#00ff41]' : 'text-gray-300'}`}
                                                >
                                                    {tool.label}
                                                    {pathname === tool.href && (
                                                        <span className="ml-auto rounded-full bg-[#00ff41]/20 px-2 py-0.5 text-xs text-[#00ff41]">
                                                            Current
                                                        </span>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
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

            {/* Mobile menu */}
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
                                <h3 className="font-semibold text-lg md:text-xl text-white">{siteName}</h3>
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
                                            className={`flex items-center rounded-lg px-3 py-3 md:px-4 md:py-4 text-sm md:text-base font-medium transition-colors hover:bg-white/10 ${pathname === item.href ? 'text-[#00ff41]' : 'text-gray-300'}`}
                                            onClick={() => {
                                                trackClick(`nav_mobile_${item.label.toLowerCase().replace(/\s+/g, '_')}`, {
                                                    location: 'mobile_menu',
                                                    destination: item.href,
                                                    timestamp: Date.now()
                                                });
                                                setIsOpen(false);
                                            }}
                                        >
                                            <span>{item.label}</span>
                                            {pathname === item.href && (
                                                <span className="ml-2 rounded-full bg-[#00ff41]/20 px-2 py-0.5 text-xs text-[#00ff41]">Current</span>
                                            )}
                                        </Link>
                                    ))}

                                    {/* Tools group in mobile */}
                                    <div className="rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                                            className={`w-full flex items-center justify-between rounded-lg px-3 py-3 md:px-4 md:py-4 text-sm md:text-base font-medium transition-colors hover:bg-white/10 ${isToolActive ? 'text-[#00ff41]' : 'text-gray-300'}`}
                                        >
                                            <span className="flex items-center gap-2">
                                                <Wrench className="w-4 h-4" />
                                                Tools
                                            </span>
                                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileToolsOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {mobileToolsOpen && (
                                            <div className="ml-4 border-l border-[#00ff41]/20 pl-3 space-y-1 pb-1">
                                                {tools.map((tool) => (
                                                    <Link
                                                        key={tool.href}
                                                        href={tool.href}
                                                        className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/10 ${pathname === tool.href ? 'text-[#00ff41]' : 'text-gray-400'}`}
                                                        onClick={() => {
                                                            trackClick(`nav_mobile_${tool.label.toLowerCase().replace(/\s+/g, '_')}`, {
                                                                location: 'mobile_tools_group',
                                                                destination: tool.href,
                                                                timestamp: Date.now()
                                                            });
                                                            setIsOpen(false);
                                                        }}
                                                    >
                                                        {tool.label}
                                                        {pathname === tool.href && (
                                                            <span className="ml-auto rounded-full bg-[#00ff41]/20 px-2 py-0.5 text-xs text-[#00ff41]">Current</span>
                                                        )}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </nav>

                                <div className="mt-6 md:mt-8 px-4 md:px-6">
                                    <div className="rounded-lg bg-white/5 p-4 md:p-5 border border-[#00ff41]/20">
                                        <h4 className="font-semibold text-sm md:text-base text-white mb-2 md:mb-3">Let's Connect</h4>
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
