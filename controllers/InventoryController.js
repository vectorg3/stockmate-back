import InventoryModel from '../models/Inventory.js';
import ProductModel from '../models/Product.js';
import StorageModel from '../models/Storage.js';

export const addInventory = async (req, res) => {
    try {
        const storage = await StorageModel.findById(req.body.storageId);
        const product = await ProductModel.findById(req.body.productId);
        if (!storage || !product) return res.status(404).json({msg: "Склад или продукт с указанным ID не найден!"});
        const doc = new InventoryModel({
            productId: req.body.productId,
            productName: product.name,
            productPrice: product.price,
            stock: req.body.stock,
            storageId: req.body.storageId,
            storageName: storage.name,
            totalPrice: req.body.stock * product.price,
            createdBy: req.userId,
        });

        const newInventory = await doc.save();
        res.json({
            _id: newInventory._id,
            productId: newInventory.productId,
            productName: newInventory.productName,
            productPrice: newInventory.productPrice,
            stock: newInventory.stock,
            storageId: newInventory.storageId,
            storageName: newInventory.storageName,
            totalPrice: newInventory.totalPrice,
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
        const Inventory = await InventoryModel.find({ createdBy: req.userId });
        res.json(Inventory);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Не удалось получить инвентарь',
        });
    }
};