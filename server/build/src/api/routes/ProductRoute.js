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
const express_1 = __importDefault(require("express"));
const ProductService_1 = __importDefault(require("../../service/ProductService"));
const router = express_1.default.Router();
//상품 router
router.route('')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = convertProduct(req.body);
    //필수 파라미터 부재시
    if (!product.name || !product.purchase_price || !product.sale_price) {
        res.status(400).send();
        return;
    }
    try {
        //상품 서비스 호출
        yield ProductService_1.default.addProduct(product);
        res.status(201).send();
    }
    catch (error) {
        //내부서버오류
        res.status(500).send();
        return;
    }
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
}))
    .patch((req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
//body데이터 product type생성
const convertProduct = (body) => {
    const name = body.name;
    const category = body.category;
    const purchase_price = body.purchase_price;
    const sale_price = body.sale_price;
    const stock = body.stock;
    const size = body.size;
    const product = {
        name: name,
        category: category,
        purchase_price: purchase_price,
        sale_price: sale_price,
        stock: stock,
        size: size
    };
    return product;
};
exports.default = router;
