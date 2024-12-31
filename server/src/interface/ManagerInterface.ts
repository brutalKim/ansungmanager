export interface Response{
    isSuccess:boolean;
    msg:string; 
}
export interface LoginDTO extends Response{
    token?:string;
    id?:string;
    name?:string;
}
export interface ManagerServiceInterface{
    login(id:string , pw:string):Promise<LoginDTO>;
    signup(id:string , pw:string , name:string):Promise<Response>;
}