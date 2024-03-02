/*
  Warnings:

  - You are about to drop the column `contact` on the `restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `restaurant` table. All the data in the column will be lost.
  - Added the required column `name` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wifi` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `restaurant` DROP COLUMN `contact`,
    DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `postalCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `wifi` VARCHAR(191) NOT NULL;
