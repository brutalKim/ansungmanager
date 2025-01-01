import managerRepository from "../db/Repository/Manager/ManagerRepository";
import { LoginDTO, ManagerServiceInterface, Response, Status } from "../interface/ManagerInterface";
import { Manager } from "../type/globals";
import { hashPW, validPW } from "../type/passwordUtils";
import { issueAccessToken, issueRefreshToken } from "../utils/jwtManager";

class ManagerService implements ManagerServiceInterface{
    //로그인
    async login(id: string, pw: string): Promise<LoginDTO> {
        const manager:Manager ={id:id,pw:pw};
        try {
            const res:Manager[] = await managerRepository.getManager(manager);
            const user:Manager = res[0];
            if(res.length === 1 && user.pw){
                //비밀번호 검증
                if(await validPW(pw , user.pw)){
                    //엑세스 토큰 발급
                    const accessToken:string = issueAccessToken(user);
                    //리프레시 토큰 발급
                    const refreshToken:string = issueRefreshToken(user);
                    const resultDTO:LoginDTO = {
                        status:Status.SUCCESS,
                        accessToken:accessToken,
                        refreshToken:refreshToken,
                        id:user.id,
                        name:user.name
                    }
                    return resultDTO;
                }else{
                    return {status:Status.UNAUTHORIZED};
                }
            }
            //아이디가 존재하지 않을시
            return {status:Status.UNAUTHORIZED};
        } catch (error) {
            return {status:Status.INTERNAL_ERROR};
        }
    }
    //회원가입
    async signup(id: string, pw: string, name: string): Promise<Response> {
        const manager:Manager = {
            id : id ,
            pw: pw,
            name:name
        };
        try {
            const res:Manager[] = await managerRepository.getManager(manager);
            //중복된 아이디 없을시
            if(res.length === 0){
                await managerRepository.createManager(manager);
            //중복된 아이디 존재
            }else{
                return {status : Status.DUPLICATE};
            }
            return {status : Status.SUCCESS};
        } catch (error) {
            return {status : Status.INTERNAL_ERROR};
        }
    }
}
const managerService:ManagerService = new ManagerService();

export default managerService;