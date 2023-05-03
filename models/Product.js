import mongoose, {ObjectId} from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
    }
);

export default mongoose.model('Product', ProductSchema);
