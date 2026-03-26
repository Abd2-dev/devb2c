import Link from 'next/link';
import { ChevronRight, Star, ArrowRight } from 'lucide-react';
import { casinos } from '@/lib/data/casinos';

export default function OnlineCasinosPage() {
    return (
        <div className="bg-[#111111] min-h-screen pb-16">

            {/* Header section */}
            <div className="bg-[#1a1a1a] border-b border-[#333] pt-12 pb-16 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-1/3 h-full bg-[#d4af37]/5 blur-3xl rounded-full pointer-events-none"></div>

                <div className="container-main relative z-10">
                    <div className="text-sm text-[#777] mb-4 flex items-center gap-2 uppercase tracking-wide font-bold">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <span className="text-white">Online Casinos</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Best Online Casinos for 2026</h1>
                    <p className="text-[#b0b0b0] max-w-3xl text-lg leading-relaxed mb-8">
                        Looking for a safe, licensed online casino with fast payouts and huge welcome bonuses?
                        Our experts have reviewed and ranked the top casino sites for slots, roulette, blackjack, and live dealer games.
                    </p>
                </div>
            </div>

            <div className="container-main mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden sticky top-24">
                        <div className="bg-[#222] p-4 border-b border-[#333]">
                            <h3 className="text-lg font-bold text-white">Casino Categories</h3>
                        </div>
                        <ul className="divide-y divide-[#333] flex flex-col p-2">
                            <li>
                                <Link href="#" className="flex justify-between items-center p-3 text-white font-semibold bg-[#222] rounded m-2">
                                    All Casinos
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="flex justify-between items-center p-3 text-[#b0b0b0] hover:text-white hover:bg-[#222] rounded mx-2 transition-colors group">
                                    New Casinos <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#d4af37]" />
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="flex justify-between items-center p-3 text-[#b0b0b0] hover:text-white hover:bg-[#222] rounded mx-2 transition-colors group">
                                    Live Dealer <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#d4af37]" />
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="flex justify-between items-center p-3 text-[#b0b0b0] hover:text-white hover:bg-[#222] rounded mx-2 transition-colors group">
                                    Mobile Casinos <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#d4af37]" />
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="flex justify-between items-center p-3 text-[#b0b0b0] hover:text-white hover:bg-[#222] rounded mx-2 transition-colors group">
                                    Crypto Casinos <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#d4af37]" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-4">

                    {casinos.map((casino) => (
                        <div key={casino.id} className="bg-[#1c1c1c] border border-[#333] hover:border-[#555] rounded-xl p-4 md:p-6 flex flex-col md:flex-row gap-6 items-center transition-colors">

                            {/* Logo */}
                            <div
                                className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-lg shrink-0"
                                style={{ backgroundColor: casino.logoColor }}
                            >
                                {casino.logo}
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                                    <h3 className="text-2xl font-bold text-white">{casino.name}</h3>
                                    <div className="flex items-center justify-center md:justify-start gap-1 bg-[#222] px-2 py-1 rounded">
                                        <Star size={14} className="text-[#d4af37]" fill="#d4af37" />
                                        <span className="text-white font-bold text-sm">{casino.rating}/10</span>
                                    </div>
                                </div>

                                <p className="text-[#d4af37] font-bold text-xl mb-3">
                                    {casino.bonus}
                                </p>

                                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                    {casino.casinoType.map(type => (
                                        <span key={type} className="bg-[#111] border border-[#333] text-[#777] text-xs px-2 py-1 rounded uppercase tracking-wider font-semibold">
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="w-full md:w-48 flex items-center flex-col gap-3 shrink-0">
                                <Link href={casino.affiliateUrl} className="btn-gold w-full py-3 text-base shadow-[0_4px_15px_rgba(212,175,55,0.2)] hover:shadow-[0_4px_20px_rgba(212,175,55,0.4)]">
                                    Play Now
                                </Link>
                                <Link href={casino.reviewUrl} className="text-[#0066cc] hover:text-[#3388dd] text-sm font-semibold flex items-center gap-1 transition-colors group">
                                    Read Full Review <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <span className="text-[10px] text-[#555]">18+ T&C Apply</span>
                            </div>

                        </div>
                    ))}

                    <div className="mt-12 p-8 bg-[#1a1a1a] border border-[#333] rounded-xl">
                        <h2 className="text-2xl font-bold text-white mb-4">How to choose the perfect online casino</h2>
                        <div className="grid md:grid-cols-2 gap-8 mt-6">
                            <div>
                                <h4 className="text-[#d4af37] font-bold mb-2 break-words">1. Licensing and Security</h4>
                                <p className="text-[#b0b0b0] text-sm leading-relaxed">Never play at an unlicensed casino. We only list sites regulated by respected authorities like the UKGC, MGA, or reliable Curacao master licenses ensuring fair play and secure transactions.</p>
                            </div>
                            <div>
                                <h4 className="text-[#d4af37] font-bold mb-2">2. Game Selection</h4>
                                <p className="text-[#b0b0b0] text-sm leading-relaxed">The best casinos partner with top tier game providers (NetEnt, Microgaming, Evolution). Look for a mix of high-RTP slots, classic table games, and immersive live dealer lobbies.</p>
                            </div>
                            <div>
                                <h4 className="text-[#d4af37] font-bold mb-2">3. Bonus Terms</h4>
                                <p className="text-[#b0b0b0] text-sm leading-relaxed">A huge bonus means nothing if the wagering requirements are 60x. We analyze the T&Cs to find bonuses with realistic playthrough requirements and fair time limits.</p>
                            </div>
                            <div>
                                <h4 className="text-[#d4af37] font-bold mb-2">4. Payment Methods</h4>
                                <p className="text-[#b0b0b0] text-sm leading-relaxed">Fast withdrawals are crucial. Top casinos process e-wallet and crypto payments within 24 hours, without hiding behind endless verification bureaucracy.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
