
import customerRepository from "../db/Repository/Customer/CustomerRepository";
import { CustomerServiceInterface } from "../interface/CustomerInterface";
import { Customer } from "../type/globals";

class CustomerService implements CustomerServiceInterface{
    async getCustomer(): Promise<Customer[]> {
        try {
            const customers:Customer[] = await customerRepository.getCustomer();
            return customers;
        } catch (error) {
            throw error;
        }
    }
    async addCustomer(customer: Customer): Promise<void> {
        try {
            await customerRepository.addCustomer(customer);
        } catch (error) {
            throw error;
        }
    }
    deleteCustomer(customer: Customer): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async updateCustomer(customer: Customer): Promise<void> {
        try{
            if(customer.no){
                const customers:Customer[] = await customerRepository.findByNo(customer.no);
                if(customers.length === 0){
                    throw new Error;
                }
    
                let target:Customer = customers[0];
                
                if(customer.name) target.name = customer.name;
                if(customer.address) target.address = customer.address;
                if(customer.tel) target.tel =customer.tel;
                
                await customerRepository.updateCustomer(target);
            }
        }catch(error){
            throw error;
        }
    }
    
}
const customerService:CustomerService = new CustomerService();
export default customerService;