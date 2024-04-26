"use server";

import db from "@/db/db";
import { storage } from "@/firebase/config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
  name: z.string().min(4),
  description: z.string().min(4),
  priceInCents: z.coerce.number().int().min(1),
  file: fileSchema.refine((file) => file.size > 0, "Required"),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
});

const editSchema = addSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
});

export async function addProduct(prevState: unknown, formData: FormData) {
  try {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
    const uniqueFilename = uuidv4();

    if (!result.success) {
      return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    const publicProductsRef = `public/products/${uniqueFilename}`;
    const productsRef = `products/${uniqueFilename}`;
    const storagePublicProductsRef = ref(storage, publicProductsRef);
    const storageProductsRef = ref(storage, productsRef);

    const filePath = await uploadBytes(storageProductsRef, data.file);
    const imagePath = await uploadBytes(storagePublicProductsRef, data.image);

    const fileDownloadUrl = await getDownloadURL(filePath.ref);
    const imageDownloadUrl = await getDownloadURL(imagePath.ref);

    await db.product.create({
      data: {
        isAvailableForPurchase: false,
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
        filePath: fileDownloadUrl,
        imagePath: imageDownloadUrl,
        filePathRef: productsRef,
        imagePathRef: publicProductsRef,
      },
    });

    revalidatePath("/");
    revalidatePath("/products");
    redirect("/admin/products");
  } catch (error) {
    console.log({ error });

    throw error;
  }
}

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const product = await db.product.findUnique({ where: { id } });

  if (!product) {
    return notFound();
  }

  let fileDownloadUrl = product.filePath;
  if (data.file != null && data?.file?.size > 0) {
    const fileRef = ref(storage, product.filePathRef);
    await deleteObject(fileRef);

    const uploadFile = await uploadBytes(fileRef, data.file);
    fileDownloadUrl = await getDownloadURL(uploadFile.ref);
  }

  let imageDownloadUrl = product.imagePath;
  if (data.image != null && data?.image?.size > 0) {
    const imageRef = ref(storage, product.imagePathRef);
    await deleteObject(imageRef);

    const uploadFile = await uploadBytes(imageRef, data.image);
    fileDownloadUrl = await getDownloadURL(uploadFile.ref);
  }

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath: fileDownloadUrl,
      imagePath: imageDownloadUrl,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } });
  revalidatePath("/");
  revalidatePath("/products");
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } });
  if (!product) return notFound();

  const fileRef = ref(storage, product.filePathRef);
  await deleteObject(fileRef);

  const imageRef = ref(storage, product.imagePathRef);
  await deleteObject(imageRef);

  revalidatePath("/");
  revalidatePath("/products");
}
