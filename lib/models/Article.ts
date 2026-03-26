import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IArticle extends Document {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    categorySlug: string;
    authorId: string;
    publishedAt: Date;
    imageColor: string;
    tags: string[];
}

const ArticleSchema: Schema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true, index: true },
    categorySlug: { type: String, required: true },
    authorId: { type: String, required: true, index: true }, // reference to Author
    publishedAt: { type: Date, required: true, index: true },
    imageColor: { type: String, required: true },
    tags: { type: [String], default: [] }
}, {
    timestamps: true,
});

export const Article: Model<IArticle> = mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);
