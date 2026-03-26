import type { Metadata } from 'next';
import './globals.css';
import GlobalLayoutWrapper from '@/components/layout/GlobalLayoutWrapper';
import Script from 'next/script';
import { Providers } from '@/components/Providers';
import { FavoritesProvider } from '@/components/context/FavoritesContext';

export const metadata: Metadata = {
    title: 'BSL Sports – Free Football Tips, Predictions & Betting Advice',
    description:
        'Get expert football tips, accumulator predictions, and bookmaker reviews from professional tipsters. Join 30,000+ daily visitors trusting BSL Sports.',
    keywords: 'football tips, betting predictions, accumulator tips, free tips, bookmaker reviews',
    icons: {
        icon: '/favicon.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className="bg-[#111111] text-white font-sans">
                <Providers>
                    <FavoritesProvider>
                        <GlobalLayoutWrapper>{children}</GlobalLayoutWrapper>
                    </FavoritesProvider>
                </Providers>

                {/* Hidden container for Google Translate initialization */}
                <div id="google_translate_element" style={{ display: 'none' }}></div>

                <Script id="google-translate-config" strategy="beforeInteractive">
                    {`
                        function googleTranslateElementInit() {
                            new window.google.translate.TranslateElement({
                                pageLanguage: 'en',
                                includedLanguages: 'en,bn', // Only English and Bengali
                                autoDisplay: false
                            }, 'google_translate_element');
                        }
                    `}
                </Script>
                <Script
                    src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
                    strategy="afterInteractive"
                />
            </body>
        </html>
    );
}
