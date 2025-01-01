"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jwtManager_1 = require("../../utils/jwtManager");
const AuthMiddleware = (req, res, next) => {
    var _a;
    const accessToken = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!accessToken) {
        res.status(401).json({ msg: 'no token' });
        return;
    }
    //토큰 유효성 검사 절차
    try {
        req.manager = (0, jwtManager_1.verifyAccessToken)(accessToken);
    }
    catch (error) {
        //토큰 문제 핸들러
        console.log(error);
        return;
    }
    next();
};
exports.AuthMiddleware = AuthMiddleware;
