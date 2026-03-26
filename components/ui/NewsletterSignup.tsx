'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export default function NewsletterSignup() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setMessage('Thanks! You have been added to our mailing list.');
                setEmail('');
            } else {
                setStatus('error');
                setMessage(data.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Network error. Please try again later.');
        }
    };

    return (
        <section className="bg-gradient-to-r from-[#0066cc]/20 to-[#d4af37]/20 border-y border-[#333] py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>

            <div className="container-main relative z-10">
                <FadeIn>
                    <div className="max-w-3xl mx-auto text-center bg-[#111]/80 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-[#333] shadow-2xl">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                            Get Winning Tips in Your Inbox
                        </h2>
                        <p className="text-[#b0b0b0] text-lg mb-8">
                            Subscribe to our newsletter for exclusive daily predictions, flash bonus alerts, and expert betting strategies straight from our analysts.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto relative">
                            <input
                                type="email"
                                required
                                placeholder="Enter your email address..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'loading' || status === 'success'}
                                className="flex-1 bg-[#222] border border-[#444] rounded-xl px-5 py-3 text-white focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] disabled:opacity-50 transition-all"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading' || status === 'success'}
                                className="bg-gradient-to-r from-[#d4af37] to-[#e6c86a] text-black font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                            >
                                {status === 'loading' ? (
                                    <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                                ) : status === 'success' ? (
                                    'Subscribed!'
                                ) : (
                                    <>
                                        Subscribe <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        {message && (
                            <div className={`mt-4 text-sm font-medium animate-fade-in ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                {message}
                            </div>
                        )}

                        <p className="text-[#555] text-xs mt-6">
                            By subscribing, you agree to our Terms of Service and Privacy Policy. We never spam.
                        </p>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
