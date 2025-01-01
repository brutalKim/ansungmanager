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
class CustomerRepository {
    findByNo(no) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM customer WHERE no = ?";
            try {
                const [rows] = yield Connection_1.pool.execute(query, [no]);
                return rows;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getCustomer() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM customer";
            try {
                const [rows] = yield Connection_1.pool.execute(query);
                return rows;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    addCustomer(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = "INSERT INTO customer (name,address,tel) VALUES (?,?,?)";
            const params = [(_a = customer.name) !== null && _a !== void 0 ? _a : null, customer.address, customer.tel];
            try {
                yield Connection_1.pool.execute(query, params);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    updateCustomer(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "UPDATE customer name = ? , address = ? , tel =? WHERE no = ?";
            const params = [customer.name, customer.address, customer.tel, customer.no];
            try {
                yield Connection_1.pool.execute(query, params);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    deleteCustomer(customer) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
const customerRepository = new CustomerRepository();
exports.default = customerRepository;
