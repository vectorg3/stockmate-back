import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Минимальная длина пароля 5 символов').isLength({
        min: 5,
    }),
];

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Минимальная длина пароля 5 символов').isLength({
        min: 5,
    }),
    body('fullName', 'Имя должно содержать не менее 3 символов').isLength({
        min: 3,
    }),
];
