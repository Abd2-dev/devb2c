import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import { AdminUser } from '@/lib/models/AdminUser';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const setupToken = process.env.ADMIN_SETUP_TOKEN;
        const providedToken = request.headers.get('x-setup-token');

        if (!setupToken) {
            return NextResponse.json({ error: 'Bootstrap is not enabled.' }, { status: 403 });
        }

        if (!providedToken || providedToken !== setupToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const email = String(body?.email || '').trim().toLowerCase();
        const password = String(body?.password || '');
        const name = String(body?.name || 'Admin').trim();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
        }

        if (password.length < 8) {
            return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
        }

        await connectToDatabase();
        const passwordHash = await bcrypt.hash(password, 12);

        await AdminUser.findOneAndUpdate(
            { email },
            {
                $set: {
                    email,
                    passwordHash,
                    name,
                    role: 'admin'
                }
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({ message: 'Admin user created/updated successfully.', email });
    } catch (error: any) {
        console.error('Admin bootstrap failed:', error);
        return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
    }
}
