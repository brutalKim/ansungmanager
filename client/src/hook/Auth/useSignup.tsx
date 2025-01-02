import { useEffect, useState } from "react";
import axiosInstance from "../../utils/AxiosInstance";

type signupDTO={
    id:string,
    pw:string,
    name:string
}
const useSignup =()=>{
    const initDTO:signupDTO = {
        id: '',
        pw: '',
        name: ''
    }
    const [DTO,setDTO] = useState<signupDTO>(initDTO);

    const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setDTO((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }));
    }
    const postSignup = () =>{
        axiosInstance.post('/manager/signup',DTO)
        .then((res)=>{
            console.log(res)
        })
        .catch((error)=>{
            switch (error.status) {
                case 409:
                    
                    break;
                case 500:
                    
                    break;
                case 400:

                    break;
            }
        });
    }
    return {onChangeHandler ,DTO ,postSignup}
}
export default useSignup;