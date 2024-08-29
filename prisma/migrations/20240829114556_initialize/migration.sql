/*
  Warnings:

  - You are about to drop the column `createdAt` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `measure` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `measure` table. All the data in the column will be lost.
  - You are about to drop the column `hasConfirmed` on the `measure` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `measure` table. All the data in the column will be lost.
  - You are about to drop the column `measureTypeId` on the `measure` table. All the data in the column will be lost.
  - You are about to drop the column `measurementDate` on the `measure` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `measure` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `measure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `measure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measure_type_id` to the `measure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measurement_date` to the `measure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `measure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `measure_type` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_customer" ("id") SELECT "id" FROM "customer";
DROP TABLE "customer";
ALTER TABLE "new_customer" RENAME TO "customer";
CREATE TABLE "new_measure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customer_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "measure_type_id" TEXT NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "image_url" TEXT NOT NULL,
    "measurement_date" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "measure_measure_type_id_fkey" FOREIGN KEY ("measure_type_id") REFERENCES "measure_type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "measure_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_measure" ("id", "value") SELECT "id", "value" FROM "measure";
DROP TABLE "measure";
ALTER TABLE "new_measure" RENAME TO "measure";
CREATE TABLE "new_measure_type" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_measure_type" ("id", "name") SELECT "id", "name" FROM "measure_type";
DROP TABLE "measure_type";
ALTER TABLE "new_measure_type" RENAME TO "measure_type";
CREATE UNIQUE INDEX "measure_type_name_key" ON "measure_type"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
