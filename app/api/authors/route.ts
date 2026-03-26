import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Author } from '@/lib/models/Author';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    try {
        await connectToDatabase();
        const authors = await Author.find({}).sort({ name: 1 });
        return NextResponse.json(authors);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch authors' }, { status: 500 });
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
        const author = await Author.create(body);
        return NextResponse.json(author, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: 'Author slug or username already exists.' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to create author', details: error.message }, { status: 400 });
    }
}
