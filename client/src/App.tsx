import React from "react"
import Auth from "./components/public/Auth/Auth"
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { AuthState } from "./features/managerSlice";
import Main from "./components/private/Main/Main";


const App:React.FC =()=> {
  const manager:AuthState = useSelector((state: RootState) => state.manager);
  {
    return manager.isLogin ? <Main/> : <Auth/>
  }
}

export default App
