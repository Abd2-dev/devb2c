import Link from 'next/link';
import { ChevronRight, Filter, Search, Gift } from 'lucide-react';
import BookmakerCard from '@/components/ui/BookmakerCard';
import connectToDatabase from '@/lib/mongodb';
import { Bookmaker } from '@/lib/models/Bookmaker';

export const dynamic = 'force-dynamic';

export default async function BonusesPage() {
    await connectToDatabase();

    const docs = await Bookmaker.find({ bonus: { $ne: '' } }).sort({ rating: -1 }).lean();

    const mapDoc = (doc: any) => {
        const plain = JSON.parse(JSON.stringify(doc));
        plain.id = plain.slug || plain._id;
        return plain;
    };

    const topBonusBookies = docs.map(mapDoc) as any[];

    return (
        <div className="bg-[#111111] min-h-screen pb-16">

            {/* Header section */}
            <div className="bg-[#1a1a1a] border-b border-[#333] pt-12 pb-16">
                <div className="container-main">
                    <div className="text-sm text-[#777] mb-4 flex items-center gap-2 uppercase tracking-wide font-bold">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <span className="text-white">Betting Bonuses</span>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-[#d4af37]/10 text-[#d4af37] p-3 rounded-xl border border-[#d4af37]/20">
                            <Gift size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white">Best Betting Offers & Promos</h1>
                    </div>

                    <p className="text-[#b0b0b0] max-w-3xl text-lg leading-relaxed mb-8">
                        Claim the biggest welcome bonuses, free bets, and deposit matches from top bookmakers.
                        We verify all promo codes and read the terms and conditions so you know exactly what you're getting.
                    </p>

                </div>
            </div>

            <div className="container-main mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden sticky top-24">
                        <div className="bg-[#222] p-4 border-b border-[#333]">
                            <h3 className="text-lg font-bold text-white">Bonus Types</h3>
                        </div>
                        <ul className="divide-y divide-[#333] flex flex-col p-4 space-y-3">
                            <li>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="w-5 h-5 rounded border border-[#d4af37] bg-[#d4af37] flex items-center justify-center">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                    <span className="text-white font-semibold">All Offers</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="w-5 h-5 rounded border border-[#555] bg-[#111] group-hover:border-[#d4af37] transition-colors"></div>
                                    <span className="text-[#b0b0b0] group-hover:text-white font-semibold transition-colors">Free Bets</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="w-5 h-5 rounded border border-[#555] bg-[#111] group-hover:border-[#d4af37] transition-colors"></div>
                                    <span className="text-[#b0b0b0] group-hover:text-white font-semibold transition-colors">Deposit Match</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="w-5 h-5 rounded border border-[#555] bg-[#111] group-hover:border-[#d4af37] transition-colors"></div>
                                    <span className="text-[#b0b0b0] group-hover:text-white font-semibold transition-colors">No Deposit Bonus</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">

                    <div className="bg-[#1c1c1c] border border-[#d4af37]/30 shadow-[0_0_20px_rgba(212,175,55,0.1)] rounded-xl p-6 mb-8 flex flex-wrap gap-4 items-center justify-between">
                        <h2 className="text-xl font-bold text-white flex gap-2 items-center">
                            <span className="text-[#d4af37]">★</span> Verified Promo Codes
                        </h2>
                        <p className="text-[#b0b0b0] text-sm">Use our exclusive codes during registration for max value.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {topBonusBookies.map(bookie => (
                            <BookmakerCard key={bookie.id} bookmaker={bookie} variant="grid" />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
