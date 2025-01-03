import express from 'express';
import customerService from '../../service/CustomerService';
import { Customer } from '../../type/globals';

const router = express.Router();

//고객관리 라우터
router.route('')
//고객 정보 조회
.get(async (req,res)=>{
    try {
        const customers:Customer[] = await customerService.getCustomer();
        res.status(200).send(customers)
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
})
//고객정보 추가
.post(async (req,res)=>{
    try {
        const newCustomer:Customer = convertBodyToCustomer(req.body);
        await customerService.addCustomer(newCustomer);
        res.status(201).send();
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
})
//고객정보 삭제
.delete((req,res)=>{
    
})
//고객정보 수정
.patch(async (req,res)=>{
    try {
        const targetCustomer:Customer = convertBodyToCustomer(req.body);
        await customerService.updateCustomer(targetCustomer);
        res.status(200).send();
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
})

const convertBodyToCustomer = (body:any):Customer=>{
    const name:string = body.name;
    const address:string = body.address;
    const tel:string = body.tel;
    const newCustomer:Customer={
        name: name,
        address: address,
        tel: tel
    }
    return newCustomer;
}
export default router;