import { cookies } from "next/headers";
import { ReactNode } from "react";
import NavAuth from "./NavAuth";
import Link from "next/link";

export function Nav({ children }: { children: ReactNode }) {
  const cookieStore = cookies();
  const isLogin = cookieStore.get("auth_token");

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600" href="/">
              <span className="sr-only">Home</span>
              <span className="font-bold text-2xl">Ecommas</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">{children}</nav>
          </div>

          <NavAuth isLogin={!!isLogin} />
        </div>
      </div>
    </header>
  );
}
