import Link from 'next/link';
import { ChevronRight, Filter, Search } from 'lucide-react';
import BookmakerCard from '@/components/ui/BookmakerCard';
import connectToDatabase from '@/lib/mongodb';
import { Bookmaker } from '@/lib/models/Bookmaker';

export const dynamic = 'force-dynamic';

export default async function BookmakersPage() {
    await connectToDatabase();

    const bookmakersDocs = await Bookmaker.find({}).sort({ rating: -1 }).lean();

    const mapDoc = (doc: any) => {
        const plain = JSON.parse(JSON.stringify(doc));
        plain.id = plain.slug || plain._id;
        if (doc.publishedAt) {
            const d = new Date(doc.publishedAt);
            plain.publishedAt = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        }
        return plain;
    };

    const allBookmakers = bookmakersDocs.map(mapDoc) as any[];

    return (
        <div className="bg-[#111111] min-h-screen pb-16">

            {/* Header section */}
            <div className="bg-[#1a1a1a] border-b border-[#333] pt-12 pb-16">
                <div className="container-main">
                    <div className="text-sm text-[#777] mb-4 flex items-center gap-2 uppercase tracking-wide font-bold">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <span className="text-white">Bookmakers</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Best Betting Sites</h1>
                    <p className="text-[#b0b0b0] max-w-3xl text-lg leading-relaxed mb-8">
                        Compare the top-rated online bookmakers available in your region. We review bonuses, odds value, and user experience to help you find the perfect betting site.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1 max-w-md">
                            <input
                                type="text"
                                placeholder="Search bookmakers..."
                                className="w-full bg-[#222] border border-[#444] rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]" size={20} />
                        </div>

                        <button className="flex items-center justify-center gap-2 bg-[#222] hover:bg-[#333] border border-[#444] rounded-lg py-3 px-6 text-white font-bold transition-colors">
                            <Filter size={20} /> Filters
                        </button>
                    </div>
                </div>
            </div>

            <div className="container-main mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden">
                        <div className="bg-[#222] p-4 border-b border-[#333]">
                            <h3 className="text-lg font-bold text-white">Categories</h3>
                        </div>
                        <ul className="divide-y divide-[#333] flex flex-col">
                            <li>
                                <Link href="/bookmakers" className="flex justify-between items-center p-4 bg-[#222] border-l-4 border-[#0066cc]">
                                    <span className="font-bold text-white">All Bookmakers</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/bookmakers/betting-apps" className="flex justify-between items-center p-4 hover:bg-[#222] group transition-colors">
                                    <span className="font-semibold text-[#b0b0b0] group-hover:text-white">Betting Apps</span>
                                    <ChevronRight size={16} className="text-[#555] group-hover:text-[#0066cc]" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/bonuses" className="flex justify-between items-center p-4 hover:bg-[#222] group transition-colors">
                                    <span className="font-semibold text-[#b0b0b0] group-hover:text-white">Welcome Bonuses</span>
                                    <ChevronRight size={16} className="text-[#555] group-hover:text-[#0066cc]" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/bookmakers?filter=new" className="flex justify-between items-center p-4 hover:bg-[#222] group transition-colors">
                                    <span className="font-semibold text-[#b0b0b0] group-hover:text-white">New Bookmakers</span>
                                    <ChevronRight size={16} className="text-[#555] group-hover:text-[#0066cc]" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/bookmakers?filter=crypto" className="flex justify-between items-center p-4 hover:bg-[#222] group transition-colors">
                                    <span className="font-semibold text-[#b0b0b0] group-hover:text-white">Crypto Betting</span>
                                    <ChevronRight size={16} className="text-[#555] group-hover:text-[#0066cc]" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">

                    <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 mb-8 flex flex-wrap gap-3 items-center">
                        <span className="text-sm font-bold text-white uppercase tracking-wider mr-2">Sort by</span>
                        <button className="badge-gold px-4 py-2">Editor&apos;s Pick</button>
                        <button className="badge bg-[#222] border border-[#444] text-[#b0b0b0] hover:text-white px-4 py-2 hover:bg-[#333] transition-colors">Highest Bonus</button>
                        <button className="badge bg-[#222] border border-[#444] text-[#b0b0b0] hover:text-white px-4 py-2 hover:bg-[#333] transition-colors">Best Mobile App</button>
                        <button className="badge bg-[#222] border border-[#444] text-[#b0b0b0] hover:text-white px-4 py-2 hover:bg-[#333] transition-colors">Fast Payouts</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {allBookmakers.map(bookmaker => (
                            <BookmakerCard key={bookmaker.id} bookmaker={bookmaker} variant="grid" />
                        ))}
                    </div>

                    <div className="mt-12 p-8 bg-[#1a1a1a] border border-[#333] rounded-xl text-[#b0b0b0] prose prose-invert max-w-none">
                        <h2 className="text-2xl font-bold text-white mb-4">How we rate bookmakers</h2>
                        <p>
                            Our team of betting experts evaluates every sportsbook across dozens of criteria before featuring them on MightyTips.
                            We personally test the sign-up process, deposit methods, betting markets, and withdrawal speeds.
                        </p>
                        <ul>
                            <li><strong>Odds Value:</strong> We compare the betting margins across major sports to ensure you get value.</li>
                            <li><strong>Bonuses:</strong> We read the fine print to separate genuinely good offers from impossible wagering requirements.</li>
                            <li><strong>Usability:</strong> Both desktop sites and mobile apps are thoroughly tested for speed and intuitive design.</li>
                            <li><strong>Security:</strong> We only recommend bookmakers with valid licenses from recognized authorities.</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}
