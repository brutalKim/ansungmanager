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
const ProductRepository_1 = __importDefault(require("../db/Repository/Product/ProductRepository"));
class ProductService {
    getProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield ProductRepository_1.default.getProduct();
                return products;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    addProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ProductRepository_1.default.addProduct(product);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    updateProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (product.no) {
                    let target = (yield ProductRepository_1.default.findByNo(product.no))[0];
                    // 입력된 product 객체의 값이 존재하는 필드만 target 객체에 업데이트
                    if (product.name)
                        target.name = product.name;
                    if (product.category)
                        target.category = product.category;
                    if (product.purchase_price)
                        target.purchase_price = product.purchase_price;
                    if (product.sale_price)
                        target.sale_price = product.sale_price;
                    if (product.stock)
                        target.stock = product.stock;
                    if (product.size)
                        target.size = product.size;
                    yield ProductRepository_1.default.updateProduct(target);
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    deleteProduct(no) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
const productService = new ProductService();
exports.default = productService;
