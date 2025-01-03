import { useEffect, useState } from "react";
import axiosInstance from "../../utils/AxiosInstance";

export type Product={
    no:number;
    name:string;
    category:string;
    purchase_price:number;
    sale_price:number;
    size:string;
    stock:number;
}

const useGetProduct = () =>{
    const [products,setProducts] = useState<Product[]>([]);
    useEffect(()=>{
        getProductList();
    },[])
    const getProductList = () =>{
        axiosInstance.get<Product[]>('/product')
        .then((res)=>{
            const products:Product[] = res.data as Product[];
            setProducts(products);
        })
        .catch((err)=>{console.error(err)})
    }
    return { products }
}
export default useGetProduct;