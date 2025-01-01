import { Manager } from "../../../type/globals";
import { hashPW } from "../../../type/passwordUtils";
import {pool} from "../../Connection";
class ManagerRepository{
    async getManager(manager:Manager):Promise<Manager[]>{
        try {
            const query:string = "SELECT * FROM manager WHERE id =?";
            const [rows] = await pool.query(query , [manager.id]);
            return rows as Manager[];
        } catch (error) {
            throw error;
        }
    }
    async createManager(manager:Manager){
        try {
            const query:string ="INSERT INTO manager (id,pw,name) VALUES(?,?,?)";
            if(manager.pw){
                const hashedPW:string = await hashPW(manager.pw);
                await pool.execute(query,[manager.id , hashedPW , manager.name]);
            }
        } catch (error) {
            
        }
    }
    deleteManager(manager:Manager){

    }
}
const managerRepository:ManagerRepository = new ManagerRepository();
export default managerRepository;