"use server";

import db from "@/db/db";
import { Order, Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

type CreateOrdersProps = {
  pricePaidInCents: number;
  userId: string;
  productId: string;
}[];

async function getMyOrders(userId: string) {
  try {
    const orders = await db.order.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { createdAt: "desc" },
    });

    return orders;
  } catch (error) {
    console.log("failed to get the order", error);

    throw error;
  }
}

async function createOrders(dataOrder: CreateOrdersProps) {
  try {
    const ordersData: Prisma.OrderCreateManyInput[] = dataOrder.map(
      (order) => ({
        pricePaidInCents: order.pricePaidInCents,
        userId: order.userId,
        productId: order.productId,
      })
    );
    await db.order.createMany({ data: ordersData });
    redirect("/orders");
  } catch (error) {
    console.log("failed to create the order", error);
    throw error;
  }
}

export { getMyOrders, createOrders };
