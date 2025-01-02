import { useMemo } from "react";
import { Product } from "../../../../hook/product/useGetProduct";
import { useTable } from 'react-table';
interface Props{
    products:Product[]
}
const ProductTable:React.FC<Props> = ({products})=>{
    const columns = useMemo(
        ()=> [
            {
                Header:'Name',
            }
        ]
    )
    return(
        <div>

        </div>
    )
}
export default ProductTable;