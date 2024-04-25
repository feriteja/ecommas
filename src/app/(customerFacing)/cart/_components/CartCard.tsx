"use client";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formater";
import { CartItem, Product } from "@prisma/client";
import { Trash, Trash2 } from "lucide-react";
import { useState } from "react";

type CartCardProps = CartItem & {
  product: Product;
  onSelect: (isSelected: boolean) => void;
  onDelete: () => void;
};

function CartCard(props: CartCardProps) {
  const product = props.product;
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    props.onSelect(newValue);
  };

  return (
    <div className="flex flex-1">
      <div className="w-1/12 flex items-center justify-center">
        <input
          type="checkbox"
          className="h-5 w-5 rounded border-gray-300 text-blue-500 focus:border-blue-400 focus:ring focus:ring-blue-200"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-1 h-32">
        <div className="w-1/3 relative">
          <div className="aspect-w-4 aspect-h-3">
            <img
              src={product.imagePath}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-2/3 p-4 flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
          <div className="flex justify-between items-end">
            <p className="text-gray-800 font-semibold">
              {formatCurrency(product.priceInCents / 100)}
            </p>
            <div className="flex gap-3">
              <span>{props.quantity}</span>
              <button
                onClick={() => props.onDelete()}
                className="stroke-destructive"
              >
                <Trash2 className="stroke-destructive" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
