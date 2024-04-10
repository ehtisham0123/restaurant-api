/*
  Warnings:

  - You are about to drop the column `landmark` on the `OrderAddress` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `OrderAddress` table. All the data in the column will be lost.
  - Added the required column `email` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OrderAddress` DROP COLUMN `landmark`,
    DROP COLUMN `province`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    MODIFY `label` ENUM('Home', 'Office', 'Shop') NOT NULL;
