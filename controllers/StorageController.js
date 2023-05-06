import StorageModel from '../models/Storage.js';

export const addStorage = async (req, res) => {
    try {
        if(req.body.email) {
            const check = await StorageModel.findOne({ email: req.body.email });
            if (check) return res.status(400).json({msg: 'Указанная почта уже занята!'})
        }
        if(req.body.phone) {
            const check = await StorageModel.findOne({ phone: req.body.phone });
            if (check) return res.status(400).json({msg: 'Указанный номер телефона занят!'})
        }
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
