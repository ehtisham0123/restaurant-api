/*
  Warnings:

  - Made the column `categoryId` on table `menu` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `menu` DROP FOREIGN KEY `Menu_categoryId_fkey`;

-- AlterTable
ALTER TABLE `menu` MODIFY `categoryId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
