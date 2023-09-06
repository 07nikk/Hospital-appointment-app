import jwt from 'jsonwebtoken';
import fs from 'fs';
import {createError} from '../utils/error.js';

const secret = fs.readFileSync('.//privateKey.key','utf8');

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token) return next(createError(401, 'you are not authenticated!'));

    jwt.verify(token,secret,(err,decoded)=>{
        if(err){
            throw createError(403, "invalid token!");
        }
        req.user = decoded;
        // console.log(req.user);
        next();
    });

}

export const verifyAdmin = (req,res,next)=>{
    if(req.user.isAdmin){
        next();
    }
    else next(createError(403, 'you are not authorised!'));
}


export const verifyUser = (req,res,next)=>{
    if(req.user.id === req.params.id || req.user.isAdmin)
    {
        next();
    }
    else next(createError(403, "you are not authorised"));

}
