import express from 'express';
import categoryService from '../../service/CategoryService';
import { Category } from '../../type/globals';
import { ErrName } from '../../interface/CategoryInterface';

const router = express.Router();

//카테고리 라우터

router.route('')
.get(async (req,res)=>{
    try {
        const categorys:Category[] = await categoryService.getCategroy();
        res.status(200).send(categorys);
    } catch (error) {
        res.status(500).send();
    }
})
.post(async (req,res)=>{
    const name = req.body.name;
    const description = req.body.description;
    try {
        await categoryService.addCategory(name,description);
        res.status(201).send();
    } catch (error) {
        res.status(500).send();
    }
})
.delete(async (req,res)=>{
    const no = req.body.no;
    const name = req.body.name;
    const catgory:Category = {
        no:no,
        name: name
    }
    try {
        await categoryService.deleteCategory(catgory);
        res.status(200).send();
    } catch (error:any) {
        console.error(error);
        if(error.name === ErrName.CategoryHasProductsError){
            res.status(409).send({"msg":"카테고리를 사용중인 상품이 있어 삭제가 불가능 합니다."});
            return;
        }
        res.status(500).send();
        return;
    }
})
export default router;