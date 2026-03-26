'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setError('Invalid email or password.');
                setIsLoading(false);
            } else {
                router.push('/admin');
            }
        } catch (err) {
            setError('An error occurred during authentication.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center p-4">

            <div className="w-full max-w-md animate-slide-up">
                {/* Brand Logo Wrapper */}
                <div className="flex flex-col items-center justify-center mb-10">
                    <Image src="/favicon.png" alt="BSL Sports" width={64} height={64} className="w-16 h-16 rounded-2xl mb-4 shadow-[0_0_30px_rgba(212,175,55,0.2)] object-cover" priority />
                    <h1 className="text-3xl font-black text-white tracking-tight">BSL Sports</h1>
                    <p className="text-[#b0b0b0] mt-2 font-mono text-sm tracking-widest uppercase">Admin Terminal</p>
                </div>

                {/* Login Form Card */}
                <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                    {/* Decorative Top Border */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d4af37] to-[#0066cc]"></div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm font-medium animate-shake">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Admin Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-[#222] border border-[#444] rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" size={18} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-[#222] border border-[#444] rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" size={18} />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${isLoading ? 'bg-[#333] text-[#777] cursor-not-allowed' : 'btn-gold'
                                }`}
                        >
                            {isLoading ? 'Authenticating...' : 'Access Dashboard'}
                        </button>
                    </form>
                </div>

                <p className="text-center text-[#555] mt-8 text-xs font-mono">
                    Secure access only. Unauthorized attempts will be logged.
                </p>
            </div>
        </div>
    );
}
