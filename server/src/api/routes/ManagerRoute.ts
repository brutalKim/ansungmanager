import express from "express";
import managerService from "../../service/ManagerService";
import { Status } from "../../interface/ManagerInterface";

const router = express.Router();

//관리자 router
//회원가입
router.post('/signup',async (req,res)=>{
    const id:string = req.body.id;
    const pw:string = req.body.pw;
    const name:string = req.body.name;
    //비어있는 필드 확인
    if(!id || !pw || !name){
        res.status(400).send();
        return;
    }
    //managerService 호출
    const DTO = await managerService.signup(id,pw,name);
    //Status에 따른 분기
    switch (DTO.status) {
        case Status.SUCCESS:
            res.status(201).send();
            return;
        case Status.DUPLICATE:
            res.status(409).send();
            return;
        case Status.INTERNAL_ERROR:
            res.status(500).send();
            return;
    }
});
//로그인
router.post('/login',async (req,res)=>{
    const id:string = req.body.id;
    const pw:string = req.body.pw;
    //managerService 호출
    const DTO = await managerService.login(id,pw);
    //Status에 따른 분기
    switch (DTO.status) {
        case Status.UNAUTHORIZED:
            res.status(401).send();
            return;
        case Status.INTERNAL_ERROR:
            res.status(500).send();
            return;
        case Status.SUCCESS:
            res.cookie('refreshToken',DTO.refreshToken,{
                //javascript로 접근 불가 설정
                httpOnly:true,
                //유효기간
                maxAge:1000 * 60 * 60 * 24 * 7
            })
            res.status(200).send(DTO);
            return;
    }
});

export default router;