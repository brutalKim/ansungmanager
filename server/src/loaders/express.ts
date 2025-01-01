import  { Application } from 'express'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import CustomerRoute from '../api/routes/CustomerRoute';
import CategoryRoute from '../api/routes/CategoryRoute';
import ManagerRoute from '../api/routes/ManagerRoute';
import ProductRoute from '../api/routes/ProductRoute';
import { AuthMiddleware } from '../api/middlewares/AuthMiddleWare';

dotenv.config();

const expressLoader = (app: Application):void =>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(cookieParser());
    app.set("port", process.env.PORT || 4545);
    //라우터 호출
    app.use('/category', AuthMiddleware , CategoryRoute);
    app.use('/customer', AuthMiddleware ,CustomerRoute);
    app.use('/product', AuthMiddleware ,ProductRoute);
    app.use('/manager',ManagerRoute);

    app.listen(app.get("port"), () => {
        console.log(app.get("port"), "번에서 대기중");
    });  
}

export default expressLoader;