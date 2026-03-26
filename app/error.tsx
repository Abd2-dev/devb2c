'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Only log to console, normally this would send to Sentry/Datadog
        console.error("Global Error Caught:", error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-6xl font-black text-red-500 mb-4 tracking-tighter shadow-sm">Something went wrong</h1>
            <h2 className="text-xl font-medium text-[#b0b0b0] mb-8 max-w-lg leading-relaxed">
                We apologize for the inconvenience. Our technical team has been notified.
            </h2>
            <div className="flex gap-4">
                <button
                    onClick={() => reset()}
                    className="btn-gold py-3 px-8 text-lg font-bold shadow-lg shadow-[#d4af37]/20 hover:-translate-y-1 transition-transform"
                >
                    Try Again
                </button>
                <Link href="/" className="btn-outline py-3 px-8 text-lg font-bold">
                    Return Home
                </Link>
            </div>
        </div>
    );
}
