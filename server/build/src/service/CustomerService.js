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
const CustomerRepository_1 = __importDefault(require("../db/Repository/Customer/CustomerRepository"));
class CustomerService {
    getCustomer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customers = yield CustomerRepository_1.default.getCustomer();
                return customers;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addCustomer(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CustomerRepository_1.default.addCustomer(customer);
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteCustomer(customer) {
        throw new Error("Method not implemented.");
    }
    updateCustomer(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (customer.no) {
                    const customers = yield CustomerRepository_1.default.findByNo(customer.no);
                    if (customers.length === 0) {
                        throw new Error;
                    }
                    let target = customers[0];
                    if (customer.name)
                        target.name = customer.name;
                    if (customer.address)
                        target.address = customer.address;
                    if (customer.tel)
                        target.tel = customer.tel;
                    yield CustomerRepository_1.default.updateCustomer(target);
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
const customerService = new CustomerService();
exports.default = customerService;
