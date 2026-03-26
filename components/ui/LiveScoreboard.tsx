'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type Match = {
    id: string;
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    minute: string;
    status: 'live' | 'finished' | 'upcoming';
};

const DUMMY_MATCHES: Match[] = [
    { id: '1', homeTeam: 'Arsenal', awayTeam: 'Chelsea', homeScore: 2, awayScore: 1, minute: '76\'', status: 'live' },
    { id: '2', homeTeam: 'Real Madrid', awayTeam: 'Barcelona', homeScore: 0, awayScore: 0, minute: '12\'', status: 'live' },
    { id: '3', homeTeam: 'Bayern Munich', awayTeam: 'Dortmund', homeScore: 3, awayScore: 1, minute: 'FT', status: 'finished' },
    { id: '4', homeTeam: 'Juventus', awayTeam: 'AC Milan', homeScore: 1, awayScore: 1, minute: 'HT', status: 'live' },
    { id: '5', homeTeam: 'PSG', awayTeam: 'Marseille', homeScore: 0, awayScore: 0, minute: '20:00', status: 'upcoming' },
];

export default function LiveScoreboard() {
    const [matches, setMatches] = useState<Match[]>(DUMMY_MATCHES);

    // Normally we would poll an API here
    useEffect(() => {
        const interval = setInterval(() => {
            setMatches(prev => prev.map(match => {
                if (match.status === 'live' && Math.random() > 0.8) {
                    return { ...match, homeScore: match.homeScore + (Math.random() > 0.5 ? 1 : 0), awayScore: match.awayScore + (Math.random() > 0.5 ? 0 : 1) };
                }
                return match;
            }));
        }, 60000); // refresh logic
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-[#111] border-b border-[#333] py-2 overflow-hidden mx-auto w-full group relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#111] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#111] to-transparent z-10 pointer-events-none"></div>

            <motion.div
                className="flex gap-6 whitespace-nowrap px-4"
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
                onMouseEnter={(e: any) => e.target.style.animationPlayState = 'paused'}
                onMouseLeave={(e: any) => e.target.style.animationPlayState = 'running'}
            >
                {/* Duplicate matches for seamless marquee loop */}
                {[...matches, ...matches, ...matches].map((match, i) => (
                    <div key={`${match.id}-${i}`} className="flex items-center gap-3 bg-[#1a1a1a] border border-[#333] px-4 py-1.5 rounded-full text-sm shrink-0">
                        {match.status === 'live' && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                        {match.status === 'finished' && <span className="w-2 h-2 rounded-full bg-gray-500"></span>}
                        {match.status === 'upcoming' && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}

                        <span className="font-semibold text-white">{match.homeTeam}</span>
                        <span className="font-black text-[#d4af37]">
                            {match.status === 'upcoming' ? 'vs' : `${match.homeScore} - ${match.awayScore}`}
                        </span>
                        <span className="font-semibold text-white">{match.awayTeam}</span>

                        <span className={`text-xs ml-2 ${match.status === 'live' ? 'text-red-400 font-bold' : 'text-[#777]'}`}>
                            {match.minute}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
