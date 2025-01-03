import express from "express";
import { Product } from "../../type/globals";
import productService from "../../service/ProductService";

const router = express.Router();

//상품 router
router.route('')
.get(async (req,res)=>{
    try {
        const products:Product[] = await productService.getProduct();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send();
    }
})
.post(async (req,res)=>{
    const product:Product = convertProduct(req.body);
    //필수 파라미터 부재시
    if(!product.name || !product.purchase_price || !product.sale_price){
        res.status(400).send();
        return;
    }
    try {
        //상품 서비스 호출
        await productService.addProduct(product);
        res.status(201).send();
    } catch (error) {
        //내부서버오류
        res.status(500).send();
        return;
    }
})
.delete(async (req,res)=>{
    
})
.patch(async (req,res)=>{
    const product:Product = convertProduct(req.body);
    //badrequestERr
    if(!product.no){res.status(400).send();return;}
    
    try {
        await productService.updateProduct(product);
        res.status(200).send();
    } catch (error) {
        res.status(500).send();
        return;
    }
})

//body데이터 product type생성
const convertProduct = (body:any) : Product=>{
    const no:number = body.no;
    const name:string = body.name;
    const category:number = body.category;
    const purchase_price:number = body.purchase_price;
    const sale_price:number = body.sale_price;
    const stock:number = body.stock;
    const size:string = body.size;

    const product:Product ={
        no:no,
        name: name,
        category:category,
        purchase_price: purchase_price,
        sale_price: sale_price,
        stock:stock,
        size:size
    }
    return product;
}
export default router;