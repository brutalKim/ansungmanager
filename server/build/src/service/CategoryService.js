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
const CategoryRepository_1 = __importDefault(require("../db/Repository/Category/CategoryRepository"));
const ProductRepository_1 = __importDefault(require("../db/Repository/Product/ProductRepository"));
const CategoryInterface_1 = require("../interface/CategoryInterface");
class CategoryService {
    //카테고리 조회
    getCategroy() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categorys = yield CategoryRepository_1.default.getCategroy();
                return categorys;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //카테고리 추가
    addCategory(name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = {
                name: name,
                description: description
            };
            try {
                //카테고리저장
                yield CategoryRepository_1.default.addCategory(category);
            }
            catch (error) {
                throw error;
            }
        });
    }
    //카테고리 삭제
    deleteCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const countInCategory = (yield ProductRepository_1.default.findByCategory(category)).length;
                if (countInCategory === 0) {
                    //카테고리 삭제
                    yield CategoryRepository_1.default.deleteCategory(category);
                }
                else {
                    //카테고리에 상품이 존재할시
                    const err = new Error().name = CategoryInterface_1.ErrName.CategoryHasProductsError;
                    throw err;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
const categoryService = new CategoryService();
exports.default = categoryService;
