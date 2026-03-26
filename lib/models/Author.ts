import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAuthor extends Document {
    name: string;
    slug: string;
    username: string;
    title: string;
    bio: string;
    longBio: string;
    avatar: string;
    avatarColor: string;
    specialties: string[];
    tipsCount: number;
    articlesCount: number;
}

const AuthorSchema: Schema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    longBio: { type: String, required: true },
    avatar: { type: String, required: true },
    avatarColor: { type: String, required: true },
    specialties: { type: [String], default: [] },
    tipsCount: { type: Number, default: 0 },
    articlesCount: { type: Number, default: 0 },
}, {
    timestamps: true,
});

export const Author: Model<IAuthor> = mongoose.models.Author || mongoose.model<IAuthor>('Author', AuthorSchema);
