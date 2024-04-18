"use server";

import db from "@/db/db";

export default async function useOrderExists(email: string, productId: string) {
  return !!(await db.order.findFirst({
    where: { user: { email }, productId },
    select: { id: true },
  }));
}
