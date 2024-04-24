import db from "@/db/db";
import { formatCurrency } from "@/lib/formater";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import ButtonCart from "./_components/ButtonCart";

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const product = await db.product.findUnique({ where: { id: params.id } });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <Image
            src={product!.imagePath}
            alt={product!.name}
            width={500}
            height={500}
            priority
            className="object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-4">
          <h1 className="text-3xl font-semibold">{product?.name}</h1>
          <p className="text-gray-600 mt-2">
            {formatCurrency(product!.priceInCents / 100)}
          </p>
          <p className="mt-4">{product?.description}</p>
          <div className="mt-6 grid grid-cols-6">
            <ButtonCart productId={params.id} />
            <button className="bg-green-500 text-white px-4 py-2 rounded-md col-span-5">
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
