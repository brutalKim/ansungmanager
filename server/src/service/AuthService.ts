import { Manager } from '../type/globals';
import { issueAccessToken } from '../utils/jwtManager';

class AuthManager{
    //임시 해시맵 이용 추후 redis or database이용으로 수정
    private tokenStore:Map<string,string>;
    constructor(){
        this.tokenStore = new Map();
    }
    //리프래시 토큰저장
    storeRefreshToken(manager:Manager , refreshToken:string){
        this.tokenStore.set(manager.id,refreshToken);
    }
    //액세스 토큰 재발급
    refreshAccessToken(manager:Manager , refreshToken:string):string{
        try {
            const storedRefreshToken = this.tokenStore.get(manager.id);
            if(storedRefreshToken === refreshToken ){
                return issueAccessToken(manager);
            }
            let missingErr = new Error();
            missingErr.name = 'MissingRefreshToken'
            throw missingErr;
        } catch (error) {
            this.#deleteRefreshToken(manager);
            throw error;
        }
    }
    //private 리프래시 토큰 삭제
    #deleteRefreshToken(manager:Manager){
        this.tokenStore.delete(manager.id);
    }
}
const authManager:AuthManager = new AuthManager();
export default authManager;