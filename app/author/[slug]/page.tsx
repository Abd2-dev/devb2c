import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, TrendingUp, Edit3, Award } from 'lucide-react';
import PredictionCard from '@/components/ui/PredictionCard';
import NewsCard from '@/components/ui/NewsCard';

import connectToDatabase from '@/lib/mongodb';
import { Author } from '@/lib/models/Author';
import { Prediction } from '@/lib/models/Prediction';
import { Article } from '@/lib/models/Article';

export const dynamic = 'force-dynamic';

export default async function AuthorProfilePage({ params }: { params: { slug: string } }) {
    await connectToDatabase();

    const authorDoc = await Author.findOne({ slug: params.slug }).lean();

    if (!authorDoc) {
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

    const author = mapDoc(authorDoc);

    const predictionsDocs = await Prediction.find({ authorId: author.slug }).sort({ matchDate: -1 }).lean();
    const authorPredictions = predictionsDocs.map(mapDoc) as any[];

    const articlesDocs = await Article.find({ authorId: author.slug }).sort({ publishedAt: -1 }).lean();
    const authorArticles = articlesDocs.map(mapDoc) as any[];

    return (
        <div className="bg-[#111111] min-h-screen pb-16">

            {/* Header section (Author Hero) */}
            <div
                className="relative pt-16 pb-16 border-b border-[#333] overflow-hidden"
            >
                <div
                    className="absolute inset-0 z-0 opacity-20"
                    style={{
                        background: `radial-gradient(circle at center 0%, ${author.avatarColor}, transparent 70%)`
                    }}
                ></div>

                <div className="container-main relative z-10">
                    <div className="text-sm text-[#777] mb-8 flex items-center gap-2 uppercase tracking-wide font-bold">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <Link href="/authors" className="hover:text-white transition-colors">Authors</Link>
                        <ChevronRight size={14} />
                        <span className="text-white">{author.name}</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        {/* Avatar */}
                        <div
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center text-4xl md:text-5xl font-black text-white shadow-[0_0_30px_rgba(0,0,0,0.5)] border-4 border-[#1a1a1a] shrink-0 z-10"
                            style={{ backgroundColor: author.avatarColor }}
                        >
                            {author.avatar}
                        </div>

                        {/* Author Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{author.name}</h1>
                            <h2 className="text-xl text-[#0066cc] font-bold mb-6 tracking-wide">{author.title}</h2>

                            <p className="text-[#b0b0b0] text-lg leading-relaxed max-w-3xl mb-8">
                                {author.bio}
                            </p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                {author.specialties.map((specialty: string) => (
                                    <span key={specialty} className="bg-[#222] border border-[#333] text-white px-3 py-1.5 rounded-md text-sm font-semibold">
                                        {specialty}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Author Stats */}
                        <div className="w-full md:w-auto grid grid-cols-2 md:grid-cols-1 gap-4 shrink-0">
                            <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-4 flex items-center gap-4 min-w-[160px]">
                                <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                                    <TrendingUp size={20} />
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-white leading-tight">{author.tipsCount}</div>
                                    <div className="text-xs text-[#777] font-bold uppercase">Tips</div>
                                </div>
                            </div>
                            <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-4 flex items-center gap-4 min-w-[160px]">
                                <div className="w-10 h-10 rounded-full bg-[#0066cc]/10 flex items-center justify-center text-[#0066cc]">
                                    <Edit3 size={20} />
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-white leading-tight">{author.articlesCount}</div>
                                    <div className="text-xs text-[#777] font-bold uppercase">Articles</div>
                                </div>
                            </div>
                            <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-4 flex items-center gap-4 min-w-[160px] col-span-2 md:col-span-1">
                                <div className="w-10 h-10 rounded-full bg-[#4ade80]/10 flex items-center justify-center text-[#4ade80]">
                                    <Award size={20} />
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-white leading-tight">Expert</div>
                                    <div className="text-xs text-[#777] font-bold uppercase">Status</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-main mt-12 grid grid-cols-1 gap-16">

                {/* Author's Predictions Section */}
                {authorPredictions.length > 0 && (
                    <section>
                        <div className="flex items-center justify-between mb-8 border-b border-[#333] pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-8 bg-[#d4af37] rounded-full"></div>
                                <h3 className="text-2xl md:text-3xl font-black text-white">Latest Betting Tips</h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {authorPredictions.map(pred => (
                                <PredictionCard key={pred.id} prediction={pred} showLeagueBadge={true} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Author's Articles Section */}
                {authorArticles.length > 0 && (
                    <section>
                        <div className="flex items-center justify-between mb-8 border-b border-[#333] pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-8 bg-[#0066cc] rounded-full"></div>
                                <h3 className="text-2xl md:text-3xl font-black text-white">Latest Articles</h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {authorArticles.map(article => (
                                <NewsCard key={article.id} article={article} />
                            ))}
                        </div>
                    </section>
                )}

                {/* If no content (fallback) */}
                {authorPredictions.length === 0 && authorArticles.length === 0 && (
                    <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-12 text-center text-[#777]">
                        <p className="text-lg">No content found for this author yet.</p>
                    </div>
                )}

            </div>
        </div>
    );
}
