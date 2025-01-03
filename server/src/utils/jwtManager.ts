import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import dotenv from 'dotenv';
import { Manager } from '../type/globals';
import authManager from '../service/AuthService';

dotenv.config();

const SECRETKEY:string = process.env.JWT_SECRETKEY || 'defaultKey';
const ACCESS_EXPIRE:string = process.env.JWT_ACCESS_EXPIRE || '1d';
const REFRESH_EXPIRE:string = process.env.JWT_REFRESH_EXPIRE || '1d';

export const issueAccessToken=(manager:Manager):string=>{
    return "Bearer " + jwt.sign({id:manager.id , name:manager.name}, SECRETKEY , {expiresIn: ACCESS_EXPIRE});
}

export const issueRefreshToken = (manager:Manager):string=>{
    //리프레시 토큰 발급
    const refreshToken:string = jwt.sign({id:manager.id , name:manager.name}, SECRETKEY , {expiresIn: REFRESH_EXPIRE});
    //토큰 저장
    authManager.storeRefreshToken(manager , refreshToken);

    return "Bearer " + refreshToken;
}

//엑세스 토큰 유효성 검사
export const verifyAccessToken=(token:string):Manager=>{
    try{
        return jwt.verify(token, SECRETKEY) as Manager;
    }catch(err){
        throw err;
    }
}
//리프래시 토큰 유효성 검사
export const refreshAccessToken = (refreshToken:string):string=>{
    try{
        const payload:Manager = jwt.verify(refreshToken, SECRETKEY) as Manager;
        //리프레시 토큰의 id 와 검사할 id가 같을 경우 유효성 검사 통과
        const newAccessToken:string = authManager.refreshAccessToken(payload,refreshToken);
        return newAccessToken;
    }catch(err){
        //유효기간이나 malform 검사
        throw err;
    }
}