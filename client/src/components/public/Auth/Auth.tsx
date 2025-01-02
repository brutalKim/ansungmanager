import { useState } from 'react';
import style from '../../../style/Auth.module.css'
import Login from './Login'
import Signup from './Signup'
const Auth:React.FC = () =>{
    const [visibleSignup,setVisibleSignup] = useState<boolean>(false);
    return(
        <div className={style.Auth}>
            <div id={style.window}>
                {
                    visibleSignup ? <Signup setVisibleSignup={setVisibleSignup}/> : <Login setVisibleSignup={setVisibleSignup}/>
                }
            </div>
        </div>
    )
}
export default Auth