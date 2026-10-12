import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export interface AuthUser {
  email: string;
  role: string;
  [key: string]: unknown;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  user: null,
  error: null,
};
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      
      // localStorage.setItem("token", action.payload);
      // state.user = jwtDecode(action.payload);
      state.user = action.payload ? jwtDecode<AuthUser>(action.payload) : null
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
      // localStorage.removeItem("token");
    },
  },
});

export const { setToken, clearToken } = AuthSlice.actions;
export default AuthSlice.reducer;
