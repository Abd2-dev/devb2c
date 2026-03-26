import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Prediction } from '@/lib/models/Prediction';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    try {
        await connectToDatabase();
        const prediction = await Prediction.findOne({ slug: params.slug });

        if (!prediction) {
            return NextResponse.json({ error: 'Prediction not found' }, { status: 404 });
        }

        return NextResponse.json(prediction);
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to fetch prediction', details: error.message }, { status: 500 });
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

        const updated = await Prediction.findOneAndUpdate({ slug: params.slug }, body, { new: true, runValidators: true });

        if (!updated) {
            return NextResponse.json({ error: 'Prediction not found' }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to update prediction', details: error.message }, { status: 400 });
    }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        const deleted = await Prediction.findOneAndDelete({ slug: params.slug });

        if (!deleted) {
            return NextResponse.json({ error: 'Prediction not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to delete prediction', details: error.message }, { status: 500 });
    }
}
