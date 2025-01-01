import { Customer } from "../type/globals";

export interface CustomerServiceInterface{
    getCustomer():Promise<Customer[]>;
    addCustomer(customer:Customer):Promise<void>;
    deleteCustomer(customer:Customer):Promise<void>;
    updateCustomer(customer:Customer):Promise<void>;
}