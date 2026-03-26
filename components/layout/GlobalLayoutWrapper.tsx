'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PromoPopup from '@/components/PromoPopup';
import FavoritesDrawer from '@/components/ui/FavoritesDrawer';

export default function GlobalLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    if (isAdmin) {
        return <main>{children}</main>;
    }

    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
            <PromoPopup />
            <FavoritesDrawer />
        </>
    );
}
