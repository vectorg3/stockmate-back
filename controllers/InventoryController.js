import InventoryModel from '../models/Inventory.js';

export const addInventory = async (req, res) => {
    try {
        const doc = new InventoryModel({
            product: req.body.productId,
            stock: req.body.stock,
            storage: req.body.storageId,
            createdBy: req.userId,
        });

        const newInventory = await doc.save();
        res.json({
            _id: newInventory._id,
            product: newInventory.product,
            stock: newInventory.stock,
            storage: newInventory.storage,
            createdBy: newInventory.createdBy,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Не удалось добавить товар в инвентарь',
        });
    }
};
export const getAll = async (req, res) => {
    try {
        const Inventory = await InventoryModel.find();

        res.json(Inventory);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить инвентарь',
        });
    }
};