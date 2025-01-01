import categoryRepository from "../db/Repository/Category/CategoryRepository";
import productRepository from "../db/Repository/Product/ProductRepository";
import { CategoryServiceInterface, ErrName } from "../interface/CategoryInterface";
import { ProductInterface } from "../interface/ProductInterface";
import { Category, Product } from "../type/globals";

class ProductService implements ProductInterface{
    async getProduct(): Promise<Product[]> {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }
    async deleteProduct(product:Product): Promise<void> {
        throw new Error("Method not implemented.");
    }

}
const productService:ProductService = new ProductService();
export default productService;