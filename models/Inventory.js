import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        productName: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        storageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Storage',
            required: true,
        },
        storageName: {
            type: String,
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
