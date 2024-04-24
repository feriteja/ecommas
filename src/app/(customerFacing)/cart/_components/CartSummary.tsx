"use client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { SelectedProductProps } from "../page";
import { formatCurrency, formatNumber } from "@/lib/formater";

type CartSummaryProps = {
  data: SelectedProductProps[];
};

const calculateTotals = (products: SelectedProductProps[]) => {
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
  const [totals, setTotals] = useState(calculateTotals(data));

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
      <Link className=" text-destructive-foreground" href="/purchase">
        <div className=" px-2 py-2 w-full bg-teal-600">
          Purchase ({formatNumber(totals.totalQuantity)})
        </div>
      </Link>
    </div>
  );
}

export default CartSummary;
