import { body } from 'express-validator';

export const loginValidation = [
    body('login', 'Слишком короткий логин!').isLength({
        min: 4,
    }),
    body('password', 'Минимальная длина пароля 8 символов').isLength({
        min: 8,
    }),
];

export const registerValidation = [
    body('login', 'Минимальная длина логина - 4 символа').isLength({
        min: 4,
    }),
    body('password', 'Минимальная длина пароля 8 символов').isLength({
        min: 8,
    }),
    body('firstName', 'Имя должно содержать не менее 2 символов').isLength({
        min: 2,
    }),
    body('lastName', 'Фамилия должна содержать не менее 2 символов').isLength({
        min: 2,
    }),
    body('phone', 'Номер должен состоять из чисел!').isNumeric(),
];
