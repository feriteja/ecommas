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
  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="relative w-full h-auto aspect-video">
        <Image src={imagePath} fill alt={name} className="" />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-4">{description}</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button asChild size={"lg"} className="w-full">
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
        <Button
          asChild
          size={"sm"}
          className=" h-full"
          onClick={() => addToCart({ productId: id, quantity: 1 })}
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
