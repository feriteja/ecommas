import db from "@/db/db";

type cartProps = {
  userId: string;
  productId: string;
  quantity: number;
};

async function addToCart({ userId, productId, quantity }: cartProps) {
  try {
    // Check if the user already has a cart
    let cart = await db.cart.findUnique({
      where: {
        userId: userId,
      },
    });

    // If the user doesn't have a cart, create one
    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId: userId,
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
