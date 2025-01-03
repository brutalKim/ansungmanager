import { Link } from "react-router-dom";
import style from '../../../style/Menu.module.css'
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { AuthState } from "../../../features/managerSlice";
const Menu:React.FC = ()=>{
    const manager:AuthState = useSelector((state: RootState) => state.manager);
    return(
        <div className={style.Menu}>
            <div id={style.element}>
                <Link to="/">통계</Link>
                <Link to="/sale">판매</Link>
                <Link to="/customer">고객 관리</Link>
                <Link to="/product">상품 관리</Link>
                <Link to="/delivery">배달 관리</Link>
            </div>
            <div id={style.manager}>
                <div id={style.name}>{manager.name}님</div>
                <div id={style.id}>{manager.id}</div>
            </div>
        </div>
    )
}
export default Menu;