import express from 'express';
import mongoose from 'mongoose';
import { registerValidation, loginValidation } from './validation.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as ProductController from './controllers/ProductController.js';
import * as StorageController from './controllers/StorageController.js';
import * as InventoryController from './controllers/InventoryController.js'
import cors from 'cors';
import multer from 'multer';

mongoose.set('strictQuery', false);
mongoose
    // .connect(process.env.MONGODB_URI)
    .connect('mongodb+srv://admin:wwwwww@stockmate.lifa3av.mongodb.net/Stockmate?retryWrites=true&w=majority')
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
// auth routes
app.use('/images', express.static('images'));
app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);
app.post(
    '/auth/avatar',
    checkAuth,
    upload.single('image'),
    UserController.uploadAvatar
);
// product routes
app.post('/products', checkAuth, ProductController.addProduct);
app.get('/products', checkAuth, ProductController.getAll);
//storage routes
app.post('/storages', checkAuth, StorageController.addStorage);
app.get('/storages', checkAuth, StorageController.getAll);
app.delete('/storages', checkAuth, StorageController.removeStorage);
//inventory routes
app.post('/inventory', checkAuth, InventoryController.addInventory);
app.get('/inventory', checkAuth, InventoryController.getAll);

app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        ``;
        return console.log(err);
    }
    console.log('Server started');
});
