"use client";
import db from "@/db/db";
import { authJwtData } from "@/lib/authJwtData";
import { createSlice } from "@reduxjs/toolkit";
import { error } from "console";

type InitialStateProps = {
  cartItemCount: number;
};

const initialState: InitialStateProps = {
  cartItemCount: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setInitItemCart: (state, action) => {
      state.cartItemCount = action.payload;
    },
    addItemToCart: (state, action) => {
      state.cartItemCount += action.payload;
    },
    deleteItemFromCart: (state, action) => {
      state.cartItemCount -= action.payload;
    },
  },
});

export const { addItemToCart, deleteItemFromCart, setInitItemCart } =
  authSlice.actions;

export default authSlice.reducer;
