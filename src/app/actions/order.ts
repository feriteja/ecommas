"use server";

import db from "@/db/db";

export default async function useOrderExists(
  userId: string,
  productId: string
) {
  return !!(await db.order.findFirst({
    where: { user: { id: userId }, productId },
    select: { id: true },
  }));
}
