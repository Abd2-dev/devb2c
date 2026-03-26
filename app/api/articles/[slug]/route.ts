import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Article } from '@/lib/models/Article';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    try {
        await connectToDatabase();
        const article = await Article.findOne({ slug: params.slug });

        if (!article) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        return NextResponse.json(article);
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to fetch article', details: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        const body = await request.json();

        const updated = await Article.findOneAndUpdate({ slug: params.slug }, body, { new: true, runValidators: true });

        if (!updated) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to update article', details: error.message }, { status: 400 });
    }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        const deleted = await Article.findOneAndDelete({ slug: params.slug });

        if (!deleted) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to delete article', details: error.message }, { status: 500 });
    }
}
