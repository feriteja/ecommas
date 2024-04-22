import { Nav, NavLink } from "@/components/Nav";

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
        </ul>
      </Nav>
      <div className="container  my-6">{children}</div>
    </>
  );
}
