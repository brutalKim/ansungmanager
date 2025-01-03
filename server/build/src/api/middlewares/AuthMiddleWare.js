"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jwtManager_1 = require("../../utils/jwtManager");
const AuthMiddleware = (req, res, next) => {
    var _a;
    const accessToken = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    //토큰이 없을 시
    if (!accessToken) {
        res.status(401).json({ msg: 'no token' });
        return;
    }
    //토큰 유효성 검사 절차
    try {
        //유저정보 저장후 NextFunction 호출
        req.manager = (0, jwtManager_1.verifyAccessToken)(accessToken);
        next();
    }
    catch (error) {
        //토큰 문제 핸들러
        switch (error.name) {
            case 'TokenExpiredError':
                //리프레시 토큰 확인 및 엑세스 토큰 재발급
                const refreshToken = req.cookies.refreshToken.split(' ')[1];
                try {
                    const newAccessToken = (0, jwtManager_1.refreshAccessToken)(refreshToken);
                    //새로운 엑세스 토큰 발급
                    res.status(401).json({ "accessToken": newAccessToken });
                }
                catch (error) {
                    //refresh 토큰에 대한 에러 핸들러 리프레시 토큰에 문제 모든 애러에 대해 재로그인 유도
                    res.status(401).json({ msg: 'malformed token' });
                }
                break;
            //엑세스 토큰의 위조 손상 에러 핸들러
            case 'JsonWebTokenError':
                //위조 혹은 손상 엑세스 토큰 재로그인 유도
                res.status(401).json({ msg: 'malformed token' });
                break;
            case 'SyntaxError':
                //위조 혹은 손상 엑세스 토큰 재로그인 유도
                res.status(401).json({ msg: 'malformed token' });
                break;
        }
        return;
    }
};
exports.AuthMiddleware = AuthMiddleware;
