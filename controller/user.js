import Users from '../model/Users.js';
import {createError} from '../utils/error.js';

export const getUser = async(req,res,next)=>{
    const {id} = req.params;
    try {
        const user = await Users.findById(id);
        const {password, isAdmin, ...other} = user._doc;
        res.status(200).json({other});
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async(req,res,next)=>{
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async(req,res,next)=>{
    const{id} = req.params;
    try {
        const user = await Users.findByIdAndDelete(id);
        
        //check if user is there or already deleted
        if(!user) throw createError(404,"User not found!");

        res.status(202).json({
            status: "User deleted successfully",
            data : user
        });

    } catch (error) {
        next(error);
    }
}

export const updateUser = async(req,res,next)=>{
    const {id} = req.params;
    try {
        const updatedUser = await Users.findByIdAndUpdate(
            id,
            {$set: req.body},
            {new : true}
        );
        const {password, isAdmin, ...other} = updatedUser._doc;
        res.status(200).json({other});

    } catch (error) {
        next(error);
    }
}
