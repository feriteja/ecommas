"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "./store";
import { authJwtData } from "@/lib/authJwtData";
import { loginSuccess, logout } from "./authReducer";
import db from "@/db/db";
import { addItemToCart } from "./cartReducer";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
