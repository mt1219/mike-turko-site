'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackClick } from '@/lib/track-clicks';


export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        // Track page view on every route change
        trackClick('page_view', {
            action: 'page_load',
            path: pathname,
            timestamp: Date.now(),
        });
        console.log('📊 Page view tracked:', pathname);
    }, [pathname]);

    return <>{children}</>;
}