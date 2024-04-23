import db from "@/db/db";
import { authData } from "@/lib/jwtToken";
import { useRouter } from "next/navigation";

type cartProps = {
  productId: string;
  quantity: number;
};

async function addToCart({ productId, quantity }: cartProps) {
  const router = useRouter();
  const auth = authData();

  if (!auth) {
    return router.push("/login");
  }
  try {
    // Check if the user already has a cart
    let cart = await db.cart.findUnique({
      where: {
        userId: auth.userId,
      },
    });

    // If the user doesn't have a cart, create one
    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId: auth.userId,
        },
      });
    }

    // Check if the item is already in the cart
    const existingCartItem = await db.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });

    if (existingCartItem) {
      // If the item is already in the cart, update the quantity
      await db.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
      });
    } else {
      // If the item is not in the cart, add it
      await db.cartItem.create({
        data: {
          quantity: quantity,
          productId: productId,
          cartId: cart.id,
        },
      });
    }

    console.log("Item added to cart successfully");
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
}

export { addToCart };
