'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackClick } from '@/lib/track-clicks';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        // Skip ALL admin pages (anything starting with /admin)
        const isAdminPage = pathname?.startsWith('/admin');

        if (!isAdminPage) {
            trackClick('page_view', {
                action: 'page_load',
                path: pathname,
                timestamp: Date.now(),
            });
            console.log('📊 Page view tracked:', pathname);
        } else {
            console.log('🚫 Skipped tracking for admin page:', pathname);
        }
    }, [pathname]);

    return <>{children}</>;
}