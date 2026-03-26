import Link from 'next/link';
import { AccumulatorTip } from '@/lib/data/predictions';
import { getAuthorBySlug } from '@/lib/data/authors';
import { bookmakers } from '@/lib/data/bookmakers';

interface AccumulatorCardProps {
    tip: AccumulatorTip;
}

export default function AccumulatorCard({ tip }: AccumulatorCardProps) {
    const author = getAuthorBySlug(tip.authorId);
    const featuredBookmakers = bookmakers.filter(b => b.featured).slice(0, 3);

    return (
        <div className="card-base card-hover flex flex-col md:flex-row h-full bg-[#1c1c1c] p-0 overflow-hidden">

            {/* Left side: Match Info & Author */}
            <div className="md:w-3/5 p-6 border-b md:border-b-0 md:border-r border-[#333] flex flex-col justify-between">

                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="badge-blue px-3 py-1.5">{tip.betType}</span>
                        <span className="text-[#777] text-xs font-semibold">{tip.league} • {tip.matchTime}</span>
                    </div>

                    <div className="flex items-center gap-4 mb-4 bg-[#111] p-4 rounded-lg border border-[#333]">
                        {/* Teams display simplified */}
                        <div className="flex-1 flex justify-end items-center gap-3">
                            <span className="font-bold text-white text-right md:text-sm">{tip.homeTeam.name}</span>
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-xs border border-[#444]"
                                style={{ backgroundColor: tip.homeTeam.color }}
                            >
                                {tip.homeTeam.shortName.substring(0, 3)}
                            </div>
                        </div>

                        <div className="w-8 flex items-center justify-center font-black text-[#555] italic">VS</div>

                        <div className="flex-1 flex justify-start items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-xs border border-[#444]"
                                style={{ backgroundColor: tip.awayTeam.color }}
                            >
                                {tip.awayTeam.shortName.substring(0, 3)}
                            </div>
                            <span className="font-bold text-white text-left md:text-sm">{tip.awayTeam.name}</span>
                        </div>
                    </div>

                    <p className="text-[#b0b0b0] text-sm leading-relaxed mb-4">
                        {tip.description}
                    </p>

                    <Link href={`/football-predictions/${tip.slug}`} className="text-[#0066cc] hover:text-[#3388dd] font-semibold text-sm inline-flex items-center gap-1 group">
                        Read full prediction
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>

                {author && (
                    <div className="flex items-center gap-3 pt-4 border-t border-[#333]">
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold border border-[#444]"
                            style={{ backgroundColor: author.avatarColor }}
                        >
                            {author.avatar}
                        </div>
                        <div>
                            <div className="text-xs text-[#777] font-semibold uppercase tracking-wide">Tipster</div>
                            <Link href={`/author/${author.slug}`} className="text-white hover:text-[#d4af37] text-sm font-bold transition-colors">
                                {author.name}
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Right side: Odds Table */}
            <div className="md:w-2/5 p-6 bg-[#222]">
                <h3 className="gold-text font-bold mb-4 flex items-center gap-2">
                    <span>Odds Comparison</span>
                    <div className="h-px bg-gradient-to-r from-[#d4af37] to-transparent flex-1 opacity-30"></div>
                </h3>

                <table className="odds-table w-full">
                    <thead>
                        <tr>
                            <th className="text-left w-1/3 text-xs text-[#777] font-bold">Bookmaker</th>
                            <th className="w-1/3 text-xs text-[#777] font-bold">Value</th>
                            <th className="text-right w-1/3 text-xs text-[#777] font-bold">Bet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {featuredBookmakers.map((bookmaker, idx) => {
                            // Simulate slight odds variations
                            const oddsVariation = tip.odds + (idx === 0 ? 0 : idx === 1 ? -0.05 : 0.05);

                            return (
                                <tr key={bookmaker.id} className="border-b border-[#333] hover:bg-[#2a2a2a] transition-colors">
                                    <td className="py-3 items-center">
                                        <span className="font-bold text-white text-sm block">{bookmaker.name}</span>
                                        <span className="text-[#d4af37] text-[10px] bg-[#d4af37]/10 px-1.5 py-0.5 rounded flex items-center w-max gap-1">
                                            ★ {bookmaker.rating}
                                        </span>
                                    </td>
                                    <td className="py-3 text-center">
                                        <span className="text-xl font-black text-white">{oddsVariation.toFixed(2)}</span>
                                    </td>
                                    <td className="py-3 text-right">
                                        <Link href={bookmaker.affiliateUrl} className="btn-gold py-1.5 px-3 text-xs shadow-md">
                                            Bet Here
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div className="mt-4 pt-3 border-t border-[#333] text-[10px] text-[#555] text-center leading-tight">
                    Odds correct at time of publishing. Offers subject to change. 18+ T&C Apply.
                </div>
            </div>

        </div>
    );
}
