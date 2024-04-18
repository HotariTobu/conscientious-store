/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `count` on the `Item` table. All the data in the column will be lost.
  - Added the required column `purchaseQuantity` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soldQuantity` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Profile_userId_key";

-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "_CategoryToPost_B_index";

-- DropIndex
DROP INDEX "_CategoryToPost_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Category";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Profile";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CategoryToPost";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "purchaseQuantity" INTEGER NOT NULL,
    "soldQuantity" INTEGER NOT NULL,
    "purchasePrice" INTEGER NOT NULL,
    "salePrice" INTEGER NOT NULL,
    "productCode" TEXT NOT NULL,
    CONSTRAINT "Item_productCode_fkey" FOREIGN KEY ("productCode") REFERENCES "Product" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("id", "productCode", "purchasePrice", "salePrice") SELECT "id", "productCode", "purchasePrice", "salePrice" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
