import bcrypt from 'bcrypt';
import Users from '../model/Users.js';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';

export const registerUser = async(req,res,next)=>{
    const {username, email} = req.body;
    try {
        //double check user
        const check = await Users.findOne({username: username});

        if(check)
        {
            throw(createError(409, "user already exists with same name! Try another username"));
        }

        const user = new Users({
            username: username,
            email:email,
            password : req.body.password
        });

        await user.save();

        res.status(201).json(user);


    } catch (error) {
        next(error);
    }
};

export const loginUser = async(req,res,next)=>{
    try {
        const {username} = req.body;
        
        const user = await Users.findOne({username});
        if(!user) return next(404, "user not found!");


        //password check
        const isPasswordCorrect = bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect)return next(400, "wrong password or username!");
        
        var privateKey = fs.readFileSync('.//privateKey.key','utf8');

        const token = jwt.sign(
            {id : user._id, isAdmin: user.isAdmin},
            privateKey,
            { algorithm: 'RS256' }
        );
        

        const {password, isAdmin, ...others} = user._doc;
        
        res.cookie("access_token",token, {
            httpOnly: true
        }).status(200).json({others});

    } catch (error) {
        next(error);
    }
}