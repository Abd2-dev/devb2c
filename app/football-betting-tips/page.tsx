import Link from 'next/link';
import { ChevronRight, Calendar, Trophy, Zap, ThumbsUp } from 'lucide-react';

export default function FootballTipsPage() {
    const tipCategories = [
        { title: 'Accumulator Tips', href: '/football-betting-tips/accumulator', icon: <Zap size={24} />, desc: 'High value combinations for maximum returns' },
        { title: 'Bet of the Day', href: '/football-betting-tips/bet-of-the-day', icon: <Trophy size={24} />, desc: 'Our single most confident prediction today' },
        { title: '1X2 Tips', href: '/football-betting-tips/1x2', icon: <ThumbsUp size={24} />, desc: 'Classic match winner predictions' },
        { title: 'BTTS Tips', href: '/football-betting-tips/btts', icon: <Zap size={24} />, desc: 'Both teams to score betting advice' },
        { title: 'Over 2.5 Goals', href: '/football-betting-tips/over-2-5-goals', icon: <Trophy size={24} />, desc: 'High-scoring match predictions' },
        { title: 'Correct Score', href: '/football-betting-tips/correct-score', icon: <Calendar size={24} />, desc: 'Exact scoreline predictions for huge odds' },
        { title: 'Jackpot Tips', href: '/football-betting-tips/jackpot', icon: <Zap size={24} />, desc: 'Predictions for Super 6 and other jackpots' },
        { title: 'Double Chance', href: '/football-betting-tips/double-chance', icon: <Shield size={24} />, desc: 'Safer bets covering two outcomes' },
    ];

    return (
        <div className="bg-[#111111] min-h-screen pb-16">
            <div className="bg-[#1a1a1a] border-b border-[#333] pt-12 pb-16">
                <div className="container-main">
                    <div className="text-sm text-[#777] mb-4 flex items-center gap-2">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <span className="text-white">Football Tips</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Football Betting Tips</h1>
                    <p className="text-[#b0b0b0] max-w-3xl text-lg leading-relaxed">
                        Welcome to the ultimate hub for football betting tips. Our expert tipsters analyze hundreds of matches daily to bring you the best value bets across all major markets and leagues.
                    </p>
                </div>
            </div>

            <div className="container-main mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tipCategories.map((cat, idx) => (
                        <Link key={idx} href={cat.href} className="card-base card-hover flex flex-col items-center text-center p-8 group">
                            <div className="w-16 h-16 rounded-full bg-[#111] border border-[#333] text-[#0066cc] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#d4af37] group-hover:text-[#d4af37] transition-all">
                                {cat.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#d4af37] transition-colors">{cat.title}</h3>
                            <p className="text-[#777] text-sm">{cat.desc}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Quick component for the Shield icon used above
function Shield({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        </svg>
    );
}
