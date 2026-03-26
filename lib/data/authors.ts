// lib/data/authors.ts
export interface Author {
    id: string;
    slug: string;
    name: string;
    username: string;
    title: string;
    bio: string;
    longBio: string;
    avatar: string; // initials for fallback
    avatarColor: string;
    specialties: string[];
    tipsCount: number;
    articlesCount: number;
}

export const authors: Author[] = [
    {
        id: 'kate-richardson',
        slug: 'kate-richardson',
        name: 'Kate Richardson',
        username: 'kate_r',
        title: 'Senior Sports Analyst',
        bio: 'Premier League specialist with 8+ years of experience in football analytics and sports journalism.',
        longBio: 'Kate Richardson is a highly regarded sports journalist and betting analyst. With over 8 years of experience covering the Premier League, she brings data-driven insights and deep tactical knowledge to every prediction. Kate holds a degree in Sports Science and has worked with multiple top UK sports media outlets.',
        avatar: 'KR',
        avatarColor: '#8B5CF6',
        specialties: ['Premier League', 'Championship', 'BTTS Predictions'],
        tipsCount: 342,
        articlesCount: 89,
    },
    {
        id: 'aleksandar-krstic',
        slug: 'aleksandar-krstic',
        name: 'Aleksandar Krstić',
        username: 'don_andres',
        title: 'Head Tipster',
        bio: 'UEFA-licensed analyst covering European football with a focus on Serie A and Champions League.',
        longBio: 'Aleksandar Krstić, known online as don_andres, is MightyTips\' Head Tipster. With a UEFA analytics license and former career in professional football scouting, his predictions carry serious weight. He specialises in statistical modelling and value bet identification across the major European leagues.',
        avatar: 'AK',
        avatarColor: '#EF4444',
        specialties: ['Serie A', 'Champions League', 'Accumulator Tips'],
        tipsCount: 521,
        articlesCount: 124,
    },
    {
        id: 'nemanja-dojcinovic',
        slug: 'nemanja-dojcinovic',
        name: 'Nemanja Dojčinović',
        username: 'nema_tips',
        title: 'Bundesliga Expert',
        bio: 'German football fanatic and data analyst providing expert Bundesliga tips and predictions.',
        longBio: 'Nemanja Dojčinović spent 5 years studying in Germany and developed a deep passion for Bundesliga football. His unique insider knowledge combined with quantitative match analysis makes him one of the most accurate Bundesliga tipsters in Europe.',
        avatar: 'ND',
        avatarColor: '#F59E0B',
        specialties: ['Bundesliga', 'Over/Under Markets', 'Correct Score'],
        tipsCount: 287,
        articlesCount: 63,
    },
    {
        id: 'nemanja-lalic',
        slug: 'nemanja-lalic',
        name: 'Nemanja Lalić',
        username: 'lalic_tips',
        title: 'La Liga Specialist',
        bio: 'Spanish football expert covering La Liga with in-depth tactical breakdowns.',
        longBio: 'Nemanja Lalić is MightyTips\' go-to expert for La Liga predictions. His comprehensive knowledge of Spanish football culture, clubs, and player dynamics gives him a unique edge. Nemanja consistently delivers high-value predictions, particularly in El Clásico and top-six clashes.',
        avatar: 'NL',
        avatarColor: '#3B82F6',
        specialties: ['La Liga', '1X2 Predictions', 'Draw Tips'],
        tipsCount: 198,
        articlesCount: 45,
    },
    {
        id: 'nikola-lalic',
        slug: 'nikola-lalic',
        name: 'Nikola Lalić',
        username: 'niko_bets',
        title: 'Ligue 1 & Value Bet Analyst',
        bio: 'French football devotee with a talent for finding undervalued bets in Ligue 1.',
        longBio: 'Nikola Lalić focuses on finding value bets in leagues that receive less mainstream attention, particularly Ligue 1. He combines statistical research with a passion for discovering underdog stories and turning them into profitable betting opportunities.',
        avatar: 'NiL',
        avatarColor: '#10B981',
        specialties: ['Ligue 1', 'Value Bets', 'Under 2.5 Goals'],
        tipsCount: 156,
        articlesCount: 38,
    },
    {
        id: 'ryan-allan',
        slug: 'ryan-allan',
        name: 'Ryan Allan',
        username: 'ryan_picks',
        title: 'Football & MMA Analyst',
        bio: 'Scottish journalist covering football tips and MMA/boxing fight predictions.',
        longBio: 'Ryan Allan is a versatile sports writer covering both football and combat sports. Based in Glasgow, he has covered Scottish football for over a decade while expanding his expertise to MMA and boxing. His fight night predictions have an impressive long-term accuracy record.',
        avatar: 'RA',
        avatarColor: '#06B6D4',
        specialties: ['Premier League', 'MMA', 'Boxing Predictions'],
        tipsCount: 412,
        articlesCount: 176,
    },
];

export const getAuthorBySlug = (slug: string) => authors.find(a => a.slug === slug);
