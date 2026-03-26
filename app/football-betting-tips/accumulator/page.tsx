import Link from 'next/link';
import { ChevronRight, Zap } from 'lucide-react';
import { accumulatorTips } from '@/lib/data/predictions';
import AccumulatorCard from '@/components/ui/AccumulatorCard';

export default function AccumulatorTipsPage() {
    return (
        <div className="bg-[#111111] min-h-screen pb-16">
            <div className="bg-[#1a1a1a] border-b border-[#333] pt-12 pb-16">
                <div className="container-main">
                    <div className="text-sm text-[#777] mb-4 flex items-center gap-2">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <Link href="/football-betting-tips" className="hover:text-white transition-colors">Tips</Link>
                        <ChevronRight size={14} />
                        <span className="text-white">Accumulator</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#0066cc]/20 flex items-center justify-center text-[#0066cc]">
                            <Zap size={28} />
                        </div>
                        Accumulator Tips
                    </h1>
                    <p className="text-[#b0b0b0] max-w-3xl text-lg leading-relaxed">
                        Maximize your returns with our daily football acca predictions. Our experts combine the best value bets from across Europe into high-odds accumulators.
                    </p>
                </div>
            </div>

            <div className="container-main mt-12">
                <div className="flex flex-col gap-10">
                    {accumulatorTips.map(tip => (
                        <AccumulatorCard key={tip.id} tip={tip} />
                    ))}

                    {accumulatorTips.length === 0 && (
                        <div className="text-center text-[#777] py-12 bg-[#1a1a1a] rounded-xl border border-[#333]">
                            No accumulator tips available today. Check back tomorrow!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
