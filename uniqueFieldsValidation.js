import UserModel from '../models/User.js';

export default async(candidatLogin, candidatEmail) => {
    let checkUser =  await UserModel.findOne({ login: candidatLogin });

}