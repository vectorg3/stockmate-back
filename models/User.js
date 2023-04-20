import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        company: {
            type: String,
        },
        login: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        passwordHash: {
            type: String,
            required: true,
        },
        avatar: String,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('User', UserSchema);
