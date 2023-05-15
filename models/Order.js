import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        storageName: {
            type: String,
            required: true,
        },
        storageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Storage',
            required: true,
        },
        positions: {
            type: [Object],
            required: true,
        },
        orderPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: 'created',
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Product', ProductSchema);
