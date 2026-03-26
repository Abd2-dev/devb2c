import Link from 'next/link';
import { Author } from '@/lib/data/authors';

interface AuthorCardProps {
    author: Author;
}

export default function AuthorCard({ author }: AuthorCardProps) {
    return (
        <div className="card-base card-hover flex flex-col h-full bg-[#1c1c1c] overflow-hidden group">
            {/* Header Banner - colored based on author avatarColor */}
            <div
                className="h-24 w-full relative"
                style={{
                    background: `linear-gradient(to bottom right, ${author.avatarColor}99, #1c1c1c)`
                }}
            >
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded text-xs text-white font-bold border border-white/10">
                    {author.tipsCount} Tips
                </div>
            </div>

            <div className="flex flex-col flex-1 px-6 pb-6 relative">
                {/* Avatar positioned overlapping the banner */}
                <div
                    className="w-24 h-24 rounded-full border-4 border-[#1c1c1c] shadow-lg flex items-center justify-center text-white text-3xl font-black -mt-12 mb-4 relative z-10 transition-transform group-hover:scale-105"
                    style={{ backgroundColor: author.avatarColor }}
                >
                    {author.avatar}
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#d4af37] transition-colors">
                    {author.name}
                </h3>
                <p className="text-sm text-[#0066cc] font-semibold mb-4">{author.title}</p>

                <p className="text-[#b0b0b0] text-sm mb-6 flex-1">
                    {author.bio}
                </p>

                <div className="space-y-4 w-full">
                    <div className="flex flex-wrap gap-2">
                        {author.specialties.slice(0, 2).map((specialty, idx) => (
                            <span key={idx} className="bg-[#2a2a2a] text-[#777] px-2 py-1 rounded text-xs font-medium border border-[#333]">
                                {specialty}
                            </span>
                        ))}
                    </div>

                    <Link
                        href={`/author/${author.slug}`}
                        className="btn-outline w-full py-2.5 hover:bg-[#0066cc] hover:text-white"
                    >
                        View Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}
