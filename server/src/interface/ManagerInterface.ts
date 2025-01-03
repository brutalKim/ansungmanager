export enum Status {
    SUCCESS = "SUCCESS",
    FAILURE = "FAILURE",
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    NOT_FOUND = "NOT_FOUND",
    INTERNAL_ERROR = "INTERNAL_ERROR",
    DUPLICATE = "DUPLICATE"
}

export interface Response{
    status:Status;
}

export interface LoginDTO extends Response{
    accessToken?:string;
    refreshToken?:string;
    id?:string;
    name?:string;
}

export interface ManagerServiceInterface{
    login(id:string , pw:string):Promise<LoginDTO>;
    signup(id:string , pw:string , name:string):Promise<Response>;
}