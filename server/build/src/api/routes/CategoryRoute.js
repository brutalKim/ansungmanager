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
const CategoryService_1 = __importDefault(require("../../service/CategoryService"));
const CategoryInterface_1 = require("../../interface/CategoryInterface");
const router = express_1.default.Router();
//카테고리 라우터
router.route('')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorys = yield CategoryService_1.default.getCategroy();
        res.status(200).send(categorys);
    }
    catch (error) {
        res.status(500).send();
    }
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const description = req.body.description;
    try {
        yield CategoryService_1.default.addCategory(name, description);
        res.status(201).send();
    }
    catch (error) {
        res.status(500).send();
    }
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const no = req.body.no;
    const name = req.body.name;
    const catgory = {
        no: no,
        name: name
    };
    try {
        yield CategoryService_1.default.deleteCategory(catgory);
        res.status(200).send();
    }
    catch (error) {
        console.error(error);
        if (error.name === CategoryInterface_1.ErrName.CategoryHasProductsError) {
            res.status(409).send({ "msg": "카테고리를 사용중인 상품이 있어 삭제가 불가능 합니다." });
            return;
        }
        res.status(500).send();
        return;
    }
}));
exports.default = router;
