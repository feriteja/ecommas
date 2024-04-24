"use client";
import { authJwtData } from "@/lib/authJwtData";
import { createSlice } from "@reduxjs/toolkit";
import { error } from "console";

type AuthDataProps = {
  userId: string;
  email: string;
};

type InitialStateProps = {
  isAuthenticated: boolean;
  user: AuthDataProps | null;
  isLoading: boolean;
  error?: string | null;
};

const initialState: InitialStateProps = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

const userDataFromCookie = authJwtData();
if (userDataFromCookie) {
  initialState.isAuthenticated = true;
  initialState.user = userDataFromCookie;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;
