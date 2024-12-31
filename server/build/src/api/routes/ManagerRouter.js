"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//관리자 router
//회원가입
router.post('/signup', (req, res) => {
});
//로그인
router.post('/login', (res, req) => {
});
exports.default = router;
