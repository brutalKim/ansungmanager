import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  id? : string;
  name? : string;
  isLogin : boolean;
}

const initialState: AuthState = {
    isLogin:false
};

const managerSlice = createSlice({
  name: 'manager',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isLogin = action.payload.isLogin;
    },
    logout:(state)=>{
        state.id = undefined;
        state.name = undefined;
        state.isLogin = false;
    }
  },
});

export const { login, logout } = managerSlice.actions;

export default managerSlice.reducer;
