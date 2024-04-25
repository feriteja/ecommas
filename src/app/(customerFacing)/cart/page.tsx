"use client";
import { deleteItemFromCart } from "@/store/cartReducer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CartItem, Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { deleteItemInCart, getItemCart } from "../_actions/cart";
import CartCard from "./_components/CartCard";
import CartSummary from "./_components/CartSummary";

type CartCardProps = CartItem & {
  product: Product;
};

export type SelectedItemCartProps = {
  id: string;
  quantity: number;
  price: number;
  name: string;
  productId: string;
};

function CartPage() {
  const [cartItems, setCartItems] = useState<CartCardProps[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<
    SelectedItemCartProps[]
  >([]);
  const [refreshData, setRefreshData] = useState(false);
  const userId = useAppSelector((state) => state.auth.user?.userId);
  const dispatch = useAppDispatch();

  const handleProductSelect = (
    cartItem: SelectedItemCartProps,
    isSelected: boolean
  ) => {
    if (isSelected) {
      setSelectedProducts((prevSelected) => [...prevSelected, cartItem]);
    } else {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((prevCartItem) => prevCartItem.id !== cartItem.id)
      );
    }
  };

  const handleProductDelete = async (
    selectedProducts: SelectedItemCartProps
  ) => {
    try {
      await deleteItemInCart(selectedProducts.id);

      setSelectedProducts((prevSelected) =>
        prevSelected.filter(
          (prevCartItem) => prevCartItem.id !== selectedProducts.id
        )
      );
      dispatch(deleteItemFromCart(selectedProducts.quantity));
      setRefreshData((prev) => !prev);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (userId) {
      getItemCart(userId).then((items) => setCartItems(items[0].items));
    }
  }, [refreshData]);

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
            onDelete={() =>
              handleProductDelete({
                id: data.id,
                quantity: data.quantity,
                price: data.product.priceInCents,
                name: data.product.name,
                productId: data.productId,
              })
            }
            onSelect={(isSelected) =>
              handleProductSelect(
                {
                  id: data.id,
                  quantity: data.quantity,
                  price: data.product.priceInCents,
                  name: data.product.name,
                  productId: data.productId,
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
