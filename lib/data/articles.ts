// lib/data/articles.ts
export interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    categorySlug: string;
    authorId: string;
    publishedAt: string;
    imageColor: string; // gradient placeholder
    tags: string[];
}

export const articles: Article[] = [
    {
        id: '1',
        slug: 'super-6-round-38-predictions-tips',
        title: 'Super 6 Round 38 Predictions and Tips',
        excerpt: 'Our expert tipsters give their Super 6 predictions for Round 38, aiming for that elusive jackpot.',
        content: `Sky Super 6 is back with another exciting round. This week's fixtures present some intriguing challenges for punters hoping to land a perfect six. Our experts have analysed each game carefully to give you the best possible chance of hitting that jackpot.

**Man City vs Arsenal** – City should edge this derby. Predict 2-1 to the hosts.

**Liverpool vs Chelsea** – Both teams in the goals. Predict 2-2 draw.

**Tottenham vs West Ham** – Spurs at home should win. Predict 1-0.

**Newcastle vs Man United** – Red Devils struggling. Predict 2-0 to Newcastle.

**Everton vs Bournemouth** – Tight on Merseyside. Predict 1-1 draw.

**Wolves vs Brighton** – Brighton have been excellent away. Predict 0-2 to Brighton.`,
        category: 'Football',
        categorySlug: 'football',
        authorId: 'ryan-allan',
        publishedAt: '2026-03-01',
        imageColor: 'linear-gradient(135deg, #1a3a5c, #0066cc)',
        tags: ['Super 6', 'Premier League', 'Free Tips'],
    },
    {
        id: '2',
        slug: 'rugby-six-nations-2026-predictions',
        title: 'Rugby Six Nations 2026 Predictions & Betting Odds',
        excerpt: 'Complete guide to Six Nations 2026 with expert predictions, odds comparison, and value bets.',
        content: `The Six Nations 2026 tournament is shaping up to be one of the most competitive in recent memory. Ireland enter as defending champions but face stiff competition from England, France, and Scotland who are all genuinely capable of lifting the trophy.

**Ireland** are favourites and rightfully so. Their structured game plan and experienced leadership makes them tough to beat.

**France** at home are incredibly dangerous and could be the value pick at odds of 3/1 for the championship.

**England** have improved dramatically under their new coaching staff and a top-two finish looks likely.

We recommend backing Ireland to win the Championship and France to win their home games as key bets.`,
        category: 'Rugby',
        categorySlug: 'rugby',
        authorId: 'ryan-allan',
        publishedAt: '2026-02-28',
        imageColor: 'linear-gradient(135deg, #1a5c3a, #28a745)',
        tags: ['Rugby', 'Six Nations', 'Free Tips'],
    },
    {
        id: '3',
        slug: 'tyson-fury-vs-arslanbek-makhmudov-odds',
        title: 'Tyson Fury vs Arslanbek Makhmudov Odds and Prediction',
        excerpt: 'Can Fury return to his best against the dangerous Makhmudov? Our boxing analyst breaks down the fight.',
        content: `Tyson Fury returns to the ring in what promises to be his toughest fight in years. Arslanbek Makhmudov is a serious power-puncher who has demolished every opponent placed before him.

**Tyson Fury** – The Gypsy King has never been knocked out and possesses exceptional defensive skills. His jab-and-move style should frustrate Makhmudov.

**Arslanbek Makhmudov** – The Canadian-based Kazakhstani puncher has a 100% KO rate and poses a genuine threat if he lands clean.

Our prediction: **Fury on points** (odds approximately 1.75). The risk is if Makhmudov lands his haymaker – then all bets are off.`,
        category: 'Boxing',
        categorySlug: 'boxing',
        authorId: 'ryan-allan',
        publishedAt: '2026-02-27',
        imageColor: 'linear-gradient(135deg, #5c1a1a, #cc3300)',
        tags: ['Boxing', 'Fury', 'Heavyweight'],
    },
    {
        id: '4',
        slug: 'holloway-vs-oliveira-ufc-326',
        title: 'Holloway vs Oliveira 2: UFC 326 Fight Prediction',
        excerpt: 'The rematch that fight fans have been waiting for. Who wins UFC 326\'s main event?',
        content: `Max Holloway and Charles Oliveira clash again at UFC 326 in what promises to be an absolute classic. Their first fight was a Fight of the Year candidate and the rematch should be no different.

**Max Holloway** – Blessed has been in the form of his life. His volume striking and chin of iron make him incredibly durable. The rematch advantage could be crucial.

**Charles Oliveira** – Do Bronx has evolved into a complete martial artist. His submission game combined with improving striking is a dangerous combination.

Our prediction: **Holloway by unanimous decision** at odds of 2.10. Oliveira's finishing instincts keep this interesting but Holloway's accuracy should tell over 5 rounds.`,
        category: 'MMA',
        categorySlug: 'mma',
        authorId: 'ryan-allan',
        publishedAt: '2026-02-26',
        imageColor: 'linear-gradient(135deg, #3a1a5c, #6600cc)',
        tags: ['UFC', 'MMA', 'Holloway'],
    },
    {
        id: '5',
        slug: 'next-real-madrid-manager-odds',
        title: "Next Real Madrid Manager Odds and Predictions",
        excerpt: "Who replaces Carlo Ancelotti at the Bernabéu? We analyse the leading candidates.",
        content: `The managerial situation at Real Madrid is heating up with speculation about Carlo Ancelotti's future. Los Blancos have already been identified as potential suitors for several world-class managers.

**Xabi Alonso** – The Leverkusen coach is the standout favourite. A club legend who plays attractive football and has European pedigree.

**Jürgen Klopp** – The former Liverpool boss is taking a break but could be convinced by Madrid. His track record speaks for itself.

**Roberto De Zerbi** – An outsider but his attacking football philosophy aligns with Real Madrid's values.

We see **Xabi Alonso at 2.50** as excellent value given his success at Leverkusen and natural connection to the club.`,
        category: 'Football',
        categorySlug: 'football',
        authorId: 'aleksandar-krstic',
        publishedAt: '2026-02-25',
        imageColor: 'linear-gradient(135deg, #5c4a00, #d4af37)',
        tags: ['Real Madrid', 'Football News', 'La Liga'],
    },
    {
        id: '6',
        slug: 'az-alkmaar-vs-noah-prediction',
        title: 'AZ Alkmaar vs Noah FC Prediction & Europa League Preview',
        excerpt: 'AZ host Noah FC in a crucial Europa League clash. Our expert breaks down the betting.',
        content: `AZ Alkmaar take on Noah FC in what should be a comfortable European tie for the Dutch side but Noah have proven to be a tricky opponent in continental competition.

**AZ Alkmaar** – The Eredivisie club are well organised and should have too much quality for their Armenian opponents. Home advantage is crucial.

**Noah FC** – Defied expectations to reach this stage and will look to disrupt AZ's rhythm through defensive compactness.

Our prediction: **AZ Win & Over 2.5 Goals** combined at odds of 2.00. The Dutch have the quality to win emphatically at the AFAS Stadion.`,
        category: 'Football',
        categorySlug: 'football',
        authorId: 'nikola-lalic',
        publishedAt: '2026-02-24',
        imageColor: 'linear-gradient(135deg, #003399, #cc0000)',
        tags: ['Europa League', 'AZ Alkmaar', 'European Football'],
    },
];

export const getArticleBySlug = (slug: string) => articles.find(a => a.slug === slug);
export const getArticlesByCategory = (categorySlug: string) =>
    articles.filter(a => a.categorySlug === categorySlug);
