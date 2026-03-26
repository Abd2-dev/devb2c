'use client';

import { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';
import { bookmakers } from '@/lib/data/bookmakers';
import Link from 'next/link';

export default function PromoPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    // We'll showcase Melbet as per specification
    const promoBookmaker = bookmakers.find(b => b.slug === 'melbet') || bookmakers[0];

    useEffect(() => {
        setHasMounted(true);

        // Check if user has already seen popup in this session
        const hasSeenPopup = sessionStorage.getItem('mightytips_promo_seen');

        if (!hasSeenPopup) {
            // Show after 3 seconds delay
            const timer = setTimeout(() => {
                setIsOpen(true);
                sessionStorage.setItem('mightytips_promo_seen', 'true');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, []);

    if (!hasMounted || !isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
                onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <div className="relative bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl w-full max-w-md animate-slide-up border border-[#333]">
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-3 text-[#b0b0b0] hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-1.5 transition-all z-10"
                >
                    <X size={20} />
                </button>

                {/* Dynamic Background Area */}
                <div className="h-32 bg-gradient-to-br from-[#0047BB]/60 to-[#001D4A] relative flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>

                    <div className="h-20 w-20 bg-white rounded-xl shadow-lg flex items-center justify-center ml-auto mr-auto mt-16 z-10 p-2 transform -rotate-3 border-4 border-[#1a1a1a]">
                        {/* Logo placeholder - using text to simulate logo */}
                        <span className="font-black text-[#0047BB] text-xl tracking-tighter">{promoBookmaker.logo}</span>
                    </div>
                </div>

                <div className="pt-12 px-8 pb-8 text-center flex flex-col items-center">
                    <div className="inline-flex items-center gap-1.5 text-[#d4af37] font-bold text-sm mb-3 uppercase tracking-wider">
                        <Gift size={16} /> Exclusive Offer
                    </div>

                    <h2 className="text-2xl font-black text-white mb-2 leading-tight">
                        €100 on the start!
                    </h2>

                    <p className="text-[#b0b0b0] mb-6">
                        Get your welcome bonus from <span className="font-bold text-white">{promoBookmaker.name}</span> up to €100 when you sign up through MightyTips.
                    </p>

                    <Link
                        href={promoBookmaker.affiliateUrl}
                        className="w-full bg-[#0066cc] hover:bg-[#0055aa] text-white font-bold py-3.5 px-4 rounded-lg transform hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(0,102,204,0.4)] transition-all duration-300"
                        onClick={() => setIsOpen(false)}
                    >
                        Take Bonus
                    </Link>

                    <button
                        className="mt-4 text-[#777] hover:text-[#b0b0b0] text-sm underline transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        No thanks, maybe later
                    </button>

                    <div className="mt-8 text-[10px] text-[#555] flex flex-wrap justify-center items-center gap-2">
                        <span>18+ T&C apply</span>
                        <span>•</span>
                        <Link href="https://www.begambleaware.org/" target="_blank" className="hover:text-[#777]">
                            GambleAware.org
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
