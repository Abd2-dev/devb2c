import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBookmaker extends Document {
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
    featured: boolean;
}

const BookmakerSchema: Schema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    logo: { type: String, required: true },
    rating: { type: Number, required: true, index: true },
    bonus: { type: String, required: true },
    promoCode: { type: String, required: false },
    affiliateUrl: { type: String, required: true },
    reviewUrl: { type: String, required: true },
    countries: { type: [String], default: [] },
    paymentMethods: { type: [String], default: [] },
    featured: { type: Boolean, default: false, index: true }
}, {
    timestamps: true,
});

export const Bookmaker: Model<IBookmaker> = mongoose.models.Bookmaker || mongoose.model<IBookmaker>('Bookmaker', BookmakerSchema);
