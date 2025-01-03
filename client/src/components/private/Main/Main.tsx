
import Static from "../static/Static";
import Menu from "./Menu";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from "./product/Product";
import Sale from "./sale/Sale";
import Customer from "./customer/Customer";
import Delivery from "./delivery/Delivery";
const Main:React.FC = () =>{
    return(
        <>
        <Router>
            <Menu/>
            <Routes>
                <Route path="" element={<Static/>} />
                <Route path="/product" element={<Product/>} />
                <Route path="/sale" element={<Sale/>} />
                <Route path="/customer" element={<Customer/>} />
                <Route path="/delivery" element={<Delivery/>}/>
            </Routes>
        </Router>
        </>
    )
}
export default Main;