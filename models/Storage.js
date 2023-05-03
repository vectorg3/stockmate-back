import mongoose, {ObjectId} from 'mongoose';

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
            type: Number,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        schedule: {
            type: String,
            required: true
        }
    }
);

export default mongoose.model('Storage', StorageSchema);
