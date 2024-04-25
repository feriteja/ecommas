"use client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { SelectedItemCartProps } from "../page";
import { formatCurrency, formatNumber } from "@/lib/formater";
import { Order } from "@prisma/client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createOrders } from "../../_actions/order";
import { deleteItemFromCart } from "@/store/cartReducer";
import { deleteItemsInCartBulk } from "../../_actions/cart";

type CartSummaryProps = {
  data: SelectedItemCartProps[];
};

const calculateTotals = (products: SelectedItemCartProps[]) => {
  let totalPrice = 0;
  let totalQuantity = 0;

  if (products) {
    products.forEach((product) => {
      totalPrice += product.price * product.quantity;
      totalQuantity += product.quantity;
    });
  }

  return { totalPrice, totalQuantity };
};

function CartSummary({ data }: CartSummaryProps) {
  const userId = useAppSelector((state) => state.auth.user!.userId);
  const [totals, setTotals] = useState(calculateTotals(data));
  const dispatch = useAppDispatch();
  const OrdersData = data.map((item) => {
    return {
      pricePaidInCents: item.price * item.quantity,
      userId: userId,
      productId: item.productId,
    };
  });

  const totalItem = data.reduce((prev, curent) => prev + curent.quantity, 0);

  const purchaseHandler = async () => {
    try {
      const idsCartItems = data.map((o) => o.id);
      await deleteItemsInCartBulk(idsCartItems);
      await createOrders(OrdersData);
      dispatch(deleteItemFromCart(totalItem));
    } catch (error) {
      throw error;
    }
  };

  // Update totals whenever products change
  useEffect(() => {
    setTotals(calculateTotals(data));
  }, [data]);

  return (
    <div className="bg-white rounded-lg px-2 py-4 space-y-3">
      <h1 className="font-bold text-lg">Cart Summary</h1>
      <div className="flex justify-between">
        <h2>total</h2>
        <span className="font-bold">
          {formatCurrency(totals.totalPrice / 100)}
        </span>
      </div>
      <button
        onClick={() => purchaseHandler()}
        className=" px-2 py-2 w-full bg-teal-600 text-white"
      >
        Purchase ({formatNumber(totals.totalQuantity)})
      </button>
    </div>
  );
}

export default CartSummary;
