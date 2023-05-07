import StorageModel from '../models/Storage.js';

export const addStorage = async (req, res) => {
    try {
        const doc = new StorageModel({
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            schedule: req.body.schedule,
            isActive: req.body.isActive,
            createdBy: req.userId,
        });

        const newStorage = await doc.save();
        res.json({  
            _id: newStorage._id,
            name: newStorage.name,
            address: newStorage.address,
            phone: newStorage.phone,
            email: newStorage.email,
            schedule: newStorage.schedule,
            isActive: newStorage.isActive,
            createdBy: newStorage.createdBy,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Не удалось добавить склад',
        });
    }
};
export const removeStorage = async(req, res) => {
    try {
        const candidate = await StorageModel.findById(req.params.id);
        if(!candidate) {
            return res.status(404).json({msg: "Такого склада нет!"})
        }
        await StorageModel.findByIdAndRemove(req.params.id);
        res.json({
            msg: "Склад успешно удалён"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Не удалось удалить склад',
        });
    }
}
export const getAll = async (req, res) => {
    try {
        const storages = await StorageModel.find();

        res.json(storages);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Не удалось получить склады',
        });
    }
};
