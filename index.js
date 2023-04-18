import express from 'express';
import mongoose from 'mongoose';
import { registerValidation, loginValidation } from './validation.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import cors from 'cors';
import multer from 'multer';

mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Database Connected');
    })
    .catch((err) => {
        console.log('Database Error', err);
    });

const app = express();
const storage = multer.diskStorage({
    destination(_, __, cb) {
        cb(null, 'images');
    },
    filename(_, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'));
app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, upload.single('image'), UserController.getMe);

app.post(
    '/auth/avatar',
    checkAuth,
    upload.single('image'),
    UserController.uploadAvatar
);
app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        ``;
        return console.log(err);
    }
    console.log('Server started');
});
