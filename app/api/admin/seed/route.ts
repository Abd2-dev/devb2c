import { NextResponse } from 'next/server';

// Prevent static generation of this route since it uses headers (via NextAuth)
export const dynamic = 'force-dynamic';
import connectToDatabase from '@/lib/mongodb';
import { Author } from '@/lib/models/Author';
import { Prediction } from '@/lib/models/Prediction';
import { Bookmaker } from '@/lib/models/Bookmaker';
import { Article } from '@/lib/models/Article';

import { authors as mockAuthors } from '@/lib/data/authors';
import { predictions as mockPredictions, accumulatorTips as mockAccumulatorTips } from '@/lib/data/predictions';
import { bookmakers as mockBookmakers } from '@/lib/data/bookmakers';
import { articles as mockArticles } from '@/lib/data/articles';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();

        // Seed Authors
        for (const author of mockAuthors) {
            await Author.findOneAndUpdate(
                { slug: author.slug },
                {
                    $set: {
                        name: author.name,
                        username: author.username,
                        title: author.title,
                        bio: author.bio,
                        longBio: author.longBio,
                        avatar: author.avatar,
                        avatarColor: author.avatarColor,
                        specialties: author.specialties,
                        tipsCount: author.tipsCount,
                        articlesCount: author.articlesCount
                    }
                },
                { upsert: true, new: true }
            );
        }

        // Seed Bookmakers
        for (const bookmaker of mockBookmakers) {
            const b = bookmaker as any;
            await Bookmaker.findOneAndUpdate(
                { slug: b.slug },
                {
                    $set: {
                        name: b.name,
                        logo: b.logo,
                        rating: b.rating,
                        bonus: b.bonus,
                        promoCode: b.promoCode || '',
                        affiliateUrl: b.link || '#',
                        reviewUrl: b.reviewUrl,
                        countries: b.countries || [],
                        paymentMethods: [],
                        featured: b.featured || false
                    }
                },
                { upsert: true, new: true }
            );
        }

        // Seed Articles
        for (const article of mockArticles) {
            const a = article as any;
            await Article.findOneAndUpdate(
                { slug: a.slug },
                {
                    $set: {
                        title: a.title,
                        excerpt: a.excerpt,
                        content: a.content,
                        category: a.category,
                        categorySlug: a.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                        authorId: a.authorId,
                        publishedAt: typeof a.date === 'string' ? new Date(a.date) : new Date(a.publishedAt || Date.now()),
                        imageColor: '#0066cc', // Mock does not have imageColor
                        tags: []
                    }
                },
                { upsert: true, new: true }
            );
        }

        // Seed Predictions
        for (const prediction of mockPredictions) {
            await Prediction.findOneAndUpdate(
                { slug: prediction.slug },
                {
                    $set: {
                        homeTeam: prediction.homeTeam,
                        awayTeam: prediction.awayTeam,
                        league: prediction.league,
                        leagueSlug: prediction.leagueSlug,
                        matchDate: prediction.matchDate,
                        matchTime: prediction.matchTime,
                        predictionType: prediction.predictionType,
                        predictionLabel: prediction.predictionLabel,
                        odds: prediction.odds,
                        w1: prediction.w1,
                        draw: prediction.draw,
                        w2: prediction.w2,
                        description: prediction.description,
                        authorId: prediction.authorId,
                        bookmakerSlug: prediction.bookmakerSlug
                    }
                },
                { upsert: true, new: true }
            );
        }

        // Seed Accumulator Tips as Predictions (Converting format)
        for (const accTip of mockAccumulatorTips) {
            await Prediction.findOneAndUpdate(
                { slug: accTip.slug },
                {
                    $set: {
                        homeTeam: accTip.homeTeam,
                        awayTeam: accTip.awayTeam,
                        league: accTip.league,
                        leagueSlug: accTip.league.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                        matchDate: new Date().toISOString().split('T')[0], // placeholder
                        matchTime: accTip.matchTime,
                        predictionType: 'accumulator',
                        predictionLabel: accTip.predictionLabel,
                        odds: accTip.odds,
                        w1: 0,
                        draw: 0,
                        w2: 0,
                        description: accTip.description,
                        authorId: accTip.authorId
                    }
                },
                { upsert: true, new: true }
            );
        }

        return NextResponse.json({ message: 'Database seeded successfully!' });
    } catch (error: any) {
        console.error('Seeding error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
