/*
  Warnings:

  - Added the required column `path` to the `sales_reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sales_reports" ADD COLUMN     "path" TEXT NOT NULL;
