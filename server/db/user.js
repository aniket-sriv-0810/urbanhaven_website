import mongoose from 'mongoose';
import {User} from '../model/user.model.js';

const deleteUser = async( req , res) => {
     await User.delete({});
    console.log("All users deleted !");
}

deleteUser();