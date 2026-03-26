import Link from 'next/link';
import { Prediction } from '@/lib/data/predictions';
import { getAuthorBySlug } from '@/lib/data/authors';
import { Star } from 'lucide-react';
import { useFavorites } from '@/components/context/FavoritesContext';

interface PredictionCardProps {
    prediction: Prediction;
    showLeagueBadge?: boolean;
}

export default function PredictionCard({ prediction, showLeagueBadge = false }: PredictionCardProps) {
    const author = getAuthorBySlug(prediction.authorId);
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    // Fallback to id if available, else generate slug-like id from matchup
    const predictionId = prediction.id || `${prediction.homeTeam.shortName}-${prediction.awayTeam.shortName}-${prediction.matchDate}`.toLowerCase().replace(/\s+/g, '-');
    const isFav = isFavorite(predictionId);

    const handleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFav) {
            removeFavorite(predictionId);
        } else {
            addFavorite({
                id: predictionId,
                type: 'prediction',
                title: `${prediction.homeTeam.name} vs ${prediction.awayTeam.name}`,
                url: `/football-predictions/${prediction.slug}`
            });
        }
    };

    return (
        <div className="card-base card-hover flex flex-col h-full bg-[#1c1c1c] p-4 relative">
            {/* Favorite Button */}
            <button
                onClick={handleFavorite}
                className="absolute top-4 right-4 p-1.5 text-[#777] hover:text-[#d4af37] transition-colors z-10 bg-[#111] rounded-full border border-[#333]"
                title={isFav ? "Remove from favorites" : "Save to favorites"}
            >
                <Star size={16} className={isFav ? "fill-[#d4af37] text-[#d4af37]" : ""} />
            </button>

            {/* Header Info */}
            <div className="flex justify-between items-center mb-4 pr-10">
                <span className="text-[#777] text-xs font-semibold">{prediction.matchDate}, {prediction.matchTime}</span>
                {showLeagueBadge && (
                    <span className="badge bg-[#111] border border-[#333] text-[#b0b0b0]">
                        {prediction.league}
                    </span>
                )}
            </div>

            {/* Teams Display */}
            <div className="flex justify-between items-center mb-6">
                {/* Home Team */}
                <div className="flex flex-col items-center flex-1">
                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg mb-2 border border-[#333]"
                        style={{ backgroundColor: prediction.homeTeam.color }}
                    >
                        {prediction.homeTeam.shortName.substring(0, 3)}
                    </div>
                    <span className="text-white font-bold text-center text-sm leading-tight h-10 flex items-center">{prediction.homeTeam.name}</span>
                </div>

                {/* VS */}
                <div className="px-2 text-[#555] font-black italic text-lg opacity-50">
                    VS
                </div>

                {/* Away Team */}
                <div className="flex flex-col items-center flex-1">
                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg mb-2 border border-[#333]"
                        style={{ backgroundColor: prediction.awayTeam.color }}
                    >
                        {prediction.awayTeam.shortName.substring(0, 3)}
                    </div>
                    <span className="text-white font-bold text-center text-sm leading-tight h-10 flex items-center">{prediction.awayTeam.name}</span>
                </div>
            </div>

            {/* Bookmaker & Odds */}
            <div className="bg-[#222] rounded-lg p-4 mb-4 border border-[#333]">
                <div className="flex justify-between items-center mb-2 pb-2 border-b border-[#333]">
                    <span className="text-xs text-[#b0b0b0] font-semibold uppercase tracking-wider">Prediction</span>
                    <span className="text-[#d4af37] font-bold">{prediction.predictionLabel}</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {/* 1X2 Odds Layout */}
                    <div className={`p-2 rounded text-center border ${prediction.predictionType === '1x2' && prediction.odds === prediction.w1 ? 'border-[#0066cc] bg-[#0066cc]/10' : 'border-[#444] bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors cursor-pointer'}`}>
                        <span className="block text-[#777] text-[10px] font-bold mb-0.5">W1</span>
                        <span className={`font-bold ${prediction.predictionType === '1x2' && prediction.odds === prediction.w1 ? 'text-white' : 'text-[#b0b0b0]'}`}>{prediction.w1.toFixed(2)}</span>
                    </div>
                    <div className={`p-2 rounded text-center border ${prediction.predictionType === '1x2' && prediction.odds === prediction.draw ? 'border-[#0066cc] bg-[#0066cc]/10' : 'border-[#444] bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors cursor-pointer'}`}>
                        <span className="block text-[#777] text-[10px] font-bold mb-0.5">X</span>
                        <span className={`font-bold ${prediction.predictionType === '1x2' && prediction.odds === prediction.draw ? 'text-white' : 'text-[#b0b0b0]'}`}>{prediction.draw.toFixed(2)}</span>
                    </div>
                    <div className={`p-2 rounded text-center border ${prediction.predictionType === '1x2' && prediction.odds === prediction.w2 ? 'border-[#0066cc] bg-[#0066cc]/10' : 'border-[#444] bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors cursor-pointer'}`}>
                        <span className="block text-[#777] text-[10px] font-bold mb-0.5">W2</span>
                        <span className={`font-bold ${prediction.predictionType === '1x2' && prediction.odds === prediction.w2 ? 'text-white' : 'text-[#b0b0b0]'}`}>{prediction.w2.toFixed(2)}</span>
                    </div>
                </div>

                {prediction.predictionType !== '1x2' && (
                    <div className="mt-3 bg-[#111] p-2 rounded text-center border border-[#0066cc] bg-[#0066cc]/10">
                        <span className="text-[#b0b0b0] text-xs inline-block mr-2">{prediction.predictionType.toUpperCase().replace('-', ' ')} Odds:</span>
                        <span className="text-white font-bold">{prediction.odds.toFixed(2)}</span>
                    </div>
                )}
            </div>

            {/* Author & Action */}
            <div className="mt-auto pt-4 border-t border-[#333] flex items-center justify-between">
                {author && (
                    <Link href={`/author/${author.slug}`} className="flex items-center gap-2 group">
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                            style={{ backgroundColor: author.avatarColor }}
                        >
                            {author.avatar}
                        </div>
                        <span className="text-xs text-[#b0b0b0] group-hover:text-white transition-colors">{author.name}</span>
                    </Link>
                )}

                <Link href={`/football-predictions/${prediction.slug}`} className="text-[#0066cc] hover:text-[#3388dd] font-semibold text-sm transition-colors border-b border-transparent hover:border-[#3388dd]">
                    Read prediction
                </Link>
            </div>
        </div>
    );
}
