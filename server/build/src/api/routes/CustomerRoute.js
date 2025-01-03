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
const CustomerService_1 = __importDefault(require("../../service/CustomerService"));
const router = express_1.default.Router();
//고객관리 라우터
router.route('')
    //고객 정보 조회
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield CustomerService_1.default.getCustomer();
        res.status(200).send(customers);
    }
    catch (error) {
        console.error(error);
        res.status(500).send();
    }
}))
    //고객정보 추가
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCustomer = convertBodyToCustomer(req.body);
        yield CustomerService_1.default.addCustomer(newCustomer);
        res.status(201).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).send();
    }
}))
    //고객정보 삭제
    .delete((req, res) => {
})
    //고객정보 수정
    .patch((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetCustomer = convertBodyToCustomer(req.body);
        yield CustomerService_1.default.updateCustomer(targetCustomer);
        res.status(200).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).send();
    }
}));
const convertBodyToCustomer = (body) => {
    const name = body.name;
    const address = body.address;
    const tel = body.tel;
    const newCustomer = {
        name: name,
        address: address,
        tel: tel
    };
    return newCustomer;
};
exports.default = router;
