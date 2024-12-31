import { LoginDTO, ManagerServiceInterface, Response } from "../interface/ManagerInterface";

export class ManagerService implements ManagerServiceInterface{
    login(id: string, pw: string): Promise<LoginDTO> {
        throw new Error("Method not implemented.");
    }
    signup(id: string, pw: string, name: string): Promise<Response> {
        throw new Error("Method not implemented.");
    }
}