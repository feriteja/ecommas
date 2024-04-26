/*
  Warnings:

  - Added the required column `filePathRef` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagePathRef` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "filePathRef" TEXT NOT NULL,
ADD COLUMN     "imagePathRef" TEXT NOT NULL;
