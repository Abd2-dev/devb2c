import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Bookmaker } from '@/lib/models/Bookmaker';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        const body = await request.json();

        // Using findByIdAndUpdate to replace the document fields
        const updated = await Bookmaker.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });

        if (!updated) {
            return NextResponse.json({ error: 'Bookmaker not found' }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to update bookmaker', details: error.message }, { status: 400 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        const deleted = await Bookmaker.findByIdAndDelete(params.id);

        if (!deleted) {
            return NextResponse.json({ error: 'Bookmaker not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to delete bookmaker', details: error.message }, { status: 500 });
    }
}
