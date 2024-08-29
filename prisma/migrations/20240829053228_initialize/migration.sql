-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_measure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "measureTypeId" TEXT NOT NULL,
    "hasConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT NOT NULL,
    "measurementDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "measure_measureTypeId_fkey" FOREIGN KEY ("measureTypeId") REFERENCES "measure_type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "measure_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_measure" ("createdAt", "customerId", "hasConfirmed", "id", "imageUrl", "measureTypeId", "measurementDate", "updatedAt") SELECT "createdAt", "customerId", "hasConfirmed", "id", "imageUrl", "measureTypeId", "measurementDate", "updatedAt" FROM "measure";
DROP TABLE "measure";
ALTER TABLE "new_measure" RENAME TO "measure";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
