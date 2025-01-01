import categoryRepository from "../db/Repository/Category/CategoryRepository";
import productRepository from "../db/Repository/Product/ProductRepository";
import { CategoryServiceInterface, ErrName } from "../interface/CategoryInterface";
import { Category } from "../type/globals";

class CategoryService implements CategoryServiceInterface{
    //카테고리 조회
    async getCategroy(): Promise<Category[]> {
        try {
            const categorys:Category[] = await categoryRepository.getCategroy();
            return categorys;
        } catch (error) {
            throw error;
        }
    }
    
    //카테고리 추가
    async addCategory(name:string , description:string): Promise<void> {
        const category:Category ={
            name: name,
            description:description
        }
        try{
            //카테고리저장
            await categoryRepository.addCategory(category);
        }catch(error){
            throw error;
        }
    }

    //카테고리 삭제
    async deleteCategory(category: Category): Promise<void> {
        try{
            const countInCategory:number = (await productRepository.findByCategory(category)).length;
            if(countInCategory === 0){
                //카테고리 삭제
                await categoryRepository.deleteCategory(category);
            }else{
                //카테고리에 상품이 존재할시
                const err = new Error().name = ErrName.CategoryHasProductsError;
                throw err;
            }
        }catch(error){
            throw error;
        }
    }
}
const categoryService:CategoryService = new CategoryService();
export default categoryService;