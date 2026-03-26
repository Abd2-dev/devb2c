import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Calendar, User, Clock, Share2 } from 'lucide-react';
import NewsCard from '@/components/ui/NewsCard';

import connectToDatabase from '@/lib/mongodb';
import { Article } from '@/lib/models/Article';
import { Author } from '@/lib/models/Author';

export const dynamic = 'force-dynamic';

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
    await connectToDatabase();

    const articleDoc = await Article.findOne({ slug: params.slug }).lean();

    if (!articleDoc) {
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

    const article = mapDoc(articleDoc);

    let author = null;
    if (article.authorId) {
        const authorDoc = await Author.findOne({ slug: article.authorId }).lean();
        if (authorDoc) author = mapDoc(authorDoc);
    }

    const relatedArticlesDocs = await Article.find({ category: article.category, slug: { $ne: article.slug } }).limit(3).lean();
    let displayedRelated = relatedArticlesDocs.map(mapDoc) as any[];

    if (displayedRelated.length === 0) {
        const fallbackDocs = await Article.find({ slug: { $ne: article.slug } }).limit(3).lean();
        displayedRelated = fallbackDocs.map(mapDoc) as any[];
    }

    // Split content by paragraphs for rendering
    const paragraphs = article.content.split('\n\n');

    return (
        <div className="bg-[#111111] min-h-screen pb-16">

            {/* Article Header (Hero) */}
            <div
                className="relative pt-16 pb-24 md:pt-24 md:pb-32 border-b border-[#333] overflow-hidden"
                style={{ background: article.imageColor }}
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent z-10"></div>

                <div className="container-main relative z-20">
                    <div className="text-xs text-white/70 mb-6 flex flex-wrap items-center gap-2 uppercase tracking-wide font-bold">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <Link href="/news" className="hover:text-white transition-colors">News</Link>
                        <ChevronRight size={12} />
                        <span className="text-[#d4af37]">{article.category}</span>
                    </div>

                    <div className="max-w-4xl">
                        <span className="bg-[#0066cc] text-white px-3 py-1 text-xs font-bold rounded uppercase tracking-wider mb-4 inline-block">
                            {article.category}
                        </span>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                            {article.title}
                        </h1>

                        <p className="text-xl text-white/80 font-medium leading-relaxed mb-8 max-w-3xl">
                            {article.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-white/90">
                            {author && (
                                <Link href={`/author/${author.slug}`} className="flex items-center gap-3 hover:text-white group bg-black/40 px-4 py-2 rounded-full border border-white/20">
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black"
                                        style={{ backgroundColor: author.avatarColor }}
                                    >
                                        {author.avatar}
                                    </div>
                                    <span className="font-bold group-hover:text-[#d4af37] transition-colors">{author.name}</span>
                                </Link>
                            )}

                            <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-white/20">
                                <Calendar size={16} className="text-[#d4af37]" />
                                <span className="font-semibold">{article.publishedAt}</span>
                            </div>

                            <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-white/20">
                                <Clock size={16} className="text-[#d4af37]" />
                                <span className="font-semibold">4 min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-main mt-12 grid grid-cols-1 lg:grid-cols-4 gap-12">

                {/* Main Content Area */}
                <div className="lg:col-span-3">

                    <div className="bg-[#1c1c1c] border border-[#333] rounded-2xl p-6 md:p-10 shadow-xl mb-12">

                        {/* Social Share Bar */}
                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#333]">
                            <span className="text-sm font-bold text-[#777] uppercase tracking-wider">Share</span>
                            <button className="w-10 h-10 rounded-full bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center hover:bg-[#1877F2]/20 transition-colors">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" /></svg>
                            </button>
                            <button className="w-10 h-10 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] flex items-center justify-center hover:bg-[#1DA1F2]/20 transition-colors">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" /></svg>
                            </button>
                            <button className="w-10 h-10 rounded-full border border-[#444] text-[#b0b0b0] flex items-center justify-center hover:bg-[#333] hover:text-white transition-colors">
                                <Share2 size={18} />
                            </button>
                        </div>

                        {/* Article Body */}
                        <article className="prose prose-invert prose-lg max-w-none text-[#b0b0b0]">
                            {paragraphs.map((para: string, index: number) => {
                                // Check if paragraph is bold text (often used as subheadings in the mock data)
                                const isSubheading = para.startsWith('**') && para.includes('**', 2) && para.length < 100;

                                if (isSubheading) {
                                    // Extract the bold part and the rest
                                    const match = para.match(/\*\*(.*?)\*\*(.*)/);
                                    if (match) {
                                        return (
                                            <div key={index} className="mb-6">
                                                <h3 className="text-xl font-bold text-white mb-2">{match[1]}</h3>
                                                {match[2] && <p>{match[2].trim()}</p>}
                                            </div>
                                        );
                                    }
                                }

                                // Normal paragraph rendering with markdown bold support
                                // Split by bold markers
                                const parts = para.split(/(\*\*.*?\*\*)/g);

                                return (
                                    <p key={index} className="mb-6 leading-relaxed">
                                        {parts.map((part, i) => {
                                            if (part.startsWith('**') && part.endsWith('**')) {
                                                return <strong key={i} className="text-white">{part.slice(2, -2)}</strong>;
                                            }
                                            return part;
                                        })}
                                    </p>
                                );
                            })}
                        </article>

                        {/* Tags */}
                        <div className="mt-10 pt-8 border-t border-[#333] flex flex-wrap items-center gap-3">
                            <span className="text-sm font-bold text-[#777] uppercase tracking-wider mr-2">Tags:</span>
                            {article.tags.map((tag: string) => (
                                <Link key={tag} href={`/search?q=${tag}`} className="bg-[#111] border border-[#333] text-[#b0b0b0] hover:text-white hover:border-[#0066cc] px-3 py-1.5 rounded-md text-sm transition-colors">
                                    {tag}
                                </Link>
                            ))}
                        </div>

                    </div>

                    {/* Related Articles */}
                    {displayedRelated.length > 0 && (
                        <div className="mt-16">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-2 h-8 bg-[#d4af37] rounded-full"></div>
                                <h3 className="text-2xl font-black text-white">Related Articles</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {displayedRelated.map(related => (
                                    <NewsCard key={related.id} article={related} />
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-8">

                    {/* Author Bio Box */}
                    {author && (
                        <div className="bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden shadow-lg">
                            <div className="bg-[#222] p-4 border-b border-[#333]">
                                <h4 className="font-bold text-white uppercase text-sm tracking-wider">About the Author</h4>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-black text-white shadow-inner"
                                        style={{ backgroundColor: author.avatarColor }}
                                    >
                                        {author.avatar}
                                    </div>
                                    <div>
                                        <Link href={`/author/${author.slug}`} className="text-lg font-bold text-white hover:text-[#d4af37] transition-colors block leading-tight mb-1">
                                            {author.name}
                                        </Link>
                                        <span className="text-xs text-[#0066cc] font-bold">{author.title}</span>
                                    </div>
                                </div>
                                <p className="text-[#b0b0b0] text-sm mb-4 leading-relaxed">
                                    {author.bio}
                                </p>
                                <Link href={`/author/${author.slug}`} className="btn-outline w-full text-center py-2 text-sm">
                                    View Profile & Articles
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Ad / Promo Space */}
                    <div className="bg-gradient-to-b from-[#003da6] to-[#001d4d] rounded-xl p-6 text-center border-2 border-[#0066cc]/30 shadow-[0_0_20px_rgba(0,102,204,0.15)]">
                        <span className="bg-[#d4af37] text-black text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded inline-block mb-4">Advertisement</span>
                        <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-inner">
                            <span className="text-[#0047BB] font-black text-xl">1X</span>
                        </div>
                        <h4 className="text-xl font-black text-white mb-2 leading-tight">Claim your €130 Bonus Today!</h4>
                        <p className="text-white/80 text-sm mb-6">Use code <strong>MIGHTY130</strong> when registering.</p>
                        <Link href="#" className="btn-gold w-full text-lg shadow-lg">Claim Now</Link>
                        <p className="text-[9px] text-white/50 mt-4">18+ T&C apply. New customers only.</p>
                    </div>

                </div>
            </div>
        </div>
    );
}
