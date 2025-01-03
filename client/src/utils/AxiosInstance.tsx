import axios, { AxiosInstance } from 'axios';

const axiosInstance:AxiosInstance = axios.create({
    //환경변수의 BASEURL
    baseURL : 'http://localhost:4545',
    headers:{
        'Content-Type': 'application/json'
    },
});

axiosInstance.interceptors.request.use(
    (config)=>{
        //sessionStorage에 저장된 accessToken
        const token = sessionStorage.getItem('accessToken');
        if(token){
            //header에 authorization 추가
            config.headers['Authorization'] = token;
        }
        return config;
    },
    (error)=>Promise.reject(error)
);

export default axiosInstance;