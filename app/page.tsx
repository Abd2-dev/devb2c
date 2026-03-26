import Link from 'next/link';
import { ShieldCheck, TrendingUp, Users, Gift, ChevronRight } from 'lucide-react';

import { bookmakersByRegion, casinosByRegion } from '@/lib/data/casinos';

import BookmakerCard from '@/components/ui/BookmakerCard';
import AccumulatorCard from '@/components/ui/AccumulatorCard';
import PredictionCard from '@/components/ui/PredictionCard';
import AuthorCard from '@/components/ui/AuthorCard';
import NewsCard from '@/components/ui/NewsCard';
import LiveScoreboard from '@/components/ui/LiveScoreboard';
import NewsletterSignup from '@/components/ui/NewsletterSignup';
import FadeIn from '@/components/animations/FadeIn';
import Image from 'next/image';

import connectToDatabase from '@/lib/mongodb';
import { Bookmaker } from '@/lib/models/Bookmaker';
import { Prediction } from '@/lib/models/Prediction';
import { Author } from '@/lib/models/Author';
import { Article } from '@/lib/models/Article';

import { unstable_cache } from 'next/cache';

// Use dynamic rendering since DB connection might not be available during build
export const dynamic = 'force-dynamic';

const getHomepageData = unstable_cache(
    async () => {
        try {
            await connectToDatabase();

            const mapDoc = (doc: any) => {
                const plain = JSON.parse(JSON.stringify(doc));
                plain.id = plain.slug || plain._id;
                if (doc.publishedAt) {
                    const d = new Date(doc.publishedAt);
                    plain.publishedAt = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                }
                return plain;
            };

            const [bookmakersDocs, authorsDocs, articlesDocs, allPredictionsDocs, accumulatorTipsDocs] = await Promise.all([
                Bookmaker.find({}).sort({ rating: -1 }).limit(10).lean(),
                Author.find({}).limit(4).lean(),
                Article.find({}).sort({ publishedAt: -1 }).limit(3).lean(),
                Prediction.find({ predictionType: { $ne: 'accumulator' } }).sort({ matchDate: 1 }).lean(),
                Prediction.find({ predictionType: 'accumulator' }).lean()
            ]);

            return {
                bookmakers: bookmakersDocs.map(mapDoc),
                featuredAuthors: authorsDocs.map(mapDoc) as any[],
                recentArticles: articlesDocs.map(mapDoc) as any[],
                allPredictions: allPredictionsDocs.map(mapDoc) as any[],
                accumulatorTips: accumulatorTipsDocs.map(mapDoc) as any[]
            };
        } catch (error) {
            console.error('Homepage data fetch failed, serving empty fallback.', error);
            return {
                bookmakers: [],
                featuredAuthors: [] as any[],
                recentArticles: [] as any[],
                allPredictions: [] as any[],
                accumulatorTips: [] as any[]
            };
        }
    },
    ['homepage-data'],
    { revalidate: 3600, tags: ['homepage'] }
);

export default async function Home() {
    const { bookmakers, featuredAuthors, recentArticles, allPredictions, accumulatorTips } = await getHomepageData();

    const featuredBookmakers = bookmakers.length > 0 ? [bookmakers[0]] : [];
    const topGridBookmakers = bookmakers.slice(0, 4) as any[];

    // Get one prediction per major league
    const plPred = allPredictions.find((p: any) => p.leagueSlug === 'premier-league');
    const llPred = allPredictions.find((p: any) => p.leagueSlug === 'la-liga');
    const saPred = allPredictions.find((p: any) => p.leagueSlug === 'serie-a');
    const l1Pred = allPredictions.find((p: any) => p.leagueSlug === 'ligue-1');
    const blPred = allPredictions.find((p: any) => p.leagueSlug === 'bundesliga');

    const leagueShowcase = [plPred, llPred, saPred, l1Pred, blPred].filter(Boolean);

    return (
        <div className="flex flex-col gap-0 pb-12">

            {/* 1. Bookmaker Showcase Section */}
            <section className="bg-[#111111] section-pad relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[70%] bg-[#0066cc]/5 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] bg-[#d4af37]/5 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="container-main relative z-10">
                    <FadeIn delay={0.1}>
                        <div className="text-center md:text-left mb-10 max-w-3xl">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
                                Expert <span className="gold-text">Football Tips</span> & Betting Predictions
                            </h1>
                            <p className="text-lg md:text-xl text-[#b0b0b0] leading-relaxed">
                                Join millions of sports fans using our data-driven football predictions, accumulator tips, and trusted bookmaker reviews.
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="w-full mb-10 text-center animate-fade-in relative block h-[400px] max-w-[1200px] mx-auto rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)] border border-[#333] hover:border-[#d4af37] transition-all">
                            <Image src="/sports-banner.png" alt="BSL Sports Promotions" fill className="object-cover" priority sizes="(max-width: 1200px) 100vw, 1200px" />
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <div className="mb-8">
                            {featuredBookmakers.length > 0 && (
                                <BookmakerCard bookmaker={featuredBookmakers[0]} variant="featured" />
                            )}
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {topGridBookmakers.map(bookmaker => (
                                <BookmakerCard key={bookmaker.id} bookmaker={bookmaker} variant="grid" />
                            ))}
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.5}>
                        <div className="mt-8 text-center md:text-right">
                            <Link href="/bookmakers" className="text-[#0066cc] hover:text-[#3388dd] font-bold inline-flex items-center gap-1 group">
                                See all betting sites
                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#333] to-transparent w-full"></div>

            {/* Live Scoreboard Marquee */}
            <LiveScoreboard />

            {/* 2. Mega Accumulator Tip Section */}
            <section className="bg-[#1a1a1a] section-pad border-y border-[#333]">
                <div className="container-main">
                    <FadeIn delay={0.1}>
                        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-[#333] pb-4">
                            <div>
                                <div className="accent-line"></div>
                                <h2 className="text-3xl font-black text-white">Mega Accumulator Tip</h2>
                                <p className="text-[#b0b0b0] mt-2">Today&apos;s best value picks combined for maximum return</p>
                            </div>
                            <Link href="/football-betting-tips/accumulator" className="btn-outline flex items-center gap-2 text-[#b0b0b0] hover:text-white shrink-0">
                                See all acca tips <ChevronRight size={16} />
                            </Link>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <div className="grid grid-cols-1 gap-6">
                            {accumulatorTips.map((tip) => (
                                <AccumulatorCard key={tip.id} tip={tip} />
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 3. League Predictions Section */}
            <section className="bg-[#111111] section-pad">
                <div className="container-main">
                    <FadeIn delay={0.1}>
                        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-[#333] pb-4">
                            <div>
                                <div className="accent-line"></div>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">🔥</span>
                                    <h2 className="text-3xl font-black text-white">Top European Leagues</h2>
                                </div>
                                <p className="text-[#b0b0b0] mt-2">Expert tips covering the best football action across Europe</p>
                            </div>
                            <Link href="/football-predictions" className="btn-outline flex items-center gap-2 text-[#b0b0b0] hover:text-white shrink-0">
                                All predictions <ChevronRight size={16} />
                            </Link>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {leagueShowcase.map((prediction) => (
                                <PredictionCard key={prediction.id} prediction={prediction} showLeagueBadge={true} />
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 4. Why Trust Us Section */}
            <section className="bg-gradient-to-b from-[#1a1a1a] to-[#111111] section-pad border-y border-[#333]">
                <div className="container-main">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        <FadeIn delay={0.1}>
                            <div>
                                <div className="accent-line"></div>
                                <h2 className="text-3xl font-black text-white mb-6">Why Trust Us</h2>
                                <p className="text-[#b0b0b0] text-lg mb-6 leading-relaxed">
                                    Our mission is to provide you with the most reliable, data-driven football betting tips and objective bookmaker reviews. We don&apos;t just guess; our team of professional analysts uses advanced statistical models and deep football knowledge.
                                </p>
                                <p className="text-[#b0b0b0] text-lg mb-8 leading-relaxed">
                                    Every tipster on our platform has a transparent track record, allowing you to follow the experts who consistently deliver value and winning predictions.
                                </p>
                                <Link href="/about-us" className="btn-primary py-3 px-6 shadow-lg shadow-[#0066cc]/20">
                                    Learn more about our team
                                </Link>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.3} direction="left">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#222] p-6 rounded-xl border border-[#333] hover:border-[#d4af37] transition-colors flex flex-col items-center text-center group">
                                    <div className="w-14 h-14 bg-[#d4af37]/10 text-[#d4af37] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <ShieldCheck size={28} />
                                    </div>
                                    <h4 className="text-3xl font-black text-white mb-1">200+</h4>
                                    <p className="text-[#777] font-semibold text-sm">Bookmaker reviews</p>
                                </div>

                                <div className="bg-[#222] p-6 rounded-xl border border-[#333] hover:border-[#0066cc] transition-colors flex flex-col items-center text-center group">
                                    <div className="w-14 h-14 bg-[#0066cc]/10 text-[#0066cc] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <TrendingUp size={28} />
                                    </div>
                                    <h4 className="text-3xl font-black text-white mb-1">350+</h4>
                                    <p className="text-[#777] font-semibold text-sm">Tips monthly</p>
                                </div>

                                <div className="bg-[#222] p-6 rounded-xl border border-[#333] hover:border-[#0066cc] transition-colors flex flex-col items-center text-center group">
                                    <div className="w-14 h-14 bg-[#0066cc]/10 text-[#0066cc] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Users size={28} />
                                    </div>
                                    <h4 className="text-3xl font-black text-white mb-1">30,000+</h4>
                                    <p className="text-[#777] font-semibold text-sm">Visitors a day</p>
                                </div>

                                <div className="bg-[#222] p-6 rounded-xl border border-[#333] hover:border-[#d4af37] transition-colors flex flex-col items-center text-center group">
                                    <div className="w-14 h-14 bg-[#d4af37]/10 text-[#d4af37] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Gift size={28} />
                                    </div>
                                    <h4 className="text-3xl font-black text-white mb-1">200+</h4>
                                    <p className="text-[#777] font-semibold text-sm">Bonuses & Promos</p>
                                </div>
                            </div>
                        </FadeIn>

                    </div>
                </div>
            </section>

            {/* 5. Our Authors Section */}
            <section className="bg-[#111111] section-pad">
                <div className="container-main">
                    <FadeIn delay={0.1}>
                        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-[#333] pb-4">
                            <div>
                                <div className="accent-line"></div>
                                <h2 className="text-3xl font-black text-white">Our Authors</h2>
                                <p className="text-[#b0b0b0] mt-2">Meet the expert tipsters behind our winning predictions</p>
                            </div>
                            <Link href="/authors" className="btn-outline flex items-center gap-2 text-[#b0b0b0] hover:text-white shrink-0">
                                See all authors <ChevronRight size={16} />
                            </Link>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredAuthors.map((author) => (
                                <AuthorCard key={author.id} author={author} />
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 6. Bookmaker & Casino Comparison Section */}
            <section className="bg-[#1a1a1a] section-pad border-y border-[#333] relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
                <div className="container-main relative z-10">
                    <FadeIn delay={0.1}>
                        <div className="w-full mb-10 text-center animate-fade-in relative block h-[400px] max-w-[1200px] mx-auto rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)] border border-[#333] hover:border-[#d4af37] transition-all">
                            <Image src="/casino-banner.png" alt="Casino Promotions" fill className="object-cover" priority sizes="(max-width: 1200px) 100vw, 1200px" />
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Bookmakers */}
                        <FadeIn delay={0.2} direction="right">
                            <div className="bg-[#111] p-8 rounded-2xl border border-[#333] shadow-xl">
                                <h2 className="text-2xl font-black text-white mb-4">Check our list of the best bookmakers</h2>
                                <p className="text-[#b0b0b0] text-sm mb-6 pb-6 border-b border-[#333]">
                                    Find the most reliable betting sites tailored for your region. We review odds, payouts, and user experience.
                                </p>

                                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                    <div>
                                        <h4 className="text-[#777] uppercase text-xs font-bold mb-3 tracking-wider">Continents</h4>
                                        <ul className="space-y-2">
                                            {Object.keys(bookmakersByRegion).map(continent => (
                                                <li key={continent}>
                                                    <Link href={`/bookmakers?continent=${continent.toLowerCase().replace(' ', '-')}`} className="text-[#0066cc] hover:text-[#3388dd] font-semibold text-sm hover:underline transition-colors">
                                                        {continent}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-[#777] uppercase text-xs font-bold mb-3 tracking-wider">Top Countries</h4>
                                        <ul className="space-y-2">
                                            {['Bangladesh', 'India', 'Pakistan', 'UK', 'Nigeria', 'South Africa'].map(country => (
                                                <li key={country}>
                                                    <Link href={`/bookmakers?country=${country.toLowerCase().replace(' ', '-')}`} className="text-[#0066cc] hover:text-[#3388dd] font-semibold text-sm hover:underline transition-colors flex items-center gap-2">
                                                        {country === 'Bangladesh' && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                                                        {country}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Casinos */}
                        <FadeIn delay={0.4} direction="left">
                            <div className="bg-[#111] p-8 rounded-2xl border border-[#333] shadow-xl">
                                <h2 className="text-2xl font-black text-white mb-4">Compare online casinos</h2>
                                <p className="text-[#b0b0b0] text-sm mb-6 pb-6 border-b border-[#333]">
                                    Discover top-rated online casinos offering the best welcome bonuses, free spins, and secure payment methods for local players.
                                </p>

                                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                    <div>
                                        <h4 className="text-[#777] uppercase text-xs font-bold mb-3 tracking-wider">Continents</h4>
                                        <ul className="space-y-2">
                                            {Object.keys(casinosByRegion).map(continent => (
                                                <li key={continent}>
                                                    <Link href={`/online-casinos?continent=${continent.toLowerCase().replace(' ', '-')}`} className="text-[#d4af37] hover:text-[#f0cf60] font-semibold text-sm hover:underline transition-colors">
                                                        {continent}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-[#777] uppercase text-xs font-bold mb-3 tracking-wider">Top Markets</h4>
                                        <ul className="space-y-2">
                                            {['Bangladesh', 'India', 'UK', 'Sweden', 'Germany', 'Canada'].map(country => (
                                                <li key={country}>
                                                    <Link href={`/online-casinos?country=${country.toLowerCase().replace(' ', '-')}`} className="text-[#d4af37] hover:text-[#f0cf60] font-semibold text-sm hover:underline transition-colors flex items-center gap-2">
                                                        {country === 'Bangladesh' && <span className="w-2 h-2 rounded-full bg-[#189a42]"></span>}
                                                        {country}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                    </div>
                </div>
            </section>

            {/* 7. Social Media Section */}
            <section className="bg-[#111111] section-pad">
                <div className="container-main text-center">
                    <FadeIn delay={0.1}>
                        <div className="max-w-2xl mx-auto mb-10">
                            <h2 className="text-3xl font-black text-white mb-3">Follow us on social media!</h2>
                            <p className="text-[#b0b0b0]">
                                Join our growing community across all platforms for daily free tips, exclusive bonuses, and late-breaking betting news.
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                            <a href="#" className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F56040] p-[1px] rounded-xl hover:scale-105 transition-transform shadow-lg group">
                                <div className="bg-[#111] group-hover:bg-transparent transition-colors rounded-[11px] px-6 py-4 flex flex-col items-center min-w-[140px]">
                                    <span className="font-bold text-white mb-1">Instagram</span>
                                    <span className="text-xs text-white/70">12k followers</span>
                                </div>
                            </a>

                            <a href="#" className="bg-[#0088cc] rounded-xl hover:scale-105 transition-transform shadow-lg shadow-[#0088cc]/20 px-6 py-4 flex flex-col items-center min-w-[140px]">
                                <span className="font-bold text-white mb-1">Telegram</span>
                                <span className="text-xs text-white/80">35k members</span>
                            </a>

                            <a href="#" className="bg-[#1877F2] rounded-xl hover:scale-105 transition-transform shadow-lg shadow-[#1877F2]/20 px-6 py-4 flex flex-col items-center min-w-[140px]">
                                <span className="font-bold text-white mb-1">Facebook</span>
                                <span className="text-xs text-white/80">8.5k followers</span>
                            </a>

                            <a href="#" className="bg-white rounded-xl hover:scale-105 transition-transform shadow-lg px-6 py-4 flex flex-col items-center min-w-[140px]">
                                <span className="font-bold text-black mb-1">X (Twitter)</span>
                                <span className="text-xs text-black/60">22k followers</span>
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 8. More News Section */}
            <section className="bg-[#1a1a1a] section-pad border-t border-[#333]">
                <div className="container-main">
                    <FadeIn delay={0.1}>
                        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-[#333] pb-4">
                            <div>
                                <div className="accent-line"></div>
                                <h2 className="text-3xl font-black text-white">More news</h2>
                                <p className="text-[#b0b0b0] mt-2">Latest sports updates and betting insights</p>
                            </div>
                            <Link href="/news" className="btn-outline flex items-center gap-2 text-[#b0b0b0] hover:text-white shrink-0">
                                Show more news <ChevronRight size={16} />
                            </Link>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recentArticles.map((article) => (
                                <NewsCard key={article.id} article={article} />
                            ))}
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.5}>
                        <div className="mt-10 text-center">
                            <Link href="/news" className="btn-primary py-3 px-8 text-lg font-bold">
                                View All Betting News
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 9. Newsletter Subscription */}
            <NewsletterSignup />

        </div>
    );
}
