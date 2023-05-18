import InventoryModel from '../models/Inventory.js';
import ProductModel from '../models/Product.js';
import StorageModel from '../models/Storage.js';

export const getAllByFilter = async (req, res) => {
    try {
        var reg = new RegExp(`^${req.params.filter}`, 'gmi');
        switch (req.params.table) {
            case 'storages':
                const storages = await StorageModel.find({
                    createdBy: req.userId,
                    name: reg,
                }).exec();
                res.json(storages);
                break;
            case 'products':
                const products = await ProductModel.find({
                    createdBy: req.userId,
                    name: reg,
                }).exec();
                res.json(products);
                break;
            case 'inventory':
                const inventory = await InventoryModel.find({
                    createdBy: req.userId,
                    storageName: reg,
                }).exec();
                res.json(inventory);
                break;
            default:
                break;
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Не удалось получить склады',
        });
    }
};
