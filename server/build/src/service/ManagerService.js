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
const ManagerRepository_1 = __importDefault(require("../db/Repository/Manager/ManagerRepository"));
const ManagerInterface_1 = require("../interface/ManagerInterface");
const passwordUtils_1 = require("../type/passwordUtils");
const jwtManager_1 = require("../utils/jwtManager");
class ManagerService {
    //로그인
    login(id, pw) {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = { id: id, pw: pw };
            try {
                const res = yield ManagerRepository_1.default.getManager(manager);
                const user = res[0];
                if (res.length === 1 && user.pw) {
                    //비밀번호 검증
                    if (yield (0, passwordUtils_1.validPW)(pw, user.pw)) {
                        //엑세스 토큰 발급
                        const accessToken = (0, jwtManager_1.issueAccessToken)(user);
                        //리프레시 토큰 발급
                        const refreshToken = (0, jwtManager_1.issueRefreshToken)(user);
                        const resultDTO = {
                            status: ManagerInterface_1.Status.SUCCESS,
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                            id: user.id,
                            name: user.name
                        };
                        return resultDTO;
                    }
                    else {
                        return { status: ManagerInterface_1.Status.UNAUTHORIZED };
                    }
                }
                //아이디가 존재하지 않을시
                return { status: ManagerInterface_1.Status.UNAUTHORIZED };
            }
            catch (error) {
                return { status: ManagerInterface_1.Status.INTERNAL_ERROR };
            }
        });
    }
    //회원가입
    signup(id, pw, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = {
                id: id,
                pw: pw,
                name: name
            };
            try {
                const res = yield ManagerRepository_1.default.getManager(manager);
                //중복된 아이디 없을시
                if (res.length === 0) {
                    yield ManagerRepository_1.default.createManager(manager);
                    //중복된 아이디 존재
                }
                else {
                    return { status: ManagerInterface_1.Status.DUPLICATE };
                }
                return { status: ManagerInterface_1.Status.SUCCESS };
            }
            catch (error) {
                return { status: ManagerInterface_1.Status.INTERNAL_ERROR };
            }
        });
    }
}
const managerService = new ManagerService();
exports.default = managerService;
