import { Category } from "../../../type/globals";
import {pool} from "../../Connection";
class CategoryRepository{
    //카테고리 조회
    async getCategroy():Promise<Category[]>{
        const query:string = "SELECT * FROM category";
        try {
            const [rows] = await pool.query(query);
            return rows as Category[];
        } catch (error) {
            throw error;
        }
    }
    //카테고리 생성
    async addCategory(category:Category):Promise<void>{
        const query:string = "INSERT INTO category (name , description) VALUES (?,?)";
        const params=[category.name,category.description];
        try{
            await pool.execute(query,params);
        }catch(error){
            throw error;
        }
    }
    //카테고리 삭제
    async deleteCategory(category:Category):Promise<void>{
        const query:string = "DELETE FROM category WHERE no = ?";
        try {
            await pool.execute(query,[category.no]);
        } catch (error) {
            throw error;
        }
    }
}
const categoryRepository:CategoryRepository = new CategoryRepository();
export default categoryRepository;