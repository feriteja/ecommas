"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { addToCart } from "@/app/(customerFacing)/_actions/cart";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItemToCart } from "@/store/cartReducer";
import { useRouter } from "next/navigation";

type ButtonCartProps = {
  productId: string;
};

function ButtonCart({ productId }: ButtonCartProps) {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const addToCartHandle = async () => {
    if (!auth.isAuthenticated) {
      return router.push("/login");
    }
    await addToCart({ productId, quantity: 1, userId: auth.user?.userId });
    dispatch(addItemToCart(1));
  };

  return (
    <Button onClick={() => addToCartHandle()}>
      <ShoppingCart />
    </Button>
  );
}

export default ButtonCart;
