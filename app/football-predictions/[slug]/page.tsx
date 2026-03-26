import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Calendar, User, CheckCircle } from 'lucide-react';

import connectToDatabase from '@/lib/mongodb';
import { Prediction } from '@/lib/models/Prediction';
import { Author } from '@/lib/models/Author';

export const dynamic = 'force-dynamic';

export default async function PredictionDetailPage({ params }: { params: { slug: string } }) {
    await connectToDatabase();

    const predictionDoc = await Prediction.findOne({ slug: params.slug }).lean();

    if (!predictionDoc) {
        notFound();
    }

    const mapDoc = (doc: any) => {
        const plain = JSON.parse(JSON.stringify(doc));
        plain.id = plain.slug || plain._id;
        if (doc.publishedAt) {
            const d = new Date(doc.publishedAt);
            plain.publishedAt = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        }
        return plain;
    };

    const prediction = mapDoc(predictionDoc);

    let author = null;
    if (prediction.authorId) {
        const authorDoc = await Author.findOne({ slug: prediction.authorId }).lean();
        if (authorDoc) author = mapDoc(authorDoc);
    }

    return (
        <div className="bg-[#111111] min-h-screen pb-16">

            {/* Breadcrumb & Header section */}
            <div className="bg-[#1a1a1a] border-b border-[#333] pt-8 pb-12">
                <div className="container-main">
                    {/* Breadcrumb */}
                    <div className="text-xs text-[#777] mb-6 flex flex-wrap items-center gap-2 uppercase tracking-wide font-bold">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <Link href="/football-predictions" className="hover:text-white transition-colors">Predictions</Link>
                        <ChevronRight size={12} />
                        <Link href={`/football-predictions/league/${prediction.leagueSlug}`} className="hover:text-white transition-colors">{prediction.league}</Link>
                        <ChevronRight size={12} />
                        <span className="text-[#d4af37]">{prediction.homeTeam.name} vs {prediction.awayTeam.name}</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight max-w-4xl">
                        {prediction.homeTeam.name} vs {prediction.awayTeam.name} Prediction, Odds & Betting Tips
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-[#b0b0b0]">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-[#0066cc]" />
                            <span className="font-semibold">{prediction.matchDate}, {prediction.matchTime}</span>
                        </div>

                        {author && (
                            <Link href={`/author/${author.slug}`} className="flex items-center gap-2 hover:text-white group">
                                <User size={16} className="text-[#d4af37] group-hover:scale-110 transition-transform" />
                                <span>By <span className="font-bold text-white group-hover:text-[#d4af37] transition-colors">{author.name}</span></span>
                            </Link>
                        )}

                        <div className="bg-[#222] px-3 py-1 rounded text-xs font-bold border border-[#333]">
                            {prediction.league}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-main mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Match Scoreboard / Header */}
                    <div className="bg-[#1c1c1c] border border-[#333] rounded-2xl p-6 md:p-10 flex flex-col items-center justify-center relative shadow-lg overflow-hidden">
                        {/* Background elements */}
                        <div className="absolute top-0 left-0 w-1/2 h-full opacity-10" style={{ background: `linear-gradient(to right, ${prediction.homeTeam.color}, transparent)` }}></div>
                        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10" style={{ background: `linear-gradient(to left, ${prediction.awayTeam.color}, transparent)` }}></div>

                        <div className="text-[#b0b0b0] font-bold text-sm tracking-widest uppercase mb-8 relative z-10 bg-[#111] px-4 py-1.5 rounded-full border border-[#333]">
                            {prediction.league} Match
                        </div>

                        <div className="flex w-full justify-between items-center relative z-10 max-w-lg mx-auto">
                            {/* Home Team */}
                            <div className="flex flex-col items-center flex-1">
                                <div
                                    className="w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center font-bold text-white shadow-2xl mb-4 border-4 border-[#1a1a1a] text-xl md:text-3xl"
                                    style={{ backgroundColor: prediction.homeTeam.color }}
                                >
                                    {prediction.homeTeam.shortName.substring(0, 3)}
                                </div>
                                <span className="text-white font-black text-center text-lg md:text-xl">{prediction.homeTeam.name}</span>
                            </div>

                            {/* VS */}
                            <div className="px-6 relative">
                                <div className="absolute inset-0 bg-[#333] blur-xl opacity-30 rounded-full"></div>
                                <div className="bg-[#222] w-12 h-12 rounded-full border border-[#444] flex items-center justify-center text-[#777] font-black italic relative z-10">VS</div>
                            </div>

                            {/* Away Team */}
                            <div className="flex flex-col items-center flex-1">
                                <div
                                    className="w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center font-bold text-white shadow-2xl mb-4 border-4 border-[#1a1a1a] text-xl md:text-3xl"
                                    style={{ backgroundColor: prediction.awayTeam.color }}
                                >
                                    {prediction.awayTeam.shortName.substring(0, 3)}
                                </div>
                                <span className="text-white font-black text-center text-lg md:text-xl">{prediction.awayTeam.name}</span>
                            </div>
                        </div>
                    </div>

                    {/* Expert Prediction Box */}
                    <div className="bg-gradient-to-br from-[#002450] to-[#001024] p-[1px] rounded-xl shadow-[0_0_30px_rgba(0,102,204,0.1)]">
                        <div className="bg-[#111] rounded-[11px] p-6 md:p-8 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-2 h-full bg-[#0066cc]"></div>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-[#0066cc]/20 p-2 rounded-lg text-[#0066cc]">
                                    <CheckCircle size={28} />
                                </div>
                                <h2 className="text-2xl font-black text-white">Our Free Prediction</h2>
                            </div>

                            <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 mb-6">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-[#333] pb-4 mb-4">
                                    <div>
                                        <span className="text-xs text-[#777] font-bold uppercase tracking-wider block mb-1">Bet Type</span>
                                        <span className="text-xl font-bold text-white">{prediction.predictionLabel}</span>
                                    </div>
                                    <div className="text-left sm:text-right">
                                        <span className="text-xs text-[#777] font-bold uppercase tracking-wider block mb-1">Odds</span>
                                        <span className="text-3xl font-black text-[#d4af37]">{prediction.odds.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href="#" className="btn-primary flex-1 py-4 text-center text-lg shadow-[0_4px_15px_rgba(0,102,204,0.3)]">
                                        Bet Here
                                    </Link>
                                    <Link href="/bookmakers" className="btn-outline flex-1 py-4 text-center text-lg">
                                        Compare Odds
                                    </Link>
                                </div>
                                <p className="text-[10px] text-[#555] mt-4 text-center">18+ T&C apply. Odds verify at publishing and subject to change.</p>
                            </div>

                        </div>
                    </div>

                    {/* Match Analysis Section */}
                    <article className="prose prose-invert prose-lg max-w-none text-[#b0b0b0]">
                        <h2 className="text-2xl font-bold text-white mb-4">Match Analysis & Preview</h2>
                        <p className="mb-6">{prediction.description}</p>

                        <p className="mb-6">
                            This fixture historically provides plenty of talking points and given the current standing of both teams, we expect no different here.
                            The home side will look to utilize their raucous crowd and impose their high-intensity game plan right from the kickoff.
                        </p>

                        <h3 className="text-xl font-bold text-white mt-8 mb-4">{prediction.homeTeam.name} Form</h3>
                        <p className="mb-6">
                            Recent performances have shown a solid defensive foundation combined with lethal counter-attacking efficiency.
                            They come into this match confident and largely injury-free.
                        </p>

                        <h3 className="text-xl font-bold text-white mt-8 mb-4">{prediction.awayTeam.name} Form</h3>
                        <p className="mb-6">
                            The visitors have had highly variable results away from home. While capable of breaking down the best defenses,
                            they have shown occasional vulnerability to pace down the flanks.
                        </p>

                        <blockquote className="border-l-4 border-[#d4af37] pl-6 my-8 py-2 bg-[#1a1a1a] rounded-r-lg">
                            <p className="text-lg font-medium text-white m-0">
                                "The tactical battle in midfield will be the key to unlocking this particular fixture. Whichever team controls the tempo has an 80% likelihood of taking all three points."
                            </p>
                            {author && <footer className="text-sm text-[#777] mt-3">— {author.name}</footer>}
                        </blockquote>
                    </article>

                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">

                    {/* Author Box */}
                    {author && (
                        <div className="bg-[#1c1c1c] border border-[#333] rounded-xl overflow-hidden p-6 relative group">
                            <div
                                className="absolute top-0 right-0 w-full h-24 opacity-20 transition-opacity group-hover:opacity-30"
                                style={{ background: `linear-gradient(to bottom left, ${author.avatarColor}, transparent)` }}
                            ></div>

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div
                                    className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black text-white shadow-lg mb-4 border-[3px] border-[#111]"
                                    style={{ backgroundColor: author.avatarColor }}
                                >
                                    {author.avatar}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-1"><Link href={`/author/${author.slug}`} className="hover:text-[#d4af37] transition-colors">{author.name}</Link></h3>
                                <p className="text-sm text-[#0066cc] font-bold tracking-wide mb-4">{author.title}</p>

                                <p className="text-[#b0b0b0] text-sm mb-6 pb-6 border-b border-[#333]">
                                    {author.bio}
                                </p>

                                <Link href={`/author/${author.slug}`} className="text-[#0066cc] hover:text-[#3388dd] font-bold text-sm">
                                    View all predictions by {author.name}
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Quick Stats */}
                    <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 pb-2 border-b border-[#333]">Key Stats</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <div className="text-[#d4af37] mt-1 shrink-0"><CheckCircle size={16} /></div>
                                <div>
                                    <span className="font-bold text-white text-sm block mb-1">H2H Dominance</span>
                                    <span className="text-xs text-[#b0b0b0]">{prediction.homeTeam.name} has won 4 of the last 5 meetings.</span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <div className="text-[#d4af37] mt-1 shrink-0"><CheckCircle size={16} /></div>
                                <div>
                                    <span className="font-bold text-white text-sm block mb-1">Goal Fest</span>
                                    <span className="text-xs text-[#b0b0b0]">Over 2.5 goals landed in 75% of their combined fixtures this season.</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}
