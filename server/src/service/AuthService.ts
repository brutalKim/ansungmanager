import crypto from 'crypto'
import { Manager } from '../type/globals';
import { issueAccessToken, verifyRefreshToken } from '../utils/jwtManager';

class AuthManager{
    //임시 해시맵 이용 추후 redis or database이용으로 수정
    private tokenStore:Map<string,string>;
    constructor(){
        this.tokenStore = new Map();
    }
    
    storeRefreshToken(manager:Manager , refreshToken:string){
        this.tokenStore.set(manager.id,refreshToken);
    }

    refreshAccessToken(manager:Manager , refreshToken:string):string|boolean{
        try {
            const valid:boolean = verifyRefreshToken(manager, refreshToken);
            if(valid){
                return issueAccessToken(manager);
            }
            return false;
        } catch (error) {
            console.error(error);
            this.#deleteRefreshToken(manager);
            return false;
        }
    }
    #deleteRefreshToken(manager:Manager){
        this.tokenStore.delete(manager.id);
    }
}
const authManager:AuthManager = new AuthManager();
export default authManager;