'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    Image as ImageIcon,
    Briefcase,
    Megaphone,
    Settings,
    LogOut,
    X
} from 'lucide-react';
import { signOut } from 'next-auth/react';

const navItems = [
    { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Articles', href: '/admin/pages', icon: <FileText size={20} /> },
    { name: 'Predictions', href: '/admin/predictions', icon: <Megaphone size={20} /> },
    { name: 'Brand Management', href: '/admin/brands', icon: <Briefcase size={20} /> },
    { name: 'Authors', href: '/admin/authors', icon: <LayoutDashboard size={20} /> },
    { name: 'Media Library', href: '/admin/media', icon: <ImageIcon size={20} /> },
    { name: 'Promotions', href: '/admin/promotions', icon: <Megaphone size={20} /> },
    { name: 'Settings', href: '/admin/settings', icon: <Settings size={20} /> },
];

export default function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}
            <aside className={`w-64 bg-[#1a1a1a] border-r border-[#333] h-screen flex flex-col fixed lg:sticky top-0 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} lg:flex`}>
                {/* Logo area */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-[#333]">
                    <Link href="/admin" className="flex items-center gap-2" onClick={onClose}>
                        <Image src="/favicon.png" alt="BSL Logo" width={32} height={32} className="w-8 h-8 rounded-md" />
                        <div>
                            <span className="text-xl font-black text-white leading-none block">BSL Sports</span>
                            <span className="text-[10px] text-[#b0b0b0] font-bold uppercase tracking-wider">Control Hub</span>
                        </div>
                    </Link>
                    <button className="lg:hidden text-[#b0b0b0] hover:text-white" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive
                                    ? 'bg-[#0066cc]/10 text-[#0066cc] border border-[#0066cc]/20'
                                    : 'text-[#b0b0b0] hover:bg-[#222] hover:text-white'
                                    }`}
                            >
                                <span className={isActive ? 'text-[#0066cc]' : 'text-[#777]'}>
                                    {item.icon}
                                </span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* User area / Logout */}
                <div className="p-4 border-t border-[#333]">
                    <button
                        onClick={() => signOut({ callbackUrl: '/admin/login' })}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg font-medium text-[#b0b0b0] hover:bg-[#222] text-red-500 hover:text-red-400 transition-colors"
                    >
                        <LogOut size={20} className="text-red-500" />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}
