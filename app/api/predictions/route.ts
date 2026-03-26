import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Prediction } from '@/lib/models/Prediction';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    try {
        await connectToDatabase();
        const predictions = await Prediction.find({}).sort({ matchDate: 1, matchTime: 1 });
        return NextResponse.json(predictions);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch predictions' }, { status: 500 });
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
        const prediction = await Prediction.create(body);
        return NextResponse.json(prediction, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: 'Prediction slug already exists.' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to create prediction', details: error.message }, { status: 400 });
    }
}
