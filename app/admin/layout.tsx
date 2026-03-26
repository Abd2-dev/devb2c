'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const isLoginPage = pathname === '/admin/login';
    const { data: session, status } = useSession();
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    useEffect(() => {
        setIsMobileSidebarOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (status === 'loading') return;

        if (!session && !isLoginPage) {
            router.push('/admin/login');
        } else if (session && isLoginPage) {
            router.push('/admin');
        }
    }, [pathname, isLoginPage, router, session, status]);

    if (status === 'loading') {
        return <div className="min-h-screen bg-[#111111] flex items-center justify-center text-white">Loading Security Module...</div>;
    }

    if (isLoginPage) {
        return (
            <div className="min-h-screen bg-[#111111] font-sans">
                {children}
            </div>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden bg-[#111111] font-sans">
            {/* Sidebar Navigation */}
            <Sidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Top Header */}
                <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#111]">
                    {children}
                </main>
            </div>
        </div>
    );
}
