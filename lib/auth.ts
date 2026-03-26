import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/mongodb";
import { AdminUser } from "@/lib/models/AdminUser";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }

                await connectToDatabase();

                const user = await AdminUser.findOne({ email: credentials.email });

                if (!user) {
                    throw new Error('User not found');
                }

                const isPasswordMatch = await bcrypt.compare(credentials.password, user.passwordHash);

                if (!isPasswordMatch) {
                    throw new Error('Incorrect password');
                }

                return { id: user._id.toString(), name: user.name, email: user.email };
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
            }
            return session;
        }
    },
    pages: {
        signIn: '/admin/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
};
