/*
  Warnings:

  - Added the required column `count` to the `Share` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "count" INTEGER NOT NULL,
    "purchasePrice" INTEGER NOT NULL,
    "salePrice" INTEGER NOT NULL,
    "productCode" TEXT NOT NULL,
    CONSTRAINT "Item_productCode_fkey" FOREIGN KEY ("productCode") REFERENCES "Product" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("count", "id", "productCode", "purchasePrice", "salePrice") SELECT "count", "id", "productCode", "purchasePrice", "salePrice" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE TABLE "new_Share" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quote" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "shareholderId" INTEGER NOT NULL,
    CONSTRAINT "Share_shareholderId_fkey" FOREIGN KEY ("shareholderId") REFERENCES "Shareholder" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Share" ("id", "quote", "shareholderId") SELECT "id", "quote", "shareholderId" FROM "Share";
DROP TABLE "Share";
ALTER TABLE "new_Share" RENAME TO "Share";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
