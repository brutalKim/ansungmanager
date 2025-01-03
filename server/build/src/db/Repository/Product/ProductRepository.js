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
class ProductRepository {
    //카테고리 기준으로 상품 조회
    findByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM product WHERE category = ?";
            try {
                const [rows] = yield Connection_1.pool.query(query, [category.no]);
                return rows;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //번호로 상품 조회
    findByNo(no) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM product WHERE no = ?";
            try {
                const [rows] = yield Connection_1.pool.query(query, [no]);
                return rows;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //상품 추가
    addProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const query = "INSERT INTO product (name , category , purchase_price , sale_price , stock , size) VALUES (? , ? , ? , ? , ? , ?)";
            const params = [product.name, (_a = product.category) !== null && _a !== void 0 ? _a : null, product.purchase_price, product.sale_price, (_b = product.stock) !== null && _b !== void 0 ? _b : 0, (_c = product.size) !== null && _c !== void 0 ? _c : null];
            try {
                yield Connection_1.pool.execute(query, params);
            }
            catch (error) {
                throw error;
            }
        });
    }
    //상품 조회
    getProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM product";
            try {
                const [rows] = yield Connection_1.pool.execute(query);
                return rows;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //상품 수정
    updateProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const query = "UPDATE product SET name = ? , category = ? ,purchase_price = ? , sale_price = ? , stock = ? , size = ? WHERE no = ?";
            const params = [product.name, (_a = product.category) !== null && _a !== void 0 ? _a : null, product.purchase_price, product.sale_price, (_b = product.stock) !== null && _b !== void 0 ? _b : 0, (_c = product.size) !== null && _c !== void 0 ? _c : null, product.no];
            try {
                yield Connection_1.pool.execute(query, params);
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteProduct(no) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "";
        });
    }
}
const productRepository = new ProductRepository();
exports.default = productRepository;
