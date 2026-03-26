import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Bookmaker } from '@/lib/models/Bookmaker';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    try {
        await connectToDatabase();
        const bookmakers = await Bookmaker.find({}).sort({ rating: -1 });
        return NextResponse.json(bookmakers);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch bookmakers' }, { status: 500 });
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
        const newBookmaker = await Bookmaker.create(body);
        return NextResponse.json(newBookmaker, { status: 201 });
    } catch (error: any) {
        // Generate a simple slug if it's a duplicate key error
        if (error.code === 11000) {
            return NextResponse.json({ error: 'Bookmaker slug already exists. Please choose a unique name.' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to create bookmaker', details: error.message }, { status: 400 });
    }
}
