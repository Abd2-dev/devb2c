// lib/data/casinos.ts
export interface Casino {
    id: string;
    name: string;
    slug: string;
    logo: string; // initials
    logoColor: string;
    rating: number;
    bonus: string;
    affiliateUrl: string;
    reviewUrl: string;
    countries: string[];
    casinoType: ('new' | 'mobile' | 'live')[];
    paymentMethods: string[];
}

export const casinos: Casino[] = [
    {
        id: '1',
        name: 'LeoVegas',
        slug: 'leovegas',
        logo: 'LV',
        logoColor: '#FF6600',
        rating: 9.3,
        bonus: '100% up to €100 + 200 Free Spins',
        affiliateUrl: '#',
        reviewUrl: '/online-casinos/leovegas',
        countries: ['Sweden', 'UK', 'Finland', 'Germany'],
        casinoType: ['mobile', 'live'],
        paymentMethods: ['Visa', 'Mastercard', 'Trustly', 'PayPal'],
    },
    {
        id: '2',
        name: 'Casumo',
        slug: 'casumo',
        logo: 'CS',
        logoColor: '#8B2FC9',
        rating: 9.0,
        bonus: '100% Welcome Bonus up to €300',
        affiliateUrl: '#',
        reviewUrl: '/online-casinos/casumo',
        countries: ['Sweden', 'UK', 'Germany', 'Finland'],
        casinoType: ['new', 'mobile'],
        paymentMethods: ['Visa', 'Mastercard', 'Skrill', 'Neteller'],
    },
    {
        id: '3',
        name: 'Mr Green',
        slug: 'mr-green',
        logo: 'MG',
        logoColor: '#00A651',
        rating: 8.8,
        bonus: '100% up to €100 – Exclusive',
        affiliateUrl: '#',
        reviewUrl: '/online-casinos/mr-green',
        countries: ['Sweden', 'UK', 'Denmark', 'Norway'],
        casinoType: ['live', 'mobile'],
        paymentMethods: ['Visa', 'Mastercard', 'Trustly', 'PayPal'],
    },
    {
        id: '4',
        name: 'Bet-at-home Casino',
        slug: 'bet-at-home-casino',
        logo: 'BAH',
        logoColor: '#003399',
        rating: 8.5,
        bonus: '200% Welcome Bonus up to €200',
        affiliateUrl: '#',
        reviewUrl: '/online-casinos/bet-at-home-casino',
        countries: ['Germany', 'Austria', 'Switzerland'],
        casinoType: ['new', 'live'],
        paymentMethods: ['Visa', 'Mastercard', 'Skrill', 'PayPal'],
    },
];

export const bookmakersByRegion = {
    Europe: {
        Austria: ['bet365', 'william-hill', 'unibet'],
        Denmark: ['unibet', 'betsson', 'bet365'],
        France: ['1xbet', 'betclic', 'winamax'],
        Germany: ['bet365', 'betway', 'melbet'],
        Greece: ['stoiximan', 'pamestoixima', 'bet365'],
        Hungary: ['tippmix', 'bwin', 'bet365'],
        Norway: ['norsk-tipping', 'unibet', 'betsson'],
        Portugal: ['betclic', 'placard', 'bet365'],
        Spain: ['codere', 'bet365', '888sport'],
        Sweden: ['unibet', 'betsson', 'william-hill'],
        Switzerland: ['bet365', 'unibet', 'betway'],
        UK: ['bet365', 'william-hill', 'betway', 'unibet'],
    },
    Asia: {
        Bangladesh: ['1xbet', 'melbet', 'megapari', 'linebet'],
        India: ['parimatch', 'betway', '1xbet'],
        Japan: ['betway', 'bet365', 'dafabet'],
        Philippines: ['bewin', 'parimatch', 'bet365'],
        'South Korea': ['betway', '1xbet', 'dafabet'],
    },
    Africa: {
        Nigeria: ['betway', '1xbet', 'bet9ja'],
        Ghana: ['betway', 'sb', 'premierbet'],
        Kenya: ['betway', 'sportpesa', '1xbet'],
        'South Africa': ['betway', 'supabets', 'hollywoodbets'],
    },
    'North America': {
        Canada: ['betway', 'bet365', 'draftkings'],
        Mexico: ['betway', '1xbet', 'rivalo'],
    },
    'South America': {
        Brazil: ['bet365', 'betano', 'pinnacle'],
        Argentina: ['codere', 'bwin', 'bet365'],
    },
    Oceania: {
        Australia: ['tab', 'sportsbet', 'ladbrokes'],
        'New Zealand': ['tab', 'sports-direct', 'betway'],
    },
};

export const casinosByRegion = {
    Europe: ['UK', 'Sweden', 'Denmark', 'Norway', 'Finland', 'Germany', 'Austria', 'Switzerland', 'Netherlands', 'Belgium', 'Spain', 'Italy', 'Portugal', 'Poland'],
    Asia: ['Bangladesh', 'India', 'Japan', 'Thailand', 'Malaysia', 'Philippines'],
    'North America': ['Canada', 'USA', 'Mexico'],
    Oceania: ['Australia', 'New Zealand'],
};
