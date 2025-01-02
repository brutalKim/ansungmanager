import useSignup from '../../../hook/Auth/useSignup'
import style from '../../../style/Auth.module.css'
interface props{
    setVisibleSignup:React.Dispatch<React.SetStateAction<boolean>>;
}
const Signup:React.FC<props> = ({setVisibleSignup}) =>{
    const { onChangeHandler , DTO , postSignup} = useSignup();
    return(
        <div className={style.Signup}>
            <h1>관리자 추가</h1>
            <label>아이디</label>
            <input id='id' onChange={(e)=>{onChangeHandler(e)}} value={DTO.id}></input>
            <label>비밀번호</label>
            <input id='pw' onChange={(e)=>{onChangeHandler(e)}} value={DTO.pw}></input>
            <label>이름</label>
            <input id='name' onChange={(e)=>{onChangeHandler(e)}} value={DTO.name}></input>
            <button onClick={postSignup}>관리자 추가</button>
            <button onClick={()=>{setVisibleSignup(false)}}>뒤로가기</button>
        </div>
    )
}
export default Signup