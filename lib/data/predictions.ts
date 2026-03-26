// lib/data/predictions.ts
export type PredictionType = '1x2' | 'btts' | 'over-2.5' | 'under-2.5' | 'over-3.5' | 'correct-score' | 'draw' | 'double-chance' | 'accumulator';

export interface Team {
    name: string;
    shortName: string;
    color: string;
}

export interface Prediction {
    id: string;
    homeTeam: Team;
    awayTeam: Team;
    league: string;
    leagueSlug: string;
    matchDate: string;
    matchTime: string;
    predictionType: PredictionType;
    predictionLabel: string;
    odds: number;
    w1: number;
    draw: number;
    w2: number;
    description: string;
    authorId: string;
    bookmakerSlug?: string;
    slug: string;
}

export interface AccumulatorTip {
    id: string;
    betType: string;
    homeTeam: Team;
    awayTeam: Team;
    league: string;
    matchTime: string;
    predictionLabel: string;
    description: string;
    authorId: string;
    odds: number;
    slug: string;
}

const teams: Record<string, Team> = {
    Manchester_United: { name: 'Manchester United', shortName: 'MAN UTD', color: '#DA291C' },
    Arsenal: { name: 'Arsenal', shortName: 'ARS', color: '#EF0107' },
    Liverpool: { name: 'Liverpool', shortName: 'LIV', color: '#C8102E' },
    Chelsea: { name: 'Chelsea', shortName: 'CHE', color: '#034694' },
    ManCity: { name: 'Man City', shortName: 'MCI', color: '#6CABDD' },
    Tottenham: { name: 'Tottenham', shortName: 'TOT', color: '#132257' },
    Barcelona: { name: 'Barcelona', shortName: 'BAR', color: '#004D98' },
    RealMadrid: { name: 'Real Madrid', shortName: 'RMA', color: '#FEBE10' },
    Atletico: { name: 'Atlético Madrid', shortName: 'ATM', color: '#CB3524' },
    Juventus: { name: 'Juventus', shortName: 'JUV', color: '#000000' },
    Inter: { name: 'Inter Milan', shortName: 'INT', color: '#0068A8' },
    Milan: { name: 'AC Milan', shortName: 'MIL', color: '#FB090B' },
    Napoli: { name: 'Napoli', shortName: 'NAP', color: '#12A0C3' },
    Roma: { name: 'Roma', shortName: 'ROM', color: '#8E1F2E' },
    PSG: { name: 'Paris Saint‑Germain', shortName: 'PSG', color: '#004170' },
    Lyon: { name: 'Olympique Lyonnais', shortName: 'OL', color: '#0087C8' },
    Monaco: { name: 'AS Monaco', shortName: 'ASM', color: '#EE2523' },
    Bayern: { name: 'Bayern Munich', shortName: 'BAY', color: '#DC052D' },
    Dortmund: { name: 'Borussia Dortmund', shortName: 'BVB', color: '#FDE100' },
    Leipzig: { name: 'RB Leipzig', shortName: 'RBL', color: '#DD0741' },
    Crystal_Palace: { name: 'Crystal Palace', shortName: 'CRY', color: '#1B458F' },
    AZ: { name: 'AZ Alkmaar', shortName: 'AZ', color: '#CC0000' },
    Noah: { name: 'Noah FC', shortName: 'NOA', color: '#228B22' },
    Lazio: { name: 'Lazio', shortName: 'LAZ', color: '#87CEEB' },
    Fiorentina: { name: 'Fiorentina', shortName: 'FIO', color: '#702082' },
};

