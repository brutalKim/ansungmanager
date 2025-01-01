import { Request , Response , NextFunction } from "express";
import { refreshAccessToken, verifyAccessToken } from "../../utils/jwtManager";


export const AuthMiddleware = (req: Request, res: Response, next: NextFunction):void=>{
    const accessToken : string|undefined = req.header('Authorization')?.split(' ')[1];
    //토큰이 없을 시
    if(!accessToken){
        res.status(401).json({msg: 'no token'});
        return;
    }
    //토큰 유효성 검사 절차
    try {
        //유저정보 저장후 NextFunction 호출
        req.manager = verifyAccessToken(accessToken);
        
        next();
    } catch (error:any) {
        //토큰 문제 핸들러
        switch (error.name) {
            case 'TokenExpiredError':
                //리프레시 토큰 확인 및 엑세스 토큰 재발급
                const refreshToken : string = req.cookies.refreshToken.split(' ')[1]
                try {
                    const newAccessToken:string = refreshAccessToken(refreshToken);
                    //새로운 엑세스 토큰 발급
                    res.status(401).json({"accessToken":newAccessToken});
                } catch (error:any) {
                    //refresh 토큰에 대한 에러 핸들러 리프레시 토큰에 문제 모든 애러에 대해 재로그인 유도
                    res.status(401).json({msg:'malformed token'}); 
                }
                break;


                //엑세스 토큰의 위조 손상 에러 핸들러
            case 'JsonWebTokenError':
                //위조 혹은 손상 엑세스 토큰 재로그인 유도
                res.status(401).json({msg:'malformed token'}); 
                break;
            case 'SyntaxError':
                //위조 혹은 손상 엑세스 토큰 재로그인 유도
                res.status(401).json({msg:'malformed token'});
                break;
        }
        return;
    }
}
