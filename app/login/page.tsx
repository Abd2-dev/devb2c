import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function LoginPage() {
    return (
        <div className="bg-[#111111] min-h-screen pb-16">
            <div className="bg-[#1a1a1a] border-b border-[#333] pt-12 pb-16">
                <div className="container-main">
                    <div className="text-sm text-[#777] mb-4 flex items-center gap-2">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <span className="text-white">Sign In</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Sign In</h1>
                </div>
            </div>

            <div className="container-main mt-12 flex justify-center">
                <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-8 w-full max-w-md">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Email Address</label>
                            <input
                                type="email"
                                className="w-full bg-[#222] border border-[#444] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Password</label>
                            <input
                                type="password"
                                className="w-full bg-[#222] border border-[#444] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <label className="flex items-center gap-2 text-[#777]">
                                <input type="checkbox" className="rounded bg-[#222] border-[#444]" />
                                Remember me
                            </label>
                            <Link href="#" className="text-[#0066cc] hover:text-[#3388dd] transition-colors">Forgot password?</Link>
                        </div>
                        <button type="button" className="btn-primary w-full py-3 text-lg">
                            Sign In
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-[#333] text-center">
                        <p className="text-[#777]">
                            Don't have an account? <Link href="/register" className="text-[#0066cc] hover:text-[#3388dd] font-bold">Register here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
