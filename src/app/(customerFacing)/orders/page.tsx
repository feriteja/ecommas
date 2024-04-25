import React from "react";
import { getMyOrders } from "../_actions/order";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode"; // JWT decoding library
import { AuthJwtToken } from "@/lib/authJwtData";
import PageHeader from "../_components/PageHeader";
import Image from "next/image";
import { formatCurrency } from "@/lib/formater";

function OrdersPage() {
  return (
    <>
      <PageHeader>My Order</PageHeader>
      <OrderLists />
    </>
  );
}

async function OrderLists() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("auth_token");
  const decodedToken = jwtDecode(authToken?.value as string) as AuthJwtToken;
  const dummyOrder = [...Array(10).fill(1)];

  const orders = await getMyOrders(decodedToken.userId);
  if (orders.length === 0) return <p>No Orders Found</p>;

  return (
    <div>
      {orders.map((data) => (
        <div
          key={data.id}
          className="bg-white shadow-md rounded-lg overflow-hidden flex flex-1 h-32"
        >
          <div className="w-1/6 relative aspect-w-4 aspect-h-3">
            <Image
              src={data.product.imagePath}
              alt={data.product.name}
              fill
              sizes="undefined"
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="w-2/3 p-4 flex flex-col justify-between">
            <h2 className="text-xl font-semibold mb-2">{data.product.name}</h2>
            <div className="flex justify-between items-end">
              <p className="text-gray-800 font-semibold">
                {formatCurrency(data.pricePaidInCents / 100)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrdersPage;
