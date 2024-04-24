import { Nav } from "@/components/Nav";
import { CartNav, NavLink } from "@/components/NavAuth";

export const dynamic = "force-dynamic";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <ul className="flex items-center gap-6 text-sm mx-auto">
          <li>
            <NavLink href={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink href={"/products"}>Products</NavLink>
          </li>
          <li>
            <NavLink href={"/orders"}>My Orders</NavLink>
          </li>
          <li>
            <NavLink href={"/orders"}>
              <CartNav />
            </NavLink>
          </li>
        </ul>
      </Nav>
      <div className="container  my-6">{children}</div>
    </>
  );
}