export const accumulatorTips: AccumulatorTip[] = [
    {
        id: 'acc1',
        betType: 'BTTS – No',
        homeTeam: teams.Arsenal,
        awayTeam: teams.Chelsea,
        league: 'Premier League',
        matchTime: '15:00',
        predictionLabel: 'BTTS – No',
        description: 'Arsenal have kept clean sheets in their last 5 home games and Chelsea\'s goal drought away continues. Expect the Gunners to dominate without conceding.',
        authorId: 'kate-richardson',
        odds: 1.85,
        slug: 'arsenal-vs-chelsea-btts-no',
    },
    {
        id: 'acc2',
        betType: 'Under 2.5 Goals',
        homeTeam: teams.Bayern,
        awayTeam: teams.Dortmund,
        league: 'Bundesliga',
        matchTime: '17:30',
        predictionLabel: 'Under 2.5 Goals',
        description: 'Der Klassiker often produces tight affairs. Bayern\'s high press combined with Dortmund\'s defensive discipline should keep scoring low in this Bundesliga clash.',
        authorId: 'nemanja-dojcinovic',
        odds: 2.12,
        slug: 'bayern-vs-dortmund-under-2-5',
    },
    {
        id: 'acc3',
        betType: 'BTTS - Yes',
        homeTeam: teams.Liverpool,
        awayTeam: teams.ManCity,
        league: 'Premier League',
        matchTime: '14:00',
        predictionLabel: 'BTTS - Yes',
        description: 'Both Liverpool and Man City have one of the most clinical attacks in England. Both teams have scored in their last 6 meetings – this trend should continue.',
        authorId: 'ryan-allan',
        odds: 1.72,
        slug: 'liverpool-vs-mancity-btts-yes',
    },
];

export const predictions: Prediction[] = [
    // Premier League
    {
        id: 'pl1',
        homeTeam: teams.Arsenal,
        awayTeam: teams.Tottenham,
        league: 'Premier League',
        leagueSlug: 'premier-league',
        matchDate: '02.03',
        matchTime: '12:30',
        predictionType: '1x2',
        predictionLabel: 'Arsenal Win',
        odds: 1.75,
        w1: 1.75,
        draw: 3.80,
        w2: 4.50,
        description: 'Arsenal are flying high this season with home advantage. Tottenham have struggled away and we back the Gunners to take North London bragging rights.',
        authorId: 'kate-richardson',
        bookmakerSlug: 'bet365',
        slug: 'arsenal-vs-tottenham-prediction-02-03-2026',
    },
    {
        id: 'pl2',
        homeTeam: teams.Liverpool,
        awayTeam: teams.Chelsea,
        league: 'Premier League',
        leagueSlug: 'premier-league',
        matchDate: '02.03',
        matchTime: '17:30',
        predictionType: 'btts',
        predictionLabel: 'BTTS – Yes',
        odds: 1.68,
        w1: 1.95,
        draw: 3.90,
        w2: 3.75,
        description: 'Liverpool and Chelsea have both been prolific this season. Both teams to score is the standout bet as both defences have been leaky in recent weeks.',
        authorId: 'ryan-allan',
        bookmakerSlug: 'william-hill',
        slug: 'liverpool-vs-chelsea-prediction-02-03-2026',
    },
    {
        id: 'pl3',
        homeTeam: teams.ManCity,
        awayTeam: teams.Crystal_Palace,
        league: 'Premier League',
        leagueSlug: 'premier-league',
        matchDate: '02.03',
        matchTime: '15:00',
        predictionType: 'over-2.5',
        predictionLabel: 'Over 2.5 Goals',
        odds: 1.55,
        w1: 1.30,
        draw: 5.50,
        w2: 10.00,
        description: 'Man City always score plenty at the Etihad and Crystal Palace away form has been poor. Expect goals galore as City dominate from the first whistle.',
        authorId: 'aleksandar-krstic',
        bookmakerSlug: 'megapari',
        slug: 'mancity-vs-crystal-palace-prediction-02-03-2026',
    },
    // La Liga
    {
        id: 'll1',
        homeTeam: teams.RealMadrid,
        awayTeam: teams.Barcelona,
        league: 'La Liga',
        leagueSlug: 'la-liga',
        matchDate: '02.03',
        matchTime: '21:00',
        predictionType: '1x2',
        predictionLabel: 'Real Madrid Win',
        odds: 2.25,
        w1: 2.25,
        draw: 3.40,
        w2: 2.78,
        description: 'El Clásico at the Bernabéu. Real Madrid have the home advantage and the squad depth. Expect a feisty encounter with the hosts edging this one.',
        authorId: 'nemanja-lalic',
        bookmakerSlug: '1xbet',
        slug: 'realmadrid-vs-barcelona-prediction-02-03-2026',
    },
    {
        id: 'll2',
        homeTeam: teams.Atletico,
        awayTeam: teams.Barcelona,
        league: 'La Liga',
        leagueSlug: 'la-liga',
        matchDate: '03.03',
        matchTime: '19:00',
        predictionType: 'under-2.5',
        predictionLabel: 'Under 2.5 Goals',
        odds: 2.10,
        w1: 2.50,
        draw: 3.20,
        w2: 2.60,
        description: 'Simeone\'s Atletico are notoriously hard to break down. Against a structured Barcelona, we expect a low‑scoring tactical battle.',
        authorId: 'nikola-lalic',
        bookmakerSlug: 'bet365',
        slug: 'atletico-vs-barcelona-prediction-03-03-2026',
    },
    // Serie A
    {
        id: 'sa1',
        homeTeam: teams.Inter,
        awayTeam: teams.Juventus,
        league: 'Serie A',
        leagueSlug: 'serie-a',
        matchDate: '02.03',
        matchTime: '20:45',
        predictionType: '1x2',
        predictionLabel: 'Inter Win',
        odds: 2.05,
        w1: 2.05,
        draw: 3.30,
        w2: 3.50,
        description: 'The Derby d\'Italia at the San Siro. Inter have been dominant at home and Juventus have an injury crisis in midfield. We back the Nerazzurri.',
        authorId: 'aleksandar-krstic',
        bookmakerSlug: 'megapari',
        slug: 'inter-vs-juventus-prediction-02-03-2026',
    },
    {
        id: 'sa2',
        homeTeam: teams.Milan,
        awayTeam: teams.Napoli,
        league: 'Serie A',
        leagueSlug: 'serie-a',
        matchDate: '03.03',
        matchTime: '18:00',
        predictionType: 'btts',
        predictionLabel: 'BTTS – Yes',
        odds: 1.80,
        w1: 2.30,
        draw: 3.20,
        w2: 2.90,
        description: 'AC Milan vs Napoli is always a spectacle. Both teams have prolific attacks and shaky defences – both teams to score looks like excellent value.',
        authorId: 'nemanja-dojcinovic',
        bookmakerSlug: 'william-hill',
        slug: 'milan-vs-napoli-prediction-03-03-2026',
    },
    // Ligue 1
    {
        id: 'ligue1-1',
        homeTeam: teams.PSG,
        awayTeam: teams.Lyon,
        league: 'Ligue 1',
        leagueSlug: 'ligue-1',
        matchDate: '02.03',
        matchTime: '21:05',
        predictionType: '1x2',
        predictionLabel: 'PSG Win',
        odds: 1.45,
        w1: 1.45,
        draw: 4.50,
        w2: 7.00,
        description: 'PSG are overwhelming favourites at home against Lyon. With their firepower upfront this should be a comfortable victory for the Paris side.',
        authorId: 'ryan-allan',
        bookmakerSlug: 'unibet',
        slug: 'psg-vs-lyon-prediction-02-03-2026',
    },
    {
        id: 'ligue1-2',
        homeTeam: teams.Monaco,
        awayTeam: teams.Lyon,
        league: 'Ligue 1',
        leagueSlug: 'ligue-1',
        matchDate: '03.03',
        matchTime: '19:00',
        predictionType: 'over-2.5',
        predictionLabel: 'Over 2.5 Goals',
        odds: 1.90,
        w1: 2.10,
        draw: 3.40,
        w2: 3.50,
        description: 'Monaco and Lyon clashes tend to be open affairs. Both have attackers in form and we expect a high‑scoring encounter at the Stade Louis II.',
        authorId: 'kate-richardson',
        bookmakerSlug: 'betsson',
        slug: 'monaco-vs-lyon-prediction-03-03-2026',
    },
    // Bundesliga
    {
        id: 'bund1',
        homeTeam: teams.Bayern,
        awayTeam: teams.Leipzig,
        league: 'Bundesliga',
        leagueSlug: 'bundesliga',
        matchDate: '02.03',
        matchTime: '15:30',
        predictionType: '1x2',
        predictionLabel: 'Bayern Win',
        odds: 1.60,
        w1: 1.60,
        draw: 4.20,
        w2: 5.50,
        description: 'Bayern Munich at home are almost unstoppable. RB Leipzig are impressive but the Allianz Arena fortress should see the Bavarians through.',
        authorId: 'nemanja-lalic',
        bookmakerSlug: 'bet365',
        slug: 'bayern-vs-leipzig-prediction-02-03-2026',
    },
    {
        id: 'bund2',
        homeTeam: teams.Dortmund,
        awayTeam: teams.Leipzig,
        league: 'Bundesliga',
        leagueSlug: 'bundesliga',
        matchDate: '03.03',
        matchTime: '17:30',
        predictionType: 'btts',
        predictionLabel: 'BTTS - Yes',
        odds: 1.75,
        w1: 2.20,
        draw: 3.50,
        w2: 3.10,
        description: 'Dortmund vs Leipzig is always an entertaining clash. Two attacking teams with high press tactics means goals from both ends seem guaranteed.',
        authorId: 'aleksandar-krstic',
        bookmakerSlug: 'megapari',
        slug: 'dortmund-vs-leipzig-prediction-03-03-2026',
    },
    // Champions League
    {
        id: 'cl1',
        homeTeam: teams.RealMadrid,
        awayTeam: teams.ManCity,
        league: 'Champions League',
        leagueSlug: 'champions-league',
        matchDate: '10.03',
        matchTime: '21:00',
        predictionType: '1x2',
        predictionLabel: 'Real Madrid Win',
        odds: 2.10,
        w1: 2.10,
        draw: 3.50,
        w2: 2.80,
        description: 'A heavyweight clash in Europe. The Bernabeu factor cannot be underestimated in the Champions League.',
        authorId: 'kate-richardson',
        bookmakerSlug: 'bet365',
        slug: 'realmadrid-vs-mancity-cl-2026',
    },
    // Europa League
    {
        id: 'el1',
        homeTeam: teams.Roma,
        awayTeam: teams.Liverpool,
        league: 'Europa League',
        leagueSlug: 'europa-league',
        matchDate: '12.03',
        matchTime: '21:00',
        predictionType: 'btts',
        predictionLabel: 'BTTS - Yes',
        odds: 1.65,
        w1: 3.20,
        draw: 3.40,
        w2: 1.90,
        description: 'An exciting Europa League tie. Both teams have incredible attacking talents but can be vulnerable at the back.',
        authorId: 'ryan-allan',
        bookmakerSlug: '1xbet',
        slug: 'roma-vs-liverpool-el-2026',
    },
];

export const getPredictionsByLeague = (leagueSlug: string) =>
    predictions.filter(p => p.leagueSlug === leagueSlug);

export const getPredictionBySlug = (slug: string) =>
    predictions.find(p => p.slug === slug);

export const leagues = [
    { name: 'Premier League', slug: 'premier-league', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { name: 'La Liga', slug: 'la-liga', country: 'Spain', flag: '🇪🇸' },
    { name: 'Serie A', slug: 'serie-a', country: 'Italy', flag: '🇮🇹' },
    { name: 'Ligue 1', slug: 'ligue-1', country: 'France', flag: '🇫🇷' },
    { name: 'Bundesliga', slug: 'bundesliga', country: 'Germany', flag: '🇩🇪' },
    { name: 'Champions League', slug: 'champions-league', country: 'Europe', flag: '🏆' },
    { name: 'Europa League', slug: 'europa-league', country: 'Europe', flag: '⭐' },
];
