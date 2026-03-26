import Link from 'next/link';
import { ChevronRight, Filter } from 'lucide-react';
import NewsCard from '@/components/ui/NewsCard';
import connectToDatabase from '@/lib/mongodb';
import { Article } from '@/lib/models/Article';

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
    await connectToDatabase();

    const articlesDocs = await Article.find({}).sort({ publishedAt: -1 }).lean();

    const mapDoc = (doc: any) => {
        const plain = JSON.parse(JSON.stringify(doc));
        plain.id = plain.slug || plain._id;
        if (doc.publishedAt) {
            const d = new Date(doc.publishedAt);
            plain.publishedAt = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        }
        return plain;
    };

    const articles = articlesDocs.map(mapDoc) as any[];
    const categories = Array.from(new Set(articles.map(a => a.category)));

    return (
        <div className="bg-[#111111] min-h-screen pb-16">

            {/* Header section */}
            <div className="bg-[#1a1a1a] border-b border-[#333] pt-12 pb-16">
                <div className="container-main">
                    <div className="text-sm text-[#777] mb-4 flex items-center gap-2 uppercase tracking-wide font-bold">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <span className="text-white">News</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Sports Betting News & Blog</h1>
                    <p className="text-[#b0b0b0] max-w-3xl text-lg leading-relaxed mb-8">
                        Stay up to date with the latest sports news, betting strategies, and exclusive promotions.
                        Our editorial team covers football, boxing, MMA, rugby, and more.
                    </p>

                    <div className="flex flex-wrap gap-2">
                        <Link href="/news" className="badge bg-[#0066cc] text-white px-4 py-2 text-sm">All News</Link>
                        {categories.map(cat => (
                            <Link key={cat} href={`/news?category=${cat.toLowerCase()}`} className="badge bg-[#222] border border-[#444] text-[#b0b0b0] hover:text-white px-4 py-2 text-sm hover:bg-[#333] transition-colors">
                                {cat}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container-main mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <NewsCard key={article.id} article={article} />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button className="btn-outline px-8 py-3 text-lg font-bold">
                        Load More Articles
                    </button>
                </div>
            </div>
        </div>
    );
}
