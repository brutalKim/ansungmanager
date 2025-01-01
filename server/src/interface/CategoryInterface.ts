import { Category } from "../type/globals";
export enum ErrName{
    INTERNAL_ERROR = "INTERNAL_ERROR",
    CategoryHasProductsError="CategoryHasProductsError"
}
export interface CategoryServiceInterface{
    getCategroy():Promise<Category[]>;
    addCategory(name:string, description?:string):Promise<void>;
    deleteCategory(category:Category):Promise<void>;
}