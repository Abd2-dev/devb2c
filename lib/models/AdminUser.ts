import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdminUser extends Document {
    email: string;
    passwordHash: string;
    name: string;
    role: string;
}

const AdminUserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: 'Admin' },
    role: { type: String, default: 'admin' },
}, {
    timestamps: true,
});

export const AdminUser: Model<IAdminUser> = mongoose.models.AdminUser || mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);
