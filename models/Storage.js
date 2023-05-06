import mongoose from 'mongoose';

const StorageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            default: '',
        },
        email: {
            type: String,
            default: '',
        },
        schedule: {
            type: [Boolean],
            required: true
        },
        isActive: {
            type: Boolean,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    }
);

export default mongoose.model('Storage', StorageSchema);
