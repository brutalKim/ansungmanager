import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import dotenv from 'dotenv';
import { Manager } from '../type/globals';

dotenv.config();

const SECRETKEY:string = process.env.JWT_SECRETKEY || 'defaultKey';
const ACCESS_EXPIRE:string = process.env.JWT_ACCESS_EXPIRE || '1d';
const REFRESH_EXPIRE:string = process.env.JWT_REFRESH_EXPIRE || '1d';

export const IssueAccessToken=(manager:Manager):string=>{
    return jwt.sign({id:manager.id , name:manager.name}, SECRETKEY , {expiresIn: ACCESS_EXPIRE});
}

export const IssueRefreshToken = (manager:Manager):string=>{
    return jwt.sign({id:manager.id}, SECRETKEY , {expiresIn: REFRESH_EXPIRE});
}

export const verifyAccessToken=(token:string):Manager=>{
    try{
        return jwt.verify(token, SECRETKEY) as Manager;
    }catch(err){
        console.error(err);
        throw err;
    }
}

export const verifyRefreshToken = (token:string)=>{
    try{
        return jwt.verify(token, SECRETKEY);
    }catch(err){
        console.error(err);
        throw err;
    }
}