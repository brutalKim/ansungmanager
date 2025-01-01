"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.issueRefreshToken = exports.issueAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const AuthService_1 = __importDefault(require("../service/AuthService"));
dotenv_1.default.config();
const SECRETKEY = process.env.JWT_SECRETKEY || 'defaultKey';
const ACCESS_EXPIRE = process.env.JWT_ACCESS_EXPIRE || '1d';
const REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE || '1d';
const issueAccessToken = (manager) => {
    return "Bearer " + jsonwebtoken_1.default.sign({ id: manager.id, name: manager.name }, SECRETKEY, { expiresIn: ACCESS_EXPIRE });
};
exports.issueAccessToken = issueAccessToken;
const issueRefreshToken = (manager) => {
    //리프레시 토큰 발급
    const refreshToken = jsonwebtoken_1.default.sign({ id: manager.id, name: manager.name }, SECRETKEY, { expiresIn: REFRESH_EXPIRE });
    //토큰 저장
    AuthService_1.default.storeRefreshToken(manager, refreshToken);
    return "Bearer " + refreshToken;
};
exports.issueRefreshToken = issueRefreshToken;
//엑세스 토큰 유효성 검사
const verifyAccessToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, SECRETKEY);
    }
    catch (err) {
        console.error(err);
        throw err;
    }
};
exports.verifyAccessToken = verifyAccessToken;
//리프래시 토큰 유효성 검사
const verifyRefreshToken = (manager, refreshToken) => {
    try {
        const payload = jsonwebtoken_1.default.verify(refreshToken, SECRETKEY);
        //리프레시 토큰의 id 와 검사할 id가 같을 경우 유효성 검사 통과
        if (payload.id === manager.id)
            return true;
        //실패시 false 반환
        return false;
    }
    catch (err) {
        //유효기간이나 malform 검사
        return false;
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
