import  { Application } from 'express'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import CustomerRoute from '../api/routes/CustomerRoute';
import CategoryRoute from '../api/routes/CategoryRoute';
import ManagerRoute from '../api/routes/ManagerRoute';
import ProductRoute from '../api/routes/ProductRoute';

dotenv.config();

const expressLoader = (app: Application):void =>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.set("port", process.env.PORT || 4545);
    //라우터 호출
    app.use('/category',CategoryRoute);
    app.use('/customer',CustomerRoute);
    app.use('/manager',ManagerRoute);
    app.use('/product',ProductRoute);

    app.listen(app.get("port"), () => {
        console.log(app.get("port"), "번에서 대기중");
    });  
}

export default expressLoader;