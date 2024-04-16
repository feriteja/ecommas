import React from "react";
import ProductForm from "../../_components/ProductForm";
import PageHeader from "@/app/admin/_components/PageHeader";
import db from "@/db/db";

async function EditProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await db.product.findUnique({ where: { id } });
  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </>
  );
}

export default EditProductPage;
