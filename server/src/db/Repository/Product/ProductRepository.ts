import { Category, Manager, Product } from "../../../type/globals";
import { hashPW } from "../../../type/passwordUtils";
import {pool} from "../../Connection";
class ProductRepository{
    //카테고리 기준으로 상품 조회
    async findByCategory(category:Category):Promise<Product[]>{
        const query:string = "SELECT * FROM product WHERE category = ?";
        try {
            const [rows] = await pool.query(query,category.no);
            return rows as Product[];
        } catch (error) {
            throw error;
        }
    }
    //상품 추가
    async addProduct(product:Product):Promise<void>{
        const query:string = "INSERT INTO product (name , category , purchase_price , sale_price , stock , size) VALUES (?,?,?,?,?,?)";
        const params =[product.name , product.category ?? null, product.purchase_price , product.sale_price , product.stock ?? 0, product.size ?? null];
        try {
            await pool.execute(query,params);
        } catch (error) {
            throw error;
        }
    }
    //상품 조회
    async getProduct():Promise<Product[]>{
        const query:string = "SELECT * FROM product";
        try {
            const [rows] = await pool.execute(query);
            return rows as Product[];
        } catch (error) {
            throw error;
        }
    }
}
const productRepository:ProductRepository = new ProductRepository();
export default productRepository;