import { Request , Response , NextFunction } from "express";
import { verifyAccessToken } from "../../utils/jwtManager";


export const AuthMiddleware = (req: Request, res: Response, next: NextFunction):void=>{
    const accessToken : string|undefined = req.header('Authorization')?.split(' ')[1];
    
    if(!accessToken){
        res.status(401).json({msg: 'no token'});
        return;
    }

    //토큰 유효성 검사 절차
    try {
        req.manager = verifyAccessToken(accessToken);
    } catch (error:any) {
        //토큰 문제 핸들러
        console.log(error);
        return;
    }
    next();
}
