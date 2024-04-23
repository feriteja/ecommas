"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentProps } from "react";

function NavAuth({ isLogin }: { isLogin: boolean }) {
  return (
    <div className={cn("items-center gap-4", [isLogin ? "hidden" : "flex"])}>
      {!isLogin && (
        <>
          <div className="sm:flex sm:gap-4">
            <a
              className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
              href="/login"
            >
              Login
            </a>

            <div className="hidden sm:flex">
              <a
                className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                href="/register"
              >
                Register
              </a>
            </div>
          </div>
        </>
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
  const pathName = usePathname();
  console.log(pathName, props.href);

  return (
    <Link
      {...props}
      className={cn("text-gray-500 transition hover:text-gray-500/75")}
    />
  );
}
