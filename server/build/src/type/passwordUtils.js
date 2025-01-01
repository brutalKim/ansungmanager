"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPW = hashPW;
exports.validPW = validPW;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//비밀번호 암호화
function hashPW(pw) {
    return __awaiter(this, void 0, void 0, function* () {
        //salt횟수
        const saltRounds = 10;
        return yield bcryptjs_1.default.hash(pw, saltRounds);
    });
}
//비밀번호 대조
function validPW(pw, hashedPW) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(pw, hashedPW);
    });
}
