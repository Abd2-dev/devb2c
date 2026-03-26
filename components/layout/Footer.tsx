import Link from 'next/link';
import Image from 'next/image';
import { bookmakersByRegion, casinosByRegion } from '@/lib/data/casinos';

export default function Footer() {
    return (
        <footer className="bg-[#111111] border-t border-[#333] pt-16 pb-8">
            <div className="container-main">
                {/* Main Footer Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">

                    {/* Column 1: Predictions */}
                    <div>
                        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-4 bg-[#d4af37] rounded-full inline-block"></span>
                            Predictions
                        </h3>
                        <ul className="space-y-3">
                            <li><Link href="/football-predictions" className="text-[#b0b0b0] hover:text-[#d4af37] text-sm transition-colors">Today&apos;s predictions</Link></li>
                            <li><Link href="/football-predictions/league/champions-league" className="text-[#b0b0b0] hover:text-[#d4af37] text-sm transition-colors">Champions League</Link></li>
                            <li><Link href="/football-predictions/league/europa-league" className="text-[#b0b0b0] hover:text-[#d4af37] text-sm transition-colors">Europa League</Link></li>
                            <li><Link href="/football-predictions/league/premier-league" className="text-[#b0b0b0] hover:text-[#d4af37] text-sm transition-colors">Premier League</Link></li>
                            <li><Link href="/football-predictions/league/la-liga" className="text-[#b0b0b0] hover:text-[#d4af37] text-sm transition-colors">La Liga</Link></li>
                            <li><Link href="/football-predictions/league/bundesliga" className="text-[#b0b0b0] hover:text-[#d4af37] text-sm transition-colors">Bundesliga</Link></li>
                            <li><Link href="/football-predictions/league/serie-a" className="text-[#b0b0b0] hover:text-[#d4af37] text-sm transition-colors">Serie A</Link></li>
                            <li><Link href="/football-predictions/league/ligue-1" className="text-[#b0b0b0] hover:text-[#d4af37] text-sm transition-colors">Ligue 1</Link></li>
                        </ul>
                    </div>

                    {/* Column 2: MightyTips */}
                    <div>
                        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-4 bg-[#0066cc] rounded-full inline-block"></span>
                            MightyTips
                        </h3>
                        <ul className="space-y-3">
                            <li><Link href="/news" className="text-[#b0b0b0] hover:text-[#0066cc] text-sm transition-colors">News</Link></li>
                            <li><Link href="/sitemap" className="text-[#b0b0b0] hover:text-[#0066cc] text-sm transition-colors">Sitemap</Link></li>
                            <li><Link href="/bookmakers?filter=payments" className="text-[#b0b0b0] hover:text-[#0066cc] text-sm transition-colors">Payment Methods</Link></li>
                            <li><Link href="/about-us" className="text-[#b0b0b0] hover:text-[#0066cc] text-sm transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="text-[#b0b0b0] hover:text-[#0066cc] text-sm transition-colors">Careers</Link></li>
                            <li><Link href="/contact" className="text-[#b0b0b0] hover:text-[#0066cc] text-sm transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Bookmakers */}
                    <div>
                        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-4 bg-[#d4af37] rounded-full inline-block"></span>
                            Bookmakers
                        </h3>
                        <ul className="space-y-3">
                            {Object.keys(bookmakersByRegion.Europe).slice(0, 8).map(country => (
                                <li key={country}>
                                    <Link href={`/bookmakers?country=${country.toLowerCase()}`} className="text-[#b0b0b0] hover:text-[#d4af37] text-sm transition-colors">
                                        {country}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Betting Apps */}
                    <div>
                        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-4 bg-[#0066cc] rounded-full inline-block"></span>
                            Betting Apps
                        </h3>
                        <ul className="space-y-3">
                            <li><Link href="/bookmakers/betting-apps?country=uk" className="text-[#b0b0b0] hover:text-[#0066cc] text-sm transition-colors">UK apps</Link></li>
                            <li><Link href="/bookmakers/betting-apps?country=canada" className="text-[#b0b0b0] hover:text-[#0066cc] text-sm transition-colors">Canada apps</Link></li>
                            <li><Link href="/bookmakers/betting-apps?country=ireland" className="text-[#b0b0b0] hover:text-[#0066cc] text-sm transition-colors">Ireland apps</Link></li>
                            <li><Link href="/bookmakers/betting-apps?country=south-africa" className="text-[#b0b0b0] hover:text-[#0066cc] text-sm transition-colors">South Africa apps</Link></li>
                            <li><Link href="/bookmakers/betting-apps?country=india" className="text-[#b0b0b0] hover:text-[#0066cc] text-sm transition-colors">India apps</Link></li>
                        </ul>
                    </div>

                    {/* Column 5: Info */}
                    <div>
                        <Link href="/" className="inline-block mb-6">
                            <Image src="/logo.png" alt="BSL Sports" width={150} height={40} className="h-10 w-auto hover:brightness-110 transition-all object-contain" />
                        </Link>

                        <p className="text-[#777] text-xs leading-relaxed mb-6">
                            BSL Sports provides expert sports betting tips, predictions, and bookmaker reviews. We promote responsible gambling.
                            <br /><br />
                            <strong>18+ Only.</strong> Please gamble responsibly.
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            <div className="bg-[#222] px-3 border border-[#333] py-1.5 rounded text-xs font-bold text-[#b0b0b0] flex items-center gap-1.5">
                                <span className="text-green-500">18+</span> BeGambleAware
                            </div>
                            <div className="bg-[#222] px-3 border border-[#333] py-1.5 rounded text-xs font-bold text-[#b0b0b0]">
                                DMCA Protected
                            </div>
                        </div>

                        <div className="bg-[#1a1a1a] p-3 rounded border border-[#333]">
                            <div className="text-xs text-[#777] uppercase tracking-wider font-bold mb-1">Rating</div>
                            <div className="flex items-center gap-2">
                                <div className="text-[#d4af37] text-lg font-bold">4.8/5</div>
                                <div className="flex text-[#d4af37] text-sm">
                                    ★★★★★
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="h-px w-full bg-[#333] mb-8"></div>

                {/* Bottom Bar: Languages & Copyright */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-medium">
                        <Link href="#" className="text-[#777] hover:text-white transition-colors">English</Link>
                        <Link href="#" className="text-[#777] hover:text-white transition-colors">Español</Link>
                        <Link href="#" className="text-[#777] hover:text-white transition-colors">Deutsch</Link>
                        <Link href="#" className="text-[#777] hover:text-white transition-colors">Français</Link>
                        <Link href="#" className="text-[#777] hover:text-white transition-colors">Português</Link>
                        <Link href="#" className="text-[#777] hover:text-white transition-colors">Italiano</Link>
                    </div>

                    <div className="flex flex-wrap justify-center lg:justify-end gap-4 text-xs text-[#777]">
                        <p>Copyright © 2026 BSL Sports. All rights reserved.</p>
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
