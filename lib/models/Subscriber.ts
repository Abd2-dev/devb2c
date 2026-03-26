import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
    },
    subscribedAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['active', 'unsubscribed'],
        default: 'active',
    }
});

// Adding index on email for faster duplicates check
subscriberSchema.index({ email: 1 });

export const Subscriber = mongoose.models.Subscriber || mongoose.model('Subscriber', subscriberSchema);
