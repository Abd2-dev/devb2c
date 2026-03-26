import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Filter } from 'lucide-react';
import { bookmakersByRegion } from '@/lib/data/casinos';
import BookmakerCard from '@/components/ui/BookmakerCard';
import connectToDatabase from '@/lib/mongodb';
import { Bookmaker } from '@/lib/models/Bookmaker';

export const dynamic = 'force-dynamic';

export default async function BookmakerCategoryPage({ params }: { params: { category: string } }) {
    const { category } = params;

    // Normalize category slug for matching
    const normalizedCategory = category.toLowerCase().replace(/-/g, ' ');

    // Check if it's a region
    const regions = Object.keys(bookmakersByRegion);
    const matchedRegion = regions.find(r => r.toLowerCase() === normalizedCategory);

    await connectToDatabase();
    let query: any = {};
    let title = '';
    let description = '';

    if (matchedRegion) {
        title = `Best Betting Sites in ${matchedRegion}`;
        description = `Find the most trusted and legally compliant bookmakers available in ${matchedRegion}. We review localized payment methods, currencies, and exclusive regional bonuses.`;

        // Flatten the bookmaker slugs for this region
        const regionCountries = bookmakersByRegion[matchedRegion as keyof typeof bookmakersByRegion];
        const regionSlugs = new Set<string>();
        Object.values(regionCountries).forEach(slugs => {
            slugs.forEach(slug => regionSlugs.add(slug));
        });

        query = { slug: { $in: Array.from(regionSlugs) } };

    } else if (category === 'payment-methods') {
        title = 'Betting Sites by Payment Methods';
        description = 'Compare bookmakers based on their supported deposit and withdrawal options including PayPal, Crypto, Skrill, and local banking methods.';

    } else if (category === 'new-bookmakers') {
        title = 'New Bookmakers & Betting Sites';
        description = 'Discover the latest sports betting sites to hit the market. Grab massive welcome bonuses from ambitious new brands trying to win your business.';

    } else {
        notFound();
    }

    let docs = [];
    if (category === 'payment-methods') {
        // Find all and sort by paymentMethods length in memory since MongoDB can't easily sort by array length without aggregation
        const all = await Bookmaker.find().lean();
        docs = all.sort((a: any, b: any) => (b.paymentMethods?.length || 0) - (a.paymentMethods?.length || 0));
    } else if (category === 'new-bookmakers') {
        docs = await Bookmaker.find().sort({ rating: -1 }).limit(4).lean();
    } else {
        docs = await Bookmaker.find(query).lean();
    }

    const mapDoc = (doc: any) => {
        const plain = JSON.parse(JSON.stringify(doc));
        plain.id = plain.slug || plain._id;
        return plain;
    };

    const specificBookmakers = docs.map(mapDoc) as any[];

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
                        <span className="text-white">{matchedRegion || title.replace('Betting Sites ', '')}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6">{title}</h1>
                    <p className="text-[#b0b0b0] max-w-3xl text-lg leading-relaxed mb-8">
                        {description}
                    </p>
                </div>
            </div>

            <div className="container-main mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden sticky top-24">
                        <div className="bg-[#222] p-4 border-b border-[#333]">
                            <h3 className="text-lg font-bold text-white">Regions</h3>
                        </div>
                        <ul className="divide-y divide-[#333] flex flex-col">
                            {regions.map(region => (
                                <li key={region}>
                                    <Link
                                        href={`/bookmakers/${region.toLowerCase().replace(/\s+/g, '-')}`}
                                        className={`flex justify-between items-center p-4 transition-colors group ${matchedRegion === region ? 'bg-[#222] border-l-4 border-[#0066cc]' : 'hover:bg-[#222]'}`}
                                    >
                                        <span className={`font-semibold ${matchedRegion === region ? 'text-white' : 'text-[#b0b0b0] group-hover:text-white'}`}>{region}</span>
                                        <ChevronRight size={16} className={`${matchedRegion === region ? 'text-[#0066cc]' : 'text-[#555] group-hover:text-[#0066cc]'}`} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden">
                        <div className="bg-[#222] p-4 border-b border-[#333]">
                            <h3 className="text-lg font-bold text-white">Other Categories</h3>
                        </div>
                        <ul className="divide-y divide-[#333] flex flex-col">
                            <li>
                                <Link
                                    href="/bookmakers/payment-methods"
                                    className={`flex justify-between items-center p-4 transition-colors group ${category === 'payment-methods' ? 'bg-[#222] border-l-4 border-[#0066cc]' : 'hover:bg-[#222]'}`}
                                >
                                    <span className={`font-semibold ${category === 'payment-methods' ? 'text-white' : 'text-[#b0b0b0] group-hover:text-white'}`}>Payment Methods</span>
                                    <ChevronRight size={16} className={`${category === 'payment-methods' ? 'text-[#0066cc]' : 'text-[#555] group-hover:text-[#0066cc]'}`} />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/bookmakers/new-bookmakers"
                                    className={`flex justify-between items-center p-4 transition-colors group ${category === 'new-bookmakers' ? 'bg-[#222] border-l-4 border-[#0066cc]' : 'hover:bg-[#222]'}`}
                                >
                                    <span className={`font-semibold ${category === 'new-bookmakers' ? 'text-white' : 'text-[#b0b0b0] group-hover:text-white'}`}>New Bookmakers</span>
                                    <ChevronRight size={16} className={`${category === 'new-bookmakers' ? 'text-[#0066cc]' : 'text-[#555] group-hover:text-[#0066cc]'}`} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">

                    {/* Special Payment Methods UI */}
                    {category === 'payment-methods' && (
                        <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 mb-8 flex flex-wrap gap-3 items-center">
                            <span className="text-sm font-bold text-white uppercase tracking-wider mr-2">Quick Filter:</span>
                            {['PayPal', 'Visa', 'Mastercard', 'Skrill', 'Neteller', 'Crypto'].map(method => (
                                <button key={method} className="badge bg-[#222] border border-[#444] text-[#b0b0b0] hover:text-white px-4 py-2 hover:bg-[#333] transition-colors">{method}</button>
                            ))}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {specificBookmakers.map(bookmaker => (
                            <BookmakerCard key={bookmaker.id} bookmaker={bookmaker} variant="grid" />
                        ))}
                    </div>

                    {specificBookmakers.length === 0 && (
                        <div className="text-center text-[#777] py-12 bg-[#1a1a1a] rounded-xl border border-[#333]">
                            No bookmakers found for this category at the moment.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
