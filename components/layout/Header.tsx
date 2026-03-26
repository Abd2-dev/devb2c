'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, Search, User, X, ChevronDown, Star } from 'lucide-react';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useFavorites } from '@/components/context/FavoritesContext';

const megaMenuData = {
    predictions: [
        { title: 'Football Predictions for Today', href: '/football-predictions' },
        { title: 'Football Predictions for Tomorrow', href: '/football-predictions' },
        { title: 'Football Predictions for the Weekend', href: '/football-predictions' },
        { title: 'Champions League', href: '/football-predictions/champions-league' },
        { title: 'Europa League', href: '/football-predictions/europa-league' },
        { title: 'Premier League', href: '/football-predictions/premier-league' },
        { title: 'La Liga', href: '/football-predictions/la-liga' },
        { title: 'Serie A', href: '/football-predictions/serie-a' },
    ],
    tips: [
        { title: 'Accumulator tips', href: '/football-betting-tips/accumulator' },
        { title: 'Jackpot predictions', href: '/football-betting-tips/jackpot' },
        { title: '1X2 tips', href: '/football-betting-tips/1x2' },
        { title: 'Both teams to score (BTTS)', href: '/football-betting-tips/btts' },
        { title: 'Correct score tips', href: '/football-betting-tips/correct-score' },
        { title: 'Over 2.5 goals tips', href: '/football-betting-tips/over-2-5-goals' },
        { title: 'Bet of the day tips', href: '/football-betting-tips/bet-of-the-day' },
    ],
    bookmakers: [
        { title: 'Europe', href: '/bookmakers?region=europe' },
        { title: 'Asia', href: '/bookmakers?region=asia' },
        { title: 'Africa', href: '/bookmakers?region=africa' },
        { title: 'North America', href: '/bookmakers?region=north-america' },
        { title: 'South America', href: '/bookmakers?region=south-america' },
        { title: 'Oceania', href: '/bookmakers?region=oceania' },
        { title: 'Payment methods', href: '/bookmakers?filter=payments' },
        { title: 'New Bookmakers', href: '/bookmakers?filter=new' },
    ],
};

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const searchRef = useRef<HTMLDivElement>(null);
    const searchButtonRef = useRef<HTMLButtonElement>(null);
    const pathname = usePathname();
    const { favorites, toggleDrawer } = useFavorites();

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isSearchOpen && searchRef.current && !searchRef.current.contains(event.target as Node) &&
                searchButtonRef.current && !searchButtonRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSearchOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <header className="bg-[#111111] border-b border-[#333333] sticky top-0 z-50">
            <div className="container-main">
                <div className="flex items-center justify-between h-20">

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-white p-2 hover:text-[#d4af37] transition-colors"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu size={28} />
                    </button>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Image src="/logo.png" alt="BSL Sports" width={150} height={40} className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300" priority />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1 h-full">

                        {/* Predictions Dropdown */}
                        <div
                            className="relative h-full flex items-center px-3 cursor-pointer group"
                            onMouseEnter={() => setActiveDropdown('predictions')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <span className={`font-semibold flex items-center gap-1 transition-colors ${activeDropdown === 'predictions' ? 'text-[#d4af37]' : 'text-white'}`}>
                                Predictions <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'predictions' ? 'rotate-180' : ''}`} />
                            </span>

                            {activeDropdown === 'predictions' && (
                                <div className="mega-menu p-6 w-[600px] flex gap-8">
                                    <div className="flex-1">
                                        <h3 className="gold-text font-bold mb-4 uppercase tracking-wider text-sm border-b border-[#333] pb-2">By Date</h3>
                                        <ul className="space-y-3">
                                            {megaMenuData.predictions.slice(0, 3).map((item, i) => (
                                                <li key={i}>
                                                    <Link href={item.href} className="text-[#b0b0b0] hover:text-[#d4af37] text-sm font-medium transition-colors block">
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="gold-text font-bold mb-4 uppercase tracking-wider text-sm border-b border-[#333] pb-2">Top Leagues</h3>
                                        <ul className="space-y-3">
                                            {megaMenuData.predictions.slice(3).map((item, i) => (
                                                <li key={i}>
                                                    <Link href={item.href} className="text-[#b0b0b0] hover:text-[#d4af37] text-sm font-medium transition-colors block">
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Tips Dropdown */}
                        <div
                            className="relative h-full flex items-center px-3 cursor-pointer group"
                            onMouseEnter={() => setActiveDropdown('tips')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <span className={`font-semibold flex items-center gap-1 transition-colors ${activeDropdown === 'tips' ? 'text-[#d4af37]' : 'text-white'}`}>
                                Football Tips <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'tips' ? 'rotate-180' : ''}`} />
                            </span>

                            {activeDropdown === 'tips' && (
                                <div className="mega-menu p-6 w-[350px]">
                                    <h3 className="gold-text font-bold mb-4 uppercase tracking-wider text-sm border-b border-[#333] pb-2">Betting Tips</h3>
                                    <ul className="grid grid-cols-1 gap-3">
                                        {megaMenuData.tips.map((item, i) => (
                                            <li key={i}>
                                                <Link href={item.href} className="text-[#b0b0b0] hover:text-[#d4af37] text-sm font-medium transition-colors block">
                                                    {item.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Bookmakers Dropdown */}
                        <div
                            className="relative h-full flex items-center px-3 cursor-pointer group"
                            onMouseEnter={() => setActiveDropdown('bookmakers')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <span className={`font-semibold flex items-center gap-1 transition-colors ${activeDropdown === 'bookmakers' ? 'text-[#d4af37]' : 'text-white'}`}>
                                Betting Sites <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'bookmakers' ? 'rotate-180' : ''}`} />
                            </span>

                            {activeDropdown === 'bookmakers' && (
                                <div className="mega-menu p-6 w-[450px]">
                                    <h3 className="gold-text font-bold mb-4 uppercase tracking-wider text-sm border-b border-[#333] pb-2">By Region & Category</h3>
                                    <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
                                        {megaMenuData.bookmakers.map((item, i) => (
                                            <li key={i}>
                                                <Link href={item.href} className="text-[#b0b0b0] hover:text-[#d4af37] text-sm font-medium transition-colors block">
                                                    {item.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Simple Links */}
                        <Link href="/bonuses" className="px-3 font-semibold text-white hover:text-[#d4af37] transition-colors nav-link">
                            Bonuses
                        </Link>
                        <Link href="/online-casinos" className="px-3 font-semibold text-white hover:text-[#d4af37] transition-colors nav-link">
                            Casinos
                        </Link>
                        <Link href="/news" className="px-3 font-semibold text-white hover:text-[#d4af37] transition-colors nav-link">
                            News
                        </Link>
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 md:gap-4">

                        {/* Favorites Toggle */}
                        <button
                            onClick={toggleDrawer}
                            className="relative text-[#b0b0b0] hover:text-[#d4af37] transition-colors h-10 w-10 flex items-center justify-center rounded-full hover:bg-[#222]"
                            aria-label="View Favorites"
                        >
                            <Star size={20} />
                            {favorites.length > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-[#d4af37] text-black text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                                    {favorites.length}
                                </span>
                            )}
                        </button>

                        {/* Search Toggle */}
                        <button
                            ref={searchButtonRef}
                            className="text-[#b0b0b0] hover:text-white transition-colors h-10 w-10 flex items-center justify-center rounded-full hover:bg-[#222]"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            aria-label="Toggle search"
                        >
                            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                        </button>

                        <LanguageSwitcher />

                        /* Desktop Auth */
                        <div className="hidden md:flex items-center gap-3">
                            <Link href="/login" className="text-white hover:text-[#d4af37] font-semibold text-sm transition-colors flex items-center gap-1.5">
                                <User size={16} /> Sign In
                            </Link>
                            <Link href="/register" className="btn-primary">
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar Dropdown */}
            {isSearchOpen && (
                <div ref={searchRef} className="absolute top-full left-0 w-full bg-[#1a1a1a] border-b border-[#333] p-4 shadow-2xl animate-slide-down">
                    <div className="container-main max-w-[800px]">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder="Search predictions, tips, bookmakers..."
                                className="w-full bg-[#222] border border-[#444] rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors text-lg"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]" size={24} />
                            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 btn-gold">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-[#111] z-50 flex flex-col animate-fade-in lg:hidden">
                    <div className="flex items-center justify-between p-4 border-b border-[#333]">
                        <span className="text-xl font-black text-white">Menu</span>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 border border-[#444] rounded-md text-[#b0b0b0] hover:text-white"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
                        <div className="flex gap-2">
                            <Link href="/register" className="btn-primary flex-1 text-center" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
                            <Link href="/login" className="btn-outline flex-1 text-center" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                        </div>

                        <div className="flex justify-center border-b border-[#333] pb-6">
                            <LanguageSwitcher />
                        </div>

                        <nav className="flex flex-col gap-2">
                            <div className="py-3 border-b border-[#333]">
                                <h4 className="text-[#777] uppercase text-xs font-bold mb-3 tracking-wider">Predictions</h4>
                                <ul className="space-y-3">
                                    {megaMenuData.predictions.slice(0, 4).map((item, i) => (
                                        <li key={i}>
                                            <Link href={item.href} className="text-white font-medium block" onClick={() => setIsMobileMenuOpen(false)}>
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="py-3 border-b border-[#333]">
                                <h4 className="text-[#777] uppercase text-xs font-bold mb-3 tracking-wider">Football Tips</h4>
                                <ul className="space-y-3">
                                    {megaMenuData.tips.slice(0, 4).map((item, i) => (
                                        <li key={i}>
                                            <Link href={item.href} className="text-white font-medium block" onClick={() => setIsMobileMenuOpen(false)}>
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="py-3 border-b border-[#333]">
                                <h4 className="text-[#777] uppercase text-xs font-bold mb-3 tracking-wider">Bookmakers</h4>
                                <ul className="space-y-3">
                                    <li><Link href="/bookmakers" className="text-white font-medium block" onClick={() => setIsMobileMenuOpen(false)}>All Bookmakers</Link></li>
                                    <li><Link href="/bookmakers/betting-apps" className="text-white font-medium block" onClick={() => setIsMobileMenuOpen(false)}>Betting Apps</Link></li>
                                    <li><Link href="/bonuses" className="text-white font-medium block" onClick={() => setIsMobileMenuOpen(false)}>Bonuses</Link></li>
                                </ul>
                            </div>

                            <div className="py-3">
                                <ul className="space-y-4 pt-2 border-t border-[#333]">
                                    <li><Link href="/online-casinos" className="text-xl font-bold text-white block" onClick={() => setIsMobileMenuOpen(false)}>Online Casinos</Link></li>
                                    <li><Link href="/news" className="text-xl font-bold text-white block" onClick={() => setIsMobileMenuOpen(false)}>News</Link></li>
                                    <li><Link href="/about-us" className="text-xl font-bold text-white block" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}
