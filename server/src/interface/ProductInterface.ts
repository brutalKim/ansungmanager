import { Category, Product } from "../type/globals";
export enum ErrName{

}
export interface ProductInterface{
    getProduct():Promise<Product[]>;
    addProduct(product:Product):Promise<void>;
    updateProduct(product:Product):Promise<void>;
    deleteProduct(product:Product):Promise<void>;
}