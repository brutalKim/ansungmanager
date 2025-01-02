import { useState } from "react";
import axiosInstance from "../../utils/AxiosInstance";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { AuthState , login, logout } from "../../features/managerSlice";
type DTO={
    id:string;
    pw:string;
}
const useLogin = () =>{
    const dispatch = useDispatch<AppDispatch>();
    const initDto:DTO = {
        id: "",
        pw: ""
    }
    const [dto,setDTO] = useState<DTO>(initDto);
    
    const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setDTO((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }));
    }
    const submitLogin = () =>{
        axiosInstance.post('/manager/login',dto)
        .then((res)=>{
            const authState:AuthState={
                id : res.data.id,
                name : res.data.name,
                isLogin : true
            }
            dispatch(login(authState));
            sessionStorage.setItem('accessToken',res.data.accessToken)
        })
        .catch((error)=>{console.log(error)})
    }
    return { dto, onChangeHandler , submitLogin }
}
export default useLogin;