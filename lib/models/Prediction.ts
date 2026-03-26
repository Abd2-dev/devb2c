import mongoose, { Schema, Document, Model } from 'mongoose';

export type PredictionType = '1x2' | 'btts' | 'over-2.5' | 'under-2.5' | 'over-3.5' | 'correct-score' | 'draw' | 'double-chance' | 'accumulator';

export interface ITeam {
    name: string;
    shortName: string;
    color: string;
}

export interface IPrediction extends Document {
    homeTeam: ITeam;
    awayTeam: ITeam;
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

const TeamSchema: Schema = new Schema({
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    color: { type: String, required: true }
}, { _id: false });

const PredictionSchema: Schema = new Schema({
    homeTeam: { type: TeamSchema, required: true },
    awayTeam: { type: TeamSchema, required: true },
    league: { type: String, required: true },
    leagueSlug: { type: String, required: true, index: true },
    matchDate: { type: String, required: true, index: true },
    matchTime: { type: String, required: true },
    predictionType: {
        type: String,
        required: true,
        enum: ['1x2', 'btts', 'over-2.5', 'under-2.5', 'over-3.5', 'correct-score', 'draw', 'double-chance', 'accumulator']
    },
    predictionLabel: { type: String, required: true },
    odds: { type: Number, required: true },
    w1: { type: Number, required: true },
    draw: { type: Number, required: true },
    w2: { type: Number, required: true },
    description: { type: String, required: true },
    authorId: { type: String, required: true, index: true }, // reference to Author slug or id
    bookmakerSlug: { type: String, required: false },
    slug: { type: String, required: true, unique: true, index: true }
}, {
    timestamps: true,
});

export const Prediction: Model<IPrediction> = mongoose.models.Prediction || mongoose.model<IPrediction>('Prediction', PredictionSchema);
