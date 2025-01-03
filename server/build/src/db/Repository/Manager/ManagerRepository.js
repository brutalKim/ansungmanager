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
Object.defineProperty(exports, "__esModule", { value: true });
const passwordUtils_1 = require("../../../type/passwordUtils");
const Connection_1 = require("../../Connection");
class ManagerRepository {
    //관리자 정보 조회
    getManager(manager) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT * FROM manager WHERE id =?";
                const [rows] = yield Connection_1.pool.query(query, [manager.id]);
                return rows;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //관리자 생성
    createManager(manager) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "INSERT INTO manager (id,pw,name) VALUES(?,?,?)";
                if (manager.pw) {
                    const hashedPW = yield (0, passwordUtils_1.hashPW)(manager.pw);
                    yield Connection_1.pool.execute(query, [manager.id, hashedPW, manager.name]);
                }
            }
            catch (error) {
            }
        });
    }
    //관리자삭제
    deleteManager(manager) {
    }
}
const managerRepository = new ManagerRepository();
exports.default = managerRepository;
