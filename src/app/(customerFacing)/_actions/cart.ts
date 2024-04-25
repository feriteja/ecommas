"use server";
import db from "@/db/db";

type cartProps = {
  userId?: string;
  productId: string;
  quantity: number;
};

async function getItemCart(userId: string) {
  try {
    const cart = await db.cart.findMany({
      where: {
        userId: userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return cart;
  } catch (error) {
    throw error;
  }
}

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
          userId: userId!,
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

async function getTotalItemsInCart(cartId: string) {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cartId,
    },
    select: {
      quantity: true,
    },
  });

  // Calculate total quantity
  let totalQuantity = 0;
  cartItems.forEach((item) => {
    totalQuantity += item.quantity;
  });

  return totalQuantity;
}

async function getTotalItemsInCartByUserId(userId: string) {
  // Find the cartId associated with the userId
  const cart = await db.cart.findUnique({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });

  if (!cart) {
    // Handle case where no cart is found for the userId
    return 0;
  }

  // Once you have the cartId, use the previous function to get the total quantity of items
  return getTotalItemsInCart(cart.id);
}

async function deleteItemInCart(cartItemId: string) {
  try {
    await db.cartItem.delete({ where: { id: cartItemId } });
    console.log("Item deleted from cart successfully");
  } catch (error) {
    console.error("Error deleted item from cart:", error);
    throw error;
  }
}

async function deleteItemsInCartBulk(cartItemId: string[]) {
  try {
    await db.cartItem.deleteMany({ where: { id: { in: cartItemId } } });
    console.log("Item deleted many from cart successfully");
  } catch (error) {
    console.error("Error deleted item from cart:", error);
    throw error;
  }
}

export {
  addToCart,
  getTotalItemsInCartByUserId,
  getItemCart,
  deleteItemInCart,
  deleteItemsInCartBulk,
};
