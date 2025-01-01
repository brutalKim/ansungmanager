import { Category, Manager, Product } from "../../../type/globals";
import { hashPW } from "../../../type/passwordUtils";
import {pool} from "../../Connection";
class ProductRepository{
    //카테고리 기준으로 상품 조회
    async findByCategory(category:Category):Promise<Product[]>{
        const query:string = "SELECT * FROM product WHERE category = ?";
        try {
            const [rows] = await pool.query(query,[category.no]);
            return rows as Product[];
        } catch (error) {
            throw error;
        }
    }
    //번호로 상품 조회
    async findByNo(no:number):Promise<Product[]>{
        const query:string = "SELECT * FROM product WHERE no = ?";
        try {
            const [rows] = await pool.query(query,[no]);
            return rows as Product[];
        } catch (error) {
            throw error;
        }
    }
    //상품 추가
    async addProduct(product:Product):Promise<void>{
        const query:string = "INSERT INTO product (name , category , purchase_price , sale_price , stock , size) VALUES (? , ? , ? , ? , ? , ?)";
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
    //상품 수정
    async updateProduct(product:Product):Promise<void>{
        const query:string = "UPDATE product SET name = ? , category = ? ,purchase_price = ? , sale_price = ? , stock = ? , size = ? WHERE no = ?";
        const params = [product.name , product.category ?? null, product.purchase_price , product.sale_price , product.stock ?? 0, product.size ?? null , product.no];
        try {
            await pool.execute(query,params);
        } catch (error) {
            throw error;
        }
    }
    async deleteProduct(no:number):Promise<void>{
        const query:string = ""
    }
}
const productRepository:ProductRepository = new ProductRepository();
export default productRepository;