import StorageModel from '../models/Storage.js';

export const addStorage = async (req, res) => {
    try {
        const doc = new StorageModel({
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            schedule: req.body.schedule,
        });

        const newStorage = await doc.save();
        res.json({
            _id: newStorage._id,
            name: newStorage.name,
            address: newStorage.address,
            phone: newStorage.phone,
            email: newStorage.email,
            schedule: newStorage.schedule,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Не удалось добавить склад',
        });
    }
};
export const getAll = async (req, res) => {
    try {
        const storages = await StorageModel.find();

        res.json(storages);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить склады',
        });
    }
};