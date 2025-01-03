import categoryRepository from "../db/Repository/Category/CategoryRepository";
import productRepository from "../db/Repository/Product/ProductRepository";
import { CategoryServiceInterface, ErrName } from "../interface/CategoryInterface";
import { ProductInterface } from "../interface/ProductInterface";
import { Category, Product } from "../type/globals";

class ProductService implements ProductInterface{
    async getProduct(): Promise<Product[]> {
        try {
            const products:Product[] = await productRepository.getProduct();
            return products;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async addProduct(product:Product): Promise<void> {
        try {
            await productRepository.addProduct(product);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async updateProduct(product:Product): Promise<void> {
        try {
            if(product.no){
                let target: Product = (await productRepository.findByNo(product.no))[0];
                // 입력된 product 객체의 값이 존재하는 필드만 target 객체에 업데이트
                if (product.name) target.name = product.name;
                if (product.category) target.category = product.category;
                if (product.purchase_price) target.purchase_price = product.purchase_price;
                if (product.sale_price) target.sale_price = product.sale_price;
                if (product.stock) target.stock = product.stock;
                if (product.size) target.size = product.size;

                await productRepository.updateProduct(target);
            }
        } catch (error) {
            console.error(error);
        }
    }
    async deleteProduct(no:number): Promise<void> {
        
    }

}
const productService:ProductService = new ProductService();
export default productService;