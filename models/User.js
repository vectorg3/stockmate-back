import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        phone: {
            type: Number,
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
