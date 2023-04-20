import { body } from 'express-validator';

export const loginValidation = [
    body('login', 'Слишком короткий логин!').isLength({
        min: 4,
    }),
    body('password', 'Минимальная длина пароля 5 символов').isLength({
        min: 5,
    }),
];

export const registerValidation = [
    body('login', 'Неверный формат почты').isLength({
        min: 4,
    }),
    body('password', 'Минимальная длина пароля 5 символов').isLength({
        min: 4,
    }),
    body('fullName', 'Имя должно содержать не менее 3 символов').isLength({
        min: 3,
    }),
];
