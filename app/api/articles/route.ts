import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Article } from '@/lib/models/Article';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    try {
        await connectToDatabase();
        const articles = await Article.find({}).sort({ publishedAt: -1 });
        return NextResponse.json(articles);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        const body = await request.json();
        const article = await Article.create(body);
        return NextResponse.json(article, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: 'Article slug already exists.' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to create article', details: error.message }, { status: 400 });
    }
}
