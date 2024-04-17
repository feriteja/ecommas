import db from "@/db/db";
import { notFound } from "next/navigation";
import Strip from "stripe";

// const  strip = new Strip(process.env.STRIP_SECRET_KEY)

export default async function PurchasePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({ where: { id } });

  if (!product) return notFound();
  return <h1>hi</h1>;
}
