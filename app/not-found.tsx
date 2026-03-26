import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-8xl font-black text-[#d4af37] mb-4 tracking-tighter shadow-sm animate-pulse">404</h1>
            <h2 className="text-3xl font-black text-white mb-6">Page Not Found</h2>
            <p className="text-[#b0b0b0] max-w-md mb-8 text-lg">
                The content you are looking for does not exist, has been removed, or is temporarily unavailable.
            </p>
            <div className="flex gap-4">
                <Link href="/" className="btn-gold py-3 px-8 text-lg font-bold shadow-lg shadow-[#d4af37]/20 hover:-translate-y-1 transition-transform">
                    Return Home
                </Link>
                <Link href="/bookmakers" className="btn-outline py-3 px-8 text-lg font-bold">
                    View Betting Sites
                </Link>
            </div>
        </div>
    );
}
