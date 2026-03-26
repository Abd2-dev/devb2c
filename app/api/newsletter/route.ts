import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Subscriber } from '@/lib/models/Subscriber';

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Use updateOne with upsert to prevent duplicate key crashes
        // If email exists, update status to active
        const result = await Subscriber.updateOne(
            { email },
            { $set: { status: 'active', email } },
            { upsert: true }
        );

        return NextResponse.json({ message: 'Successfully subscribed' }, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Server error, please try again later' }, { status: 500 });
    }
}
