"use client";
import React, { useEffect, useState } from "react";
import CartCard from "./_components/CartCard";
import { useAppSelector } from "@/store/hooks";
import { getItemCart } from "../_actions/cart";
import { CartItem, Product } from "@prisma/client";
import CartSummary from "./_components/CartSummary";

type CartCardProps = CartItem & {
  product: Product;
};

export type SelectedProductProps = {
  id: string;
  quantity: number;
  price: number;
  name: string;
};

function CartPage() {
  const [cartItems, setCartItems] = useState<CartCardProps[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<
    SelectedProductProps[]
  >([]);
  const userId = useAppSelector((state) => state.auth.user?.userId);

  useEffect(() => {
    if (userId) {
      getItemCart(userId).then((items) => setCartItems(items[0].items));
    }
  }, []);

  const handleProductSelect = (
    product: SelectedProductProps,
    isSelected: boolean
  ) => {
    if (isSelected) {
      setSelectedProducts((prevSelected) => [...prevSelected, product]);
    } else {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((prevproduct) => prevproduct.id !== product.id)
      );
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <button
        onClick={() => console.log(selectedProducts)}
        className="col-span-12"
      >
        halo
      </button>
      <div className="col-span-8 space-y-2">
        {cartItems.map((data) => (
          <CartCard
            {...data}
            key={data.id}
            onSelect={(isSelected) =>
              handleProductSelect(
                {
                  id: data.id,
                  quantity: data.quantity,
                  price: data.product.priceInCents,
                  name: data.product.name,
                },
                isSelected
              )
            }
          />
        ))}
      </div>
      <div className="col-span-4">
        <CartSummary data={selectedProducts} />
      </div>
    </div>
  );
}

export default CartPage;
