import useLogin from '../../../hook/Auth/useLogin';
import style from '../../../style/Auth.module.css'

interface props{
    setVisibleSignup:React.Dispatch<React.SetStateAction<boolean>>;
}
const Login:React.FC<props> = ({setVisibleSignup}) =>{
    const { dto, onChangeHandler , submitLogin } = useLogin();
    return(
        <div className={style.Login}>
            <h1>로그인</h1>
            <label htmlFor='id'>아이디</label>
            <input id='id' onChange={(e)=>{onChangeHandler(e)}} value={dto.id}></input>
            <label htmlFor='pw'>비밀번호</label>
            <input id='pw' onChange={(e)=>{onChangeHandler(e)}} value={dto.pw}></input>
            <button onClick={()=>{setVisibleSignup(true)}}>관리자 추가</button>
            <button onClick={submitLogin}>시작</button>
        </div>
    )
}
export default Login