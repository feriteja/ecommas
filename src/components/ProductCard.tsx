"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Product } from "@prisma/client";
import { formatCurrency } from "@/lib/formater";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "@/app/(customerFacing)/_actions/cart";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { addItemToCart } from "@/store/cartReducer";

type ProductCardProps = {
  id: string;
  name: string;
  imagePath: string;
  priceInCents: number;
  description: string;
};

function ProductCard({
  id,
  name,
  imagePath,
  priceInCents,
  description,
}: ProductCardProps) {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const addToCartHandle = async () => {
    if (!auth.isAuthenticated) {
      return router.push("/login");
    }
    await addToCart({ productId: id, quantity: 1, userId: auth.user?.userId });
    dispatch(addItemToCart(1));
  };

  return (
    <Card className="flex overflow-hidden flex-col">
      <Link href={`/products/${id}`}>
        <div className="relative w-full h-auto aspect-video">
          <Image
            src={imagePath}
            fill
            alt={name}
            sizes="(max-width: 168px)"
            className=""
          />
        </div>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>
            {formatCurrency(priceInCents / 100)}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="line-clamp-4">{description}</p>
        </CardContent>
      </Link>
      <CardFooter className="gap-2">
        <Button
          asChild
          size={"sm"}
          className="w-full cursor-pointer"
          onClick={() => addToCartHandle()}
        >
          <ShoppingCart />
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="flex overflow-hidden flex-col animate-pulse">
      <div className="relative w-full h-auto aspect-video bg-gray-300"></div>
      <CardHeader>
        <div className="w-3/4 h-6 rounded-full bg-gray-300"></div>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300"></div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300"></div>
        <div className="w-full h-4 rounded-full bg-gray-300"></div>
        <div className="w-1/4 h-4 rounded-full bg-gray-300"></div>
      </CardContent>
      <CardFooter>
        <Button size={"lg"} className="w-full" />
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
