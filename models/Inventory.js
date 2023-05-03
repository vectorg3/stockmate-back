import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        storage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Storage',
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    }
);

export default mongoose.model('Inventory', InventorySchema);
