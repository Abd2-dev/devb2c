// lib/data/bookmakers.ts
export interface Bookmaker {
    id: string;
    name: string;
    slug: string;
    logo: string;
    rating: number;
    bonus: string;
    promoCode?: string;
    affiliateUrl: string;
    reviewUrl: string;
    countries: string[];
    paymentMethods: string[];
    featured?: boolean;
}

export const bookmakers: Bookmaker[] = [
    {
        id: '1',
        name: 'Megapari',
        slug: 'megapari',
        logo: 'MP',
        rating: 9.2,
        bonus: '100% Welcome bonus up to $230',
        promoCode: 'MIGHTY230',
        affiliateUrl: '#',
        reviewUrl: '/bookmakers/megapari',
        countries: ['UK', 'Germany', 'France', 'Italy'],
        paymentMethods: ['Visa', 'Mastercard', 'Skrill', 'Neteller'],
        featured: true,
    },
    {
        id: '2',
        name: '1xBet',
        slug: '1xbet',
        logo: '1X',
        rating: 8.8,
        bonus: '100% Welcome bonus up to €130',
        promoCode: 'MIGHTY130',
        affiliateUrl: '#',
        reviewUrl: '/bookmakers/1xbet',
        countries: ['UK', 'Germany', 'France', 'Spain'],
        paymentMethods: ['Visa', 'Mastercard', 'Bitcoin', 'Skrill'],
        featured: true,
    },
    {
        id: '3',
        name: 'Bet365',
        slug: 'bet365',
        logo: 'B365',
        rating: 9.5,
        bonus: 'Up to £50 in Bet Credits',
        affiliateUrl: '#',
        reviewUrl: '/bookmakers/bet365',
        countries: ['UK', 'Ireland', 'Australia', 'Spain'],
        paymentMethods: ['Visa', 'Mastercard', 'PayPal', 'Bank Transfer'],
        featured: true,
    },
    {
        id: '4',
        name: 'William Hill',
        slug: 'william-hill',
        logo: 'WH',
        rating: 9.0,
        bonus: '£30 in Free Bets',
        promoCode: 'WHC30',
        affiliateUrl: '#',
        reviewUrl: '/bookmakers/william-hill',
        countries: ['UK', 'Ireland', 'Germany', 'Italy'],
        paymentMethods: ['Visa', 'Mastercard', 'PayPal', 'Skrill'],
        featured: true,
    },
    {
        id: '5',
        name: 'Betway',
        slug: 'betway',
        logo: 'BW',
        rating: 8.7,
        bonus: 'Welcome Bonus up to £30',
        affiliateUrl: '#',
        reviewUrl: '/bookmakers/betway',
        countries: ['UK', 'South Africa', 'Canada', 'Germany'],
        paymentMethods: ['Visa', 'Mastercard', 'Neteller', 'Skrill'],
        featured: false,
    },
    {
        id: '6',
        name: 'Unibet',
        slug: 'unibet',
        logo: 'UB',
        rating: 8.5,
        bonus: '€100 Free Bet',
        affiliateUrl: '#',
        reviewUrl: '/bookmakers/unibet',
        countries: ['UK', 'Sweden', 'Denmark', 'Norway'],
        paymentMethods: ['Visa', 'Mastercard', 'PayPal', 'Trustly'],
        featured: false,
    },
    {
        id: '7',
        name: 'Betsson',
        slug: 'betsson',
        logo: 'BS',
        rating: 8.4,
        bonus: '100% up to €100',
        affiliateUrl: '#',
        reviewUrl: '/bookmakers/betsson',
        countries: ['Sweden', 'Finland', 'Norway', 'Germany'],
        paymentMethods: ['Visa', 'Mastercard', 'Skrill', 'Neteller'],
        featured: false,
    },
    {
        id: '8',
        name: 'Melbet',
        slug: 'melbet',
        logo: 'MLB',
        rating: 8.3,
        bonus: '€100 on the start!',
        promoCode: 'MIGHTY100',
        affiliateUrl: '#',
        reviewUrl: '/bookmakers/melbet',
        countries: ['Germany', 'France', 'Ukraine', 'Turkey'],
        paymentMethods: ['Visa', 'Mastercard', 'Skrill', 'Webmoney'],
        featured: false,
    },
];

export const getBookmakerBySlug = (slug: string) =>
    bookmakers.find(b => b.slug === slug);

export const getFeaturedBookmakers = () => bookmakers.filter(b => b.featured);
