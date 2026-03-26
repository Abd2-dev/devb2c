'use client';

import { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const [currentLang, setCurrentLang] = useState<'en' | 'bn'>('en');

    useEffect(() => {
        // Check current language from Google Translate cookie
        const checkCookie = () => {
            const match = document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/);
            if (match) {
                const val = match[2];
                if (val.includes('/bn')) {
                    setCurrentLang('bn');
                } else {
                    setCurrentLang('en');
                }
            } else {
                setCurrentLang('en');
            }
        };

        checkCookie();

        // Optional: you can listen to cookie changes or just check periodically if desired, 
        // but typically a reload happens or the user invokes it directly.
    }, []);

    const switchLanguage = (lang: 'en' | 'bn') => {
        if (lang === currentLang) return;

        // The googtrans cookie format is usually '/auto/target_lang' or '/source_lang/target_lang'
        // Let's set it to translate from English to Bengali, or reset to English
        const domain = window.location.hostname;

        if (lang === 'bn') {
            document.cookie = `googtrans=/en/bn; path=/; domain=${domain}`;
            document.cookie = `googtrans=/en/bn; path=/`;
        } else {
            // To revert to original (English), we clear the cookie
            document.cookie = `googtrans=/en/en; max-age=0; path=/; domain=${domain}`;
            document.cookie = `googtrans=/en/en; max-age=0; path=/`;
            document.cookie = `googtrans=; max-age=0; path=/; domain=${domain}`;
            document.cookie = `googtrans=; max-age=0; path=/`;
        }

        // Force reload to apply the translation script changes
        window.location.reload();
    };

    return (
        <div className="relative group flex items-center">
            <button className="flex items-center gap-2 text-white hover:text-[#d4af37] font-semibold text-sm transition-colors uppercase tracking-wider bg-[#222] border border-[#333] hover:border-[#d4af37] px-3 py-1.5 rounded-full">
                <Globe size={16} className={currentLang === 'bn' ? 'text-[#0066cc]' : 'text-[#d4af37]'} />
                {currentLang === 'en' ? 'EN' : 'বাংলা'}
            </button>

            {/* Dropdown Menu */}
            <div className="absolute top-full right-0 mt-2 w-32 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden text-sm">
                <button
                    onClick={() => switchLanguage('en')}
                    className={`w-full text-left px-4 py-2 hover:bg-[#222] transition-colors flex items-center justify-between ${currentLang === 'en' ? 'text-[#d4af37] font-bold bg-[#222]' : 'text-[#b0b0b0]'}`}
                >
                    English
                    {currentLang === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>}
                </button>
                <button
                    onClick={() => switchLanguage('bn')}
                    className={`w-full text-left px-4 py-2 hover:bg-[#222] transition-colors flex items-center justify-between ${currentLang === 'bn' ? 'text-[#0066cc] font-bold bg-[#222]' : 'text-[#b0b0b0]'}`}
                >
                    বাংলা
                    {currentLang === 'bn' && <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc]"></span>}
                </button>
            </div>
        </div>
    );
}
