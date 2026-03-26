'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, Check, Copy } from 'lucide-react';
import { Bookmaker } from '@/lib/data/bookmakers';
import { useFavorites } from '@/components/context/FavoritesContext';

interface BookmakerCardProps {
    bookmaker: Bookmaker;
    variant?: 'featured' | 'grid' | 'list';
}

export default function BookmakerCard({ bookmaker, variant = 'grid' }: BookmakerCardProps) {
    const [copied, setCopied] = useState(false);
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    // We'll use the name slugified if no id is present (based on the provided interface)
    const bookmakerId = bookmaker.id || bookmaker.name.toLowerCase().replace(/\s+/g, '-');
    const isFav = isFavorite(bookmakerId);

    const handleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFav) {
            removeFavorite(bookmakerId);
        } else {
            addFavorite({
                id: bookmakerId,
                type: 'bookmaker',
                title: bookmaker.name,
                url: bookmaker.reviewUrl || `/bookmakers/${bookmakerId}`
            });
        }
    };

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();
        if (bookmaker.promoCode) {
            navigator.clipboard.writeText(bookmaker.promoCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (variant === 'featured') {
        return (
            <div className="card-base card-hover flex flex-col md:flex-row shadow-[0_0_20px_rgba(212,175,55,0.15)] border-[#d4af37]/30 bg-gradient-to-br from-[#222] to-[#1a1a1a]">
                {/* Left Side: Logo */}
                <div className="md:w-1/3 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#333]">
                    <div className="bg-white text-black font-black text-4xl w-32 h-32 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-2 hover:rotate-0 transition-transform mb-4 border border-[#eee]">
                        {bookmaker.logo}
                    </div>
                    <div className="flex text-[#d4af37]">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={16} fill={star <= Math.round(bookmaker.rating / 2) ? "#d4af37" : "none"} strokeWidth={1} />
                        ))}
                    </div>
                    <span className="text-white font-bold text-sm mt-1">{bookmaker.rating}/10</span>
                </div>

                {/* Right Side: Details & Actions */}
                <div className="md:w-2/3 p-6 flex flex-col justify-between relative">
                    {/* Favorite Button */}
                    <button
                        onClick={handleFavorite}
                        className="absolute top-4 right-4 p-2 text-[#777] hover:text-[#d4af37] transition-colors z-10 bg-[#111] rounded-full border border-[#333]"
                        title={isFav ? "Remove from favorites" : "Save to favorites"}
                    >
                        <Star size={20} className={isFav ? "fill-[#d4af37] text-[#d4af37]" : ""} />
                    </button>

                    <div>
                        <div className="flex justify-between items-start mb-2 pr-12">
                            <h3 className="text-2xl font-bold text-white mb-2">{bookmaker.name}</h3>
                            <span className="badge-gold">Top Pick</span>
                        </div>
                        <p className="text-xl font-bold text-[#b0b0b0] mb-4">
                            {bookmaker.bonus}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        {bookmaker.promoCode && (
                            <div className="w-full sm:w-auto flex-1 flex flex-col">
                                <span className="text-xs text-[#777] mb-1 font-semibold uppercase tracking-wider">Promo Code</span>
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center justify-center gap-2 bg-[#1a1a1a] border border-dashed border-[#d4af37] px-4 py-3 rounded-lg hover:bg-[#222] transition-colors relative"
                                >
                                    <span className="text-[#d4af37] font-mono font-bold tracking-widest">{bookmaker.promoCode}</span>
                                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-[#777]" />}

                                    {/* Tooltip */}
                                    {copied && (
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-3 rounded shadow-lg">
                                            Copied!
                                        </div>
                                    )}
                                </button>
                            </div>
                        )}

                        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 flex-1 justify-end h-full">
                            <Link href={bookmaker.reviewUrl} className="btn-outline flex-1 flex items-center justify-center py-3">
                                Review
                            </Link>
                            <Link href={bookmaker.affiliateUrl} className="btn-primary flex-1 flex items-center justify-center py-3 shadow-[0_0_15px_rgba(0,102,204,0.3)] hover:shadow-[0_0_20px_rgba(0,102,204,0.5)]">
                                Claim Bonus
                            </Link>
                        </div>
                    </div>

                    <p className="text-[10px] text-[#555] mt-4 text-center sm:text-left">
                        18+ T&C apply, BeGambleAware.org. Play responsibly.
                    </p>
                </div>
            </div>
        );
    }

    // Grid / default variant
    return (
        <div className="card-base card-hover flex flex-col h-full bg-[#1c1c1c] p-4 relative">
            {/* Favorite Button */}
            <button
                onClick={handleFavorite}
                className="absolute top-4 right-4 p-1.5 text-[#777] hover:text-[#d4af37] transition-colors z-10 bg-[#111] rounded-full border border-[#333]"
                title={isFav ? "Remove from favorites" : "Save to favorites"}
            >
                <Star size={16} className={isFav ? "fill-[#d4af37] text-[#d4af37]" : ""} />
            </button>

            <div className="flex items-center gap-4 mb-4 pr-10">
                <div className="bg-white text-black font-bold text-2xl w-16 h-16 rounded-xl flex items-center justify-center shadow flex-shrink-0">
                    {bookmaker.logo}
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-white leading-tight">{bookmaker.name}</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-[#d4af37] text-sm font-black">{bookmaker.rating}/10</span>
                        <div className="flex text-[#d4af37]">
                            <Star size={12} fill="#d4af37" stroke="none" />
                            <Star size={12} fill="#d4af37" stroke="none" />
                            <Star size={12} fill="#d4af37" stroke="none" />
                            <Star size={12} fill="#d4af37" stroke="none" />
                            <Star size={12} fill={bookmaker.rating >= 9 ? "#d4af37" : "none"} strokeWidth={bookmaker.rating >= 9 ? 0 : 2} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#222] p-3 rounded mb-4 flex-1 flex items-center justify-center text-center">
                <p className="text-white font-medium text-sm leading-tight">
                    {bookmaker.bonus}
                </p>
            </div>

            <div className="flex justify-between items-center gap-2 mb-4">
                <Link href={bookmaker.reviewUrl} className="text-[#0066cc] hover:text-[#3388dd] hover:underline text-sm font-semibold transition-colors">
                    Read Review
                </Link>
                <span className="text-[10px] text-[#555]">18+ T&C apply</span>
            </div>

            <div className="mt-auto space-y-2">
                {bookmaker.promoCode && (
                    <button
                        onClick={handleCopy}
                        className="flex items-center justify-between w-full bg-[#111] border border-dashed border-[#555] px-3 py-2 rounded hover:border-[#d4af37] transition-colors relative group"
                    >
                        <span className="text-[#777] text-xs font-semibold group-hover:text-white transition-colors">Code:</span>
                        <span className="text-white font-mono font-bold">{bookmaker.promoCode}</span>
                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-[#555] group-hover:text-[#d4af37] transition-colors" />}

                        {copied && (
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] py-1 px-2 rounded font-medium">
                                Copied!
                            </div>
                        )}
                    </button>
                )}
                <Link href={bookmaker.affiliateUrl} className="btn-primary w-full py-2.5 shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:shadow-none transition-shadow">
                    Bet Here
                </Link>
            </div>
        </div>
    );
}
