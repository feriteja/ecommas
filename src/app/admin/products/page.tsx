import React from "react";
import PageHeader from "../_components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/db/db";
import { CheckCircle2, MoreVertical, XCircleIcon } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formater";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ActiveToggleDropdownItem,
  DeleteDropdownItem,
} from "./_components/ProductActions";

function AdminProductPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Product</PageHeader>
        <Button asChild>
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>
      {/* <ProductsTable /> */}
    </>
  );
}

// export async function ProductsTable() {
//   const products = await db.product.findMany({
//     select: {
//       id: true,
//       name: true,
//       priceInCents: true,
//       isAvailableForPurchase: true,
//       filePath: true,
//       imagePath: true,
//       _count: { select: { orders: true } },
//     },
//     orderBy: { name: "asc" },
//   });

//   if (products.length === 0) return <p>No product found</p>;

//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead className="w-0">
//             <span className="sr-only">Available For Purchase</span>
//           </TableHead>
//           <TableHead>Name</TableHead>
//           <TableHead>Price</TableHead>
//           <TableHead>Order</TableHead>
//           <TableHead className="w-0">
//             <span className="sr-only">Actions</span>
//           </TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {products.map((product) => (
//           <TableRow key={product.id}>
//             <TableCell>
//               {product.isAvailableForPurchase ? (
//                 <>
//                   <CheckCircle2 />
//                   <span className="sr-only">Available</span>
//                 </>
//               ) : (
//                 <>
//                   <XCircleIcon className="stroke-destructive" />
//                   <span className="sr-only">Unavailable</span>
//                 </>
//               )}
//             </TableCell>
//             <TableCell>{product.name} </TableCell>
//             <TableCell>{formatCurrency(product.priceInCents / 100)} </TableCell>
//             <TableCell>{formatNumber(product._count.orders)} </TableCell>
//             <TableCell>
//               <DropdownMenu>
//                 <DropdownMenuTrigger>
//                   <MoreVertical />
//                   <span className="sr-only">Actions</span>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent>
//                   <DropdownMenuItem asChild>
//                     <a download href={`/admin/products/${product.id}/download`}>
//                       Download
//                     </a>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem asChild>
//                     <Link href={`/admin/products/${product.id}/edit`}>
//                       Edit
//                     </Link>
//                   </DropdownMenuItem>
//                   <ActiveToggleDropdownItem
//                     id={product.id}
//                     isAvailableForPurchase={product.isAvailableForPurchase}
//                   />
//                   <DropdownMenuSeparator />
//                   <DeleteDropdownItem
//                     id={product.id}
//                     disable={product._count.orders > 0}
//                   />
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// }

export default AdminProductPage;
