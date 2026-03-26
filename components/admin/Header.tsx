'use client';

import { useState } from 'react';
import { Menu, Moon, Sun, Bell, Search, User, Settings as SettingsIcon, LogOut } from 'lucide-react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const { data: session } = useSession();

    return (
        <header className="h-20 bg-[#1a1a1a] border-b border-[#333] flex items-center justify-between px-6 sticky top-0 z-40">
            {/* Left side: Mobile menu & Search */}
            <div className="flex items-center gap-4 flex-1">
                <button
                    className="lg:hidden text-[#b0b0b0] hover:text-white transition-colors"
                    onClick={onMenuClick}
                >
                    <Menu size={24} />
                </button>

                <div className="relative hidden md:block max-w-md w-full">
                    <input
                        type="text"
                        placeholder="Search dashboard..."
                        className="w-full bg-[#222] border border-[#444] rounded-lg py-2 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" size={16} />
                </div>
            </div>

            {/* Right side: Actions & Profile */}
            <div className="flex items-center gap-4">
                <LanguageSwitcher />

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                        className="relative w-10 h-10 rounded-full flex items-center justify-center bg-[#222] text-[#b0b0b0] hover:text-white border border-[#444] transition-colors"
                    >
                        <Bell size={18} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {isNotifOpen && (
                        <div className="absolute right-0 mt-2 w-72 bg-[#1a1a1a] border border-[#333] rounded-xl shadow-2xl py-2 animate-fade-in z-50">
                            <div className="px-4 py-2 border-b border-[#333] flex justify-between items-center mb-2">
                                <h3 className="text-sm font-bold text-white">Notifications</h3>
                                <span className="text-xs text-[#0066cc] cursor-pointer hover:underline">Mark all read</span>
                            </div>

                            <div className="max-h-64 overflow-y-auto">
                                <div className="px-4 py-3 hover:bg-[#222] border-b border-[#333] cursor-pointer transition-colors">
                                    <p className="text-sm text-white mb-1">New User Registered</p>
                                    <p className="text-xs text-[#777]">A new affiliate has signed up.</p>
                                    <p className="text-[10px] text-[#555] mt-1">2 mins ago</p>
                                </div>
                                <div className="px-4 py-3 hover:bg-[#222] border-b border-[#333] cursor-pointer transition-colors">
                                    <p className="text-sm text-white mb-1">System Update</p>
                                    <p className="text-xs text-[#777]">Database backup completed successfully.</p>
                                    <p className="text-[10px] text-[#555] mt-1">1 hour ago</p>
                                </div>
                            </div>

                            <div className="px-4 py-2 pt-3 text-center border-t border-[#333]">
                                <span className="text-xs text-[#b0b0b0] hover:text-white cursor-pointer transition-colors">View all past notifications</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 hover:bg-[#222] p-1 pr-3 rounded-full border border-transparent hover:border-[#444] transition-all"
                    >
                        <div className="w-8 h-8 rounded-full bg-[#0066cc] flex items-center justify-center text-white font-bold text-sm">
                            {session?.user?.name ? session.user.name.charAt(0) : 'A'}
                        </div>
                        <span className="text-sm font-semibold text-white hidden sm:block">{session?.user?.name || 'Admin User'}</span>
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-[#333] rounded-xl shadow-2xl py-2 animate-fade-in">
                            <div className="px-4 py-2 border-b border-[#333] mb-2">
                                <p className="text-sm font-bold text-white">{session?.user?.name || 'Admin User'}</p>
                                <p className="text-xs text-[#777]">{session?.user?.email || 'admin@bslsports.com'}</p>
                            </div>

                            <div className="pt-2">
                                <button
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-[#222] w-full text-left transition-colors"
                                    onClick={() => signOut({ callbackUrl: '/admin/login' })}
                                >
                                    <LogOut size={16} /> Sign out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
