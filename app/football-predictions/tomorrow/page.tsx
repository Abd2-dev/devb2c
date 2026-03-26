import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import PredictionCard from '@/components/ui/PredictionCard';
import connectToDatabase from '@/lib/mongodb';
import { Prediction } from '@/lib/models/Prediction';

export const dynamic = 'force-dynamic';

export default async function TomorrowPredictionsPage() {
    await connectToDatabase();

    // In a real app, this would filter by actual tomorrow date
    // For demo, we just take the next 4 predictions as "tomorrow"
    const docs = await Prediction.find().sort({ publishedAt: -1 }).skip(4).limit(4).lean();

    const tomorrowPreds = docs.map((doc: any) => {
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
                        <span className="text-white">Tomorrow</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Football Predictions for Tomorrow</h1>
                    <p className="text-[#b0b0b0] max-w-3xl text-lg leading-relaxed">
                        Stay ahead of the game with our expert football betting tips for tomorrow's matches. Early odds often present the best value.
                    </p>

                    <div className="flex flex-wrap gap-2 mt-8">
                        <Link href="/football-predictions/today" className="bg-[#222] text-[#b0b0b0] hover:text-white hover:bg-[#333] px-4 py-2 font-bold rounded-lg transition-colors">Today</Link>
                        <span className="bg-[#0066cc] text-white px-4 py-2 font-bold rounded-lg cursor-default">Tomorrow</span>
                        <Link href="/football-predictions/weekend" className="bg-[#222] text-[#b0b0b0] hover:text-white hover:bg-[#333] px-4 py-2 font-bold rounded-lg transition-colors">Weekend</Link>
                    </div>
                </div>
            </div>

            <div className="container-main mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tomorrowPreds.map(pred => (
                        <PredictionCard key={pred.id} prediction={pred} showLeagueBadge={true} />
                    ))}
                </div>

                {tomorrowPreds.length === 0 && (
                    <div className="text-center text-[#777] py-12 bg-[#1a1a1a] rounded-xl border border-[#333]">
                        No predictions available for tomorrow yet. Check back later!
                    </div>
                )}
            </div>
        </div>
    );
}
