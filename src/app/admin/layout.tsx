import { Nav } from "@/components/Nav";
import { NavLink } from "@/components/NavAuth";
import { app } from "@/firebase/config";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <NavLink href={"/admin"}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink href={"/admin/products"}>Products</NavLink>
          </li>
          <li>
            <NavLink href={"/admin/users"}>Users</NavLink>
          </li>
          <li>
            <NavLink href={"/admin/orders"}>Orders</NavLink>
          </li>
        </ul>
      </Nav>
      <div className="container  my-6">{children}</div>
    </>
  );
}
