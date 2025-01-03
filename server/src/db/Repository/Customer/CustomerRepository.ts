import { Customer } from "../../../type/globals";
import {pool} from "../../Connection";
class CustomerRepository{
    async findByNo(no:number):Promise<Customer[]>{
        const query:string = "SELECT * FROM customer WHERE no = ?"
        try {
            const [rows] = await pool.execute(query , [no]);
            return rows as Customer[];
        } catch (error) {
            throw error;
        }
    }
    async getCustomer():Promise<Customer[]>{
        const query:string = "SELECT * FROM customer";
        try {
            const [rows] = await pool.execute(query);
            return rows as Customer[];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async addCustomer(customer:Customer):Promise<void>{
        const query:string = "INSERT INTO customer (name,address,tel) VALUES (?,?,?)";
        const params = [customer.name ?? null , customer.address , customer.tel];
        try{
            await pool.execute(query,params);
        }catch(error){
            console.error(error);
            throw error;
        }
    }
    async updateCustomer(customer:Customer):Promise<void>{
        const query:string = "UPDATE customer name = ? , address = ? , tel =? WHERE no = ?";
        const params = [customer.name , customer.address ,customer.tel , customer.no];
        try {
            await pool.execute(query,params);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async deleteCustomer(customer:Customer):Promise<void>{
        
    }
}
const customerRepository:CustomerRepository = new CustomerRepository();
export default customerRepository;