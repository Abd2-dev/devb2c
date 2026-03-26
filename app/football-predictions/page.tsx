import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { leagues } from '@/lib/data/predictions';
import PredictionCard from '@/components/ui/PredictionCard';

import connectToDatabase from '@/lib/mongodb';
import { Prediction } from '@/lib/models/Prediction';

export const dynamic = 'force-dynamic';

export default async function FootballPredictionsPage() {
    await connectToDatabase();

    // Fetch predictions from MongoDB
    const allPredictionsDocs = await Prediction.find({ predictionType: { $ne: 'accumulator' } }).sort({ matchDate: 1 }).lean();

    const mapDoc = (doc: any) => {
        const plain = JSON.parse(JSON.stringify(doc));
        plain.id = plain.slug || plain._id;
        if (doc.publishedAt) {
            const d = new Date(doc.publishedAt);
            plain.publishedAt = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        }
        return plain;
    };

    const allPredictions = allPredictionsDocs.map(mapDoc);

    const getPredictionsByLeague = (leagueSlug: string) =>
        allPredictions.filter((p: any) => p.leagueSlug === leagueSlug);

    return (
        <div className="bg-[#111111] min-h-screen pb-16">
            <div className="bg-[#1a1a1a] border-b border-[#333] pt-12 pb-16">
                <div className="container-main">
                    <div className="text-sm text-[#777] mb-4 flex items-center gap-2">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <span className="text-white">Football Predictions</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Football Predictions</h1>
                    <p className="text-[#b0b0b0] max-w-3xl text-lg leading-relaxed">
                        Free football predictions and betting tips for today & tomorrow's matches. Our experts analyze team form, statistics, and tactical matchups to give you the most accurate forecasts.
                    </p>

                    <div className="flex flex-wrap gap-2 mt-8">
                        <Link href="/football-predictions/today" className="bg-[#0066cc] text-white px-4 py-2 font-bold rounded-lg transition-colors hover:bg-[#0055aa]">Today</Link>
                        <Link href="/football-predictions/tomorrow" className="bg-[#222] text-[#b0b0b0] hover:text-white hover:bg-[#333] px-4 py-2 font-bold rounded-lg transition-colors">Tomorrow</Link>
                        <Link href="/football-predictions/weekend" className="bg-[#222] text-[#b0b0b0] hover:text-white hover:bg-[#333] px-4 py-2 font-bold rounded-lg transition-colors">Weekend</Link>
                    </div>
                </div>
            </div>

            <div className="container-main mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Sidebar: Leagues */}
                <div className="lg:col-span-1">
                    <div className="bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden sticky top-24">
                        <div className="bg-[#222] p-4 border-b border-[#333]">
                            <h3 className="text-lg font-bold text-white">Top Leagues</h3>
                        </div>
                        <ul className="divide-y divide-[#333] flex flex-col">
                            {leagues.map((league) => (
                                <li key={league.slug}>
                                    <Link
                                        href={`/football-predictions/league/${league.slug}`}
                                        className="flex justify-between items-center p-4 hover:bg-[#222] group transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{league.flag}</span>
                                            <span className="font-semibold text-[#b0b0b0] group-hover:text-white transition-colors">{league.name}</span>
                                        </div>
                                        <ChevronRight size={16} className="text-[#555] group-hover:text-[#0066cc] transition-colors" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Main Content: Predictions */}
                <div className="lg:col-span-3 flex flex-col gap-12">
                    {['premier-league', 'la-liga', 'serie-a', 'bundesliga'].map(leagueSlug => {
                        const league = leagues.find(l => l.slug === leagueSlug);
                        const leaguePreds = getPredictionsByLeague(leagueSlug);

                        if (!leaguePreds.length) return null;

                        return (
                            <section key={leagueSlug}>
                                <div className="flex justify-between items-center mb-6 border-b border-[#333] pb-2">
                                    <h2 className="text-2xl font-black text-white flex items-center gap-2">
                                        {league?.flag} {league?.name} Predictions
                                    </h2>
                                    <Link href={`/football-predictions/league/${leagueSlug}`} className="text-[#0066cc] hover:text-[#3388dd] font-semibold text-sm transition-colors">
                                        View all
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {leaguePreds.map((pred: any) => (
                                        <PredictionCard key={pred.id} prediction={pred} />
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
