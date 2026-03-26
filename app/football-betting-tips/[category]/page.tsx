import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Trophy, Zap, ThumbsUp, Calendar } from 'lucide-react';
import PredictionCard from '@/components/ui/PredictionCard';
import connectToDatabase from '@/lib/mongodb';
import { Prediction } from '@/lib/models/Prediction';

export const dynamic = 'force-dynamic';

export default async function BettingTipsCategoryPage({ params }: { params: { category: string } }) {
    const { category } = params;

    const categoryMap: Record<string, { title: string, desc: string, icon: any }> = {
        'bet-of-the-day': { title: 'Bet of the Day', desc: 'Our single most confident prediction today', icon: <Trophy size={28} /> },
        '1x2': { title: '1X2 Tips', desc: 'Classic match winner predictions', icon: <ThumbsUp size={28} /> },
        'btts': { title: 'BTTS Tips', desc: 'Both teams to score betting advice', icon: <Zap size={28} /> },
        'over-2-5-goals': { title: 'Over 2.5 Goals', desc: 'High-scoring match predictions', icon: <Trophy size={28} /> },
        'correct-score': { title: 'Correct Score', desc: 'Exact scoreline predictions for huge odds', icon: <Calendar size={28} /> },
        'jackpot': { title: 'Jackpot Tips', desc: 'Predictions for Super 6 and other jackpots', icon: <Zap size={28} /> },
        'double-chance': { title: 'Double Chance', desc: 'Safer bets covering two outcomes', icon: <ThumbsUp size={28} /> },
    };

    const categoryInfo = categoryMap[category];
    if (!categoryInfo) {
        notFound();
    }

    await connectToDatabase();

    let query: any = {};
    if (category === '1x2') {
        query.predictionType = '1x2';
    } else if (category === 'btts') {
        query.predictionType = 'btts';
    } else if (category === 'over-2-5-goals') {
        query.predictionType = { $in: ['over-2.5', 'over-3.5'] };
    } else if (category === 'correct-score' || category === 'double-chance') {
        query.predictionType = category;
    }

    // Connect to DB and fetch
    let predsDocs = await Prediction.find(query).limit(10).lean();

    // Map to plain objects and fix Date
    const mapDoc = (doc: any) => {
        const plain = JSON.parse(JSON.stringify(doc));
        plain.id = plain.slug || plain._id;
        if (doc.publishedAt) {
            const d = new Date(doc.publishedAt);
            plain.publishedAt = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        }
        return plain;
    };

    const filteredPreds = predsDocs.map(mapDoc);

    return (
        <div className="bg-[#111111] min-h-screen pb-16">
            <div className="bg-[#1a1a1a] border-b border-[#333] pt-12 pb-16">
                <div className="container-main">
                    <div className="text-sm text-[#777] mb-4 flex items-center gap-2">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <Link href="/football-betting-tips" className="hover:text-white transition-colors">Tips</Link>
                        <ChevronRight size={14} />
                        <span className="text-white">{categoryInfo.title}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#0066cc]/20 flex items-center justify-center text-[#0066cc]">
                            {categoryInfo.icon}
                        </div>
                        {categoryInfo.title}
                    </h1>
                    <p className="text-[#b0b0b0] max-w-3xl text-lg leading-relaxed">
                        {categoryInfo.desc}. Browse our expert selections below.
                    </p>
                </div>
            </div>

            <div className="container-main mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPreds.map(pred => (
                        <PredictionCard key={pred.id} prediction={pred} showLeagueBadge={true} />
                    ))}

                    {filteredPreds.length === 0 && (
                        <div className="text-center text-[#777] py-12 bg-[#1a1a1a] rounded-xl border border-[#333] col-span-full">
                            No {categoryInfo.title.toLowerCase()} available today. Check back tomorrow!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
