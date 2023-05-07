import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import UserModel from '../models/User.js';

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array()[0]);
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        if (req.body.email){
            let checkEmail =  await UserModel.findOne({ email: req.body.email});
            if (checkEmail) return res.status(400).json({msg: 'Указанная почта уже занята!'})
        }
        if (req.body.phone){
            let checkPhone =  await UserModel.findOne({ phone: req.body.phone});
            if (checkPhone) return res.status(400).json({msg: 'Указанный номер телефона занят!'})
        }
        let checkUser =  await UserModel.findOne({ login: req.body.login});
        
        if (checkUser) return res.status(400).json({msg: 'Указанный логин уже занят!'})
        const doc = new UserModel({
            login: req.body.login,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            company: req.body.company,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Не удалось зарегистрироваться',
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ login: req.body.login });

        if (!user) {
            return res.status(404).json({
                msg: 'Пользователь не найден',
            });
        }

        const isValidPass = await bcrypt.compare(
            req.body.password,
            user._doc.passwordHash
        );

        if (!isValidPass) {
            return res.status(404).json({
                msg: 'Неверный логин или пароль',
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Не удалось авторизоваться',
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                msg: 'Пользователь не найден',
            });
        }
        const { passwordHash, createdAt, updatedAt, __v, ...userData } =
            user._doc;

        res.json({
            ...userData,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Нет доступа',
        });
    }
};
export const uploadAvatar = async (req, res) => {
    try {
        let ext = req.file.originalname.split('.').pop()
        let ext_arr = ['jpeg', 'png', 'jpg', 'gif', 'svg']
        if(!ext_arr.includes(ext)) return res.status(400).json({ msg: 'Неверный тип файла' });
        const user = await UserModel.findById(req.userId);
        user.avatar = `/images/${req.file.originalname}`;
        await user.save();
        return res.json({ avatar: user.avatar });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Не удалось загрузить фото, попробуйте позже' });
    }
};
