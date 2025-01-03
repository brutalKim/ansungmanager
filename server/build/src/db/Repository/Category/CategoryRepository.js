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
const Connection_1 = require("../../Connection");
class CategoryRepository {
    //카테고리 조회
    getCategroy() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM category";
            try {
                const [rows] = yield Connection_1.pool.query(query);
                return rows;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //카테고리 생성
    addCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "INSERT INTO category (name , description) VALUES (?,?)";
            const params = [category.name, category.description];
            try {
                yield Connection_1.pool.execute(query, params);
            }
            catch (error) {
                throw error;
            }
        });
    }
    //카테고리 삭제
    deleteCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "DELETE FROM category WHERE no = ?";
            try {
                yield Connection_1.pool.execute(query, [category.no]);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
const categoryRepository = new CategoryRepository();
exports.default = categoryRepository;
