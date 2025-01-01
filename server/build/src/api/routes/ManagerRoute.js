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
const ManagerService_1 = __importDefault(require("../../service/ManagerService"));
const ManagerInterface_1 = require("../../interface/ManagerInterface");
const router = express_1.default.Router();
//관리자 router
//회원가입
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const pw = req.body.pw;
    const name = req.body.name;
    //비어있는 필드 확인
    if (!id || !pw || !name) {
        res.status(400).send();
        return;
    }
    //managerService 호출
    const DTO = yield ManagerService_1.default.signup(id, pw, name);
    //Status에 따른 분기
    switch (DTO.status) {
        case ManagerInterface_1.Status.SUCCESS:
            res.status(201).send();
            return;
        case ManagerInterface_1.Status.DUPLICATE:
            res.status(409).send();
            return;
        case ManagerInterface_1.Status.INTERNAL_ERROR:
            res.status(500).send();
            return;
    }
}));
//로그인
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const pw = req.body.pw;
    //managerService 호출
    const DTO = yield ManagerService_1.default.login(id, pw);
    //Status에 따른 분기
    switch (DTO.status) {
        case ManagerInterface_1.Status.UNAUTHORIZED:
            res.status(401).send();
            return;
        case ManagerInterface_1.Status.INTERNAL_ERROR:
            res.status(500).send();
            return;
        case ManagerInterface_1.Status.SUCCESS:
            res.status(200).send(DTO);
            return;
    }
}));
exports.default = router;
