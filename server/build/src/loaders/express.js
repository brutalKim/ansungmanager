"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const CustomerRoute_1 = __importDefault(require("../api/routes/CustomerRoute"));
const CategoryRoute_1 = __importDefault(require("../api/routes/CategoryRoute"));
const ManagerRoute_1 = __importDefault(require("../api/routes/ManagerRoute"));
const ProductRoute_1 = __importDefault(require("../api/routes/ProductRoute"));
dotenv_1.default.config();
const expressLoader = (app) => {
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.set("port", process.env.PORT || 4545);
    //라우터 호출
    app.use('/category', CategoryRoute_1.default);
    app.use('/customer', CustomerRoute_1.default);
    app.use('/manager', ManagerRoute_1.default);
    app.use('/product', ProductRoute_1.default);
    app.listen(app.get("port"), () => {
        console.log(app.get("port"), "번에서 대기중");
    });
};
exports.default = expressLoader;
