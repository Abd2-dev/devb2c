import Link from 'next/link';
import { ChevronRight, Filter, Search, Smartphone } from 'lucide-react';
import BookmakerCard from '@/components/ui/BookmakerCard';
import connectToDatabase from '@/lib/mongodb';
import { Bookmaker } from '@/lib/models/Bookmaker';

export const dynamic = 'force-dynamic';

export default async function BettingAppsPage() {
    await connectToDatabase();

    const docs = await Bookmaker.find().sort({ rating: -1 }).limit(6).lean();
    const mapDoc = (doc: any) => {
        const plain = JSON.parse(JSON.stringify(doc));
        plain.id = plain.slug || plain._id;
        return plain;
    };
    const topAppBookies = docs.map(mapDoc) as any[];

    return (
        <div className="bg-[#111111] min-h-screen pb-16">

            {/* Header section */}
            <div className="bg-[#1a1a1a] border-b border-[#333] pt-12 pb-16">
                <div className="container-main">
                    <div className="text-sm text-[#777] mb-4 flex items-center gap-2 uppercase tracking-wide font-bold">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <Link href="/bookmakers" className="hover:text-white transition-colors">Bookmakers</Link>
                        <ChevronRight size={14} />
                        <span className="text-white">Betting Apps</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Best Betting Apps in 2026</h1>
                    <p className="text-[#b0b0b0] max-w-3xl text-lg leading-relaxed mb-8">
                        Compare the highest-rated sports betting applications for Android and iOS.
                        We rank mobile sportsbooks based on speed, usability, live streaming capabilities, and mobile-exclusive bonuses.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1 max-w-md">
                            <input
                                type="text"
                                placeholder="Search apps..."
                                className="w-full bg-[#222] border border-[#444] rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#0066cc] transition-colors"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]" size={20} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-main mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden sticky top-24">
                        <div className="bg-[#222] p-4 border-b border-[#333]">
                            <h3 className="text-lg font-bold text-white">Filter by OS</h3>
                        </div>
                        <ul className="divide-y divide-[#333] flex flex-col p-4 space-y-3">
                            <li>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="w-5 h-5 rounded border border-[#0066cc] bg-[#0066cc] flex items-center justify-center">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                    <span className="text-white font-semibold">All Apps</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="w-5 h-5 rounded border border-[#555] bg-[#111] group-hover:border-[#0066cc] transition-colors"></div>
                                    <span className="text-[#b0b0b0] group-hover:text-white font-semibold transition-colors">Android Apps</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="w-5 h-5 rounded border border-[#555] bg-[#111] group-hover:border-[#0066cc] transition-colors"></div>
                                    <span className="text-[#b0b0b0] group-hover:text-white font-semibold transition-colors">iOS (iPhone) Apps</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">

                    <div className="bg-gradient-to-r from-[#003da6] to-[#001d4d] rounded-xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center justify-between shadow-[0_10px_30px_rgba(0,102,204,0.2)]">
                        <div className="md:w-2/3 mb-6 md:mb-0">
                            <span className="badge bg-white text-[#0066cc] px-3 py-1 text-xs mb-3 inline-block font-bold">Recommended</span>
                            <h2 className="text-3xl font-black text-white mb-2">Our Top Mobile Pick: Bet365</h2>
                            <p className="text-[#b0b0b0] text-sm md:text-base leading-relaxed mb-4">
                                The most responsive in-play betting interface, comprehensive live streaming, and robust cash-out features.
                            </p>
                            <div className="flex gap-4">
                                <Link href="#" className="bg-white text-black hover:bg-[#f0f0f0] px-5 py-2.5 rounded-lg font-bold shadow-lg transition-colors flex items-center gap-2">
                                    <Smartphone size={18} /> Download App
                                </Link>
                            </div>
                        </div>

                        <div className="md:w-1/3 flex justify-center w-full">
                            <div className="w-48 h-64 bg-[#111] rounded-2xl border-4 border-[#333] shadow-2xl relative overflow-hidden flex flex-col">
                                <div className="h-4 bg-[#222] border-b border-[#444] w-full mt-2 mx-4 rounded-full flex justify-center">
                                    <div className="w-16 h-1 bg-black rounded-b-lg"></div>
                                </div>
                                <div className="flex-1 bg-[#1a1a1a] m-1 rounded-xl flex flex-col items-center justify-center p-4">
                                    <div className="text-white text-xl font-bold mb-4">Live In-Play</div>
                                    <div className="w-full h-8 bg-[#333] rounded animate-pulse mb-3"></div>
                                    <div className="w-full h-8 bg-[#333] rounded animate-pulse mb-3"></div>
                                    <div className="w-full h-8 bg-[#333] rounded animate-pulse delay-75"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-black text-white mb-6">Top Rated Sportsbooks for Mobile</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {topAppBookies.map(bookie => (
                            <BookmakerCard key={bookie.id} bookmaker={bookie} variant="grid" />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
