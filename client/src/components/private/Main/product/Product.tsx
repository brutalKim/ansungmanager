import useGetProduct from '../../../../hook/product/useGetProduct';
import commonStyle from '../../../../style/Common.module.css'
const Product:React.FC = ()=>{
    const { products } = useGetProduct();
    return(
        <div className={commonStyle.Window}>
            <h2>상품 관리</h2>
            <input placeholder='검색'></input>
            {
                products.map((product)=>(<div>{product.name}</div>))
            }
        </div>
    )
}
export default Product;