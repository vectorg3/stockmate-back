import OrderModel from '../models/Order.js';

export const addOrder = async (req, res) => {
    try {
        const totalPrice = req.body.positions.forEach(item => {
            totalPrice += item.product.price * item.count
        });

        const doc = new OrderModel({
            storageName: req.body.storageName,
            storageId: req.body.storageId,
            positions: req.body.positions,
            orderPrice: totalPrice,
            status: req.body.status,
            createdBy: req.userId,
        });

        const newOrder = await doc.save();
        res.json({  
            _id: newOrder._id,
            storageName: newOrder.storageName,
            storageId: newOrder.storageId,
            positions: newOrder.positions,
            orderPrice: newOrder.orderPrice,
            status: newOrder.status,
            createdBy: newOrder.createdBy,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Не удалось создать заказ',
        });
    }
};
export const getAll = async (req, res) => {
    try {
        const Orders = await OrderModel.find({ createdBy: req.userId });
        res.json(Orders);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Не удалось получить заказы',
        });
    }
};
