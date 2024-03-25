/*
  Warnings:

  - You are about to alter the column `unitOfMeasurement` on the `stock` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `stock` MODIFY `quantity` INTEGER NOT NULL,
    MODIFY `unitOfMeasurement` ENUM('Grams', 'Kilograms', 'Milliliters', 'Liters', 'Teaspoons', 'Tablespoons', 'Cups', 'Pieces', 'Others') NOT NULL;
