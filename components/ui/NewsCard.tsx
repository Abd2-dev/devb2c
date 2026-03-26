import Link from 'next/link';
import { Article } from '@/lib/data/articles';
import { getAuthorBySlug } from '@/lib/data/authors';
import { Clock } from 'lucide-react';

interface NewsCardProps {
    article: Article;
}

export default function NewsCard({ article }: NewsCardProps) {
    const author = getAuthorBySlug(article.authorId);

    return (
        <div className="card-base card-hover flex flex-col h-full bg-[#1c1c1c] p-0 overflow-hidden group">
            {/* Featured Image placeholder (using gradient for now) */}
            <div
                className="h-48 w-full relative overflow-hidden flex items-center justify-center p-6 text-center"
                style={{ background: article.imageColor }}
            >
                <Link
                    href={`/news/${article.slug}`}
                    className="absolute inset-0 z-10"
                    aria-label={`Read article: ${article.title}`}
                />
                <h3 className="text-xl font-black text-white mix-blend-overlay opacity-90 leading-tight group-hover:scale-105 transition-transform duration-500">
                    {article.title}
                </h3>

                {/* Category Badge */}
                <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs text-white font-bold border border-white/20 uppercase tracking-wider z-20">
                    {article.category}
                </span>
            </div>

            <div className="p-6 flex flex-col flex-1">
                <Link href={`/news/${article.slug}`} className="group-hover:text-[#d4af37] transition-colors">
                    <h4 className="text-lg font-bold text-white mb-3 line-clamp-2 leading-snug">
                        {article.title}
                    </h4>
                </Link>

                <p className="text-[#b0b0b0] text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
                    {article.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#333]">
                    {author && (
                        <Link href={`/author/${author.slug}`} className="flex items-center gap-2 group/author">
                            <div
                                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[8px] font-bold border border-[#444]"
                                style={{ backgroundColor: author.avatarColor }}
                            >
                                {author.avatar}
                            </div>
                            <span className="text-xs text-[#777] font-semibold group-hover/author:text-white transition-colors">
                                {author.name}
                            </span>
                        </Link>
                    )}

                    <div className="flex items-center gap-1.5 text-xs text-[#555] font-medium">
                        <Clock size={12} />
                        {article.publishedAt}
                    </div>
                </div>
            </div>
        </div>
    );
}
