"use client";
import { getTotalItemsInCartByUserId } from "@/app/(customerFacing)/_actions/cart";
import { cn } from "@/lib/utils";
import { logout } from "@/store/authReducer";
import { setInitItemCart } from "@/store/cartReducer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Cookies from "js-cookie";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps, useEffect } from "react";

function NavAuth({ isLogin }: { isLogin?: boolean }) {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = () => {
    Cookies.remove("auth_token");
    dispatch(logout());
    route.refresh();
  };

  return (
    <div
      className={cn("items-center gap-4", [
        isAuth && isLogin ? "flex" : "flex",
      ])}
    >
      {!isAuth && !isLogin ? (
        <div className="sm:flex sm:gap-4">
          <Link
            className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
            href="/login"
          >
            Login
          </Link>

          <div className="hidden sm:flex">
            <Link
              className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
              href="/register"
            >
              Register
            </Link>
          </div>
        </div>
      ) : (
        <div className="sm:flex">
          <button
            className="rounded-md bg-destructive px-5 py-2.5 text-sm font-medium text-destructive-foreground"
            onClick={() => logoutHandler()}
          >
            Logout
          </button>
        </div>
      )}

      <div className="block md:hidden">
        <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default NavAuth;

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  return (
    <Link
      {...props}
      className={cn("text-gray-500 transition hover:text-gray-500/75")}
    />
  );
}

export function CartNav() {
  const cartNumber = useAppSelector((state) => state.cart.cartItemCount);
  const userId = useAppSelector((state) => state.auth.user?.userId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId) {
      const fetchTotalItems = async () => {
        try {
          const totalItems = await getTotalItemsInCartByUserId(userId);

          dispatch(setInitItemCart(totalItems));
        } catch (error) {
          console.error("Error fetching total items:", error);
        }
      };

      fetchTotalItems();
    }
  }, [userId]);

  return (
    <div className="relative">
      <span className="absolute -top-2 -right-2 bg-red-600 rounded-full text-destructive-foreground p-0.5 text-xs">
        {cartNumber}
      </span>
      <ShoppingCart />
    </div>
  );
}
