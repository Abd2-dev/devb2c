'use client';

import { useFavorites } from '@/components/context/FavoritesContext';
import { X, Star, ExternalLink, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesDrawer() {
    const { favorites, isDrawerOpen, toggleDrawer, removeFavorite } = useFavorites();

    return (
        <>
            {/* Backdrop */}
            {isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] animate-fade-in"
                    onClick={toggleDrawer}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#1a1a1a] border-l border-[#333] shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-[100] transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>

                <div className="p-6 border-b border-[#333] flex justify-between items-center bg-[#111]">
                    <div className="flex items-center gap-2">
                        <Star className="text-[#d4af37]" fill="#d4af37" size={24} />
                        <h2 className="text-2xl font-black text-white">My Favorites</h2>
                    </div>
                    <button
                        onClick={toggleDrawer}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#333] text-[#b0b0b0] hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 flex-1 overflow-y-auto">
                    {favorites.length === 0 ? (
                        <div className="text-center py-12">
                            <Star className="text-[#333] mx-auto mb-4" size={64} />
                            <h3 className="text-xl font-bold text-white mb-2">No favorites yet</h3>
                            <p className="text-[#777]">
                                Click the star icon on any bookmaker or prediction to save it here for quick access.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {favorites.sort((a, b) => b.addedAt - a.addedAt).map((item) => (
                                <div key={item.id} className="bg-[#222] border border-[#333] rounded-xl p-4 flex gap-4 group hover:border-[#d4af37] transition-colors">
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-1">
                                            {item.type}
                                        </div>
                                        <h4 className="text-white font-bold truncate">
                                            {item.title}
                                        </h4>
                                        <Link
                                            href={item.url}
                                            onClick={toggleDrawer}
                                            className="text-sm text-[#0066cc] hover:underline flex items-center gap-1 mt-2 inline-flex"
                                        >
                                            View details <ExternalLink size={14} />
                                        </Link>
                                    </div>
                                    <button
                                        onClick={() => removeFavorite(item.id)}
                                        className="text-[#777] hover:text-red-500 transition-colors p-2 self-start opacity-50 group-hover:opacity-100"
                                        title="Remove from favorites"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </>
    );
}
