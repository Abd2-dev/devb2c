import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { leagues } from '@/lib/data/predictions';
import PredictionCard from '@/components/ui/PredictionCard';
import connectToDatabase from '@/lib/mongodb';
import { Prediction } from '@/lib/models/Prediction';

export const dynamic = 'force-dynamic';

export default async function LeaguePredictionsPage({ params }: { params: { slug: string } }) {
    const league = leagues.find(l => l.slug === params.slug);

    if (!league) {
        notFound();
    }

    await connectToDatabase();
    const docs = await Prediction.find({ 'league.name': league.name }).lean();
    const leaguePreds = docs.map((doc: any) => {
        const plain = JSON.parse(JSON.stringify(doc));
        plain.id = plain.slug || plain._id;
        if (doc.publishedAt) {
            plain.publishedAt = new Date(doc.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        }
        return plain;
    });

    return (
        <div className="bg-[#111111] min-h-screen pb-16">
            <div className="bg-[#1a1a1a] border-b border-[#333] pt-12 pb-16">
                <div className="container-main">
                    <div className="text-sm text-[#777] mb-4 flex items-center gap-2">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <Link href="/football-predictions" className="hover:text-white transition-colors">Predictions</Link>
                        <ChevronRight size={14} />
                        <span className="text-white">{league.name}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 flex items-center gap-4">
                        <span className="text-5xl">{league.flag}</span>
                        {league.name} Predictions
                    </h1>
                    <p className="text-[#b0b0b0] max-w-3xl text-lg leading-relaxed">
                        Expert {league.name} betting tips, odds, and match previews. Our analysts cover all {league.country} football predictions.
                    </p>
                </div>
            </div>

            <div className="container-main mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar: Leagues */}
                <div className="lg:col-span-1">
                    <div className="bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden sticky top-24">
                        <div className="bg-[#222] p-4 border-b border-[#333]">
                            <h3 className="text-lg font-bold text-white">Other Leagues</h3>
                        </div>
                        <ul className="divide-y divide-[#333] flex flex-col">
                            {leagues.map((l) => (
                                <li key={l.slug}>
                                    <Link
                                        href={`/football-predictions/league/${l.slug}`}
                                        className={`flex justify-between items-center p-4 group transition-colors ${l.slug === league.slug ? 'bg-[#0066cc]/10 border-l-4 border-[#0066cc]' : 'hover:bg-[#222]'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{l.flag}</span>
                                            <span className={`font-semibold transition-colors ${l.slug === league.slug ? 'text-white' : 'text-[#b0b0b0] group-hover:text-white'}`}>{l.name}</span>
                                        </div>
                                        <ChevronRight size={16} className={`${l.slug === league.slug ? 'text-[#0066cc]' : 'text-[#555] group-hover:text-[#0066cc]'} transition-colors`} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Main Content: Predictions */}
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {leaguePreds.map(pred => (
                            <PredictionCard key={pred.id} prediction={pred} />
                        ))}
                    </div>

                    {leaguePreds.length === 0 && (
                        <div className="text-center text-[#777] py-12 bg-[#1a1a1a] rounded-xl border border-[#333]">
                            No {league.name} predictions available at the moment. Check back later!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
