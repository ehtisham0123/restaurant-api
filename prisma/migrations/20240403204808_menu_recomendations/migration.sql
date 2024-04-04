-- CreateTable
CREATE TABLE `MenuRecommendation` (
    `id` VARCHAR(191) NOT NULL,
    `originMenuId` VARCHAR(191) NOT NULL,
    `recommendedMenuId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MenuRecommendation` ADD CONSTRAINT `MenuRecommendation_originMenuId_fkey` FOREIGN KEY (`originMenuId`) REFERENCES `Menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuRecommendation` ADD CONSTRAINT `MenuRecommendation_recommendedMenuId_fkey` FOREIGN KEY (`recommendedMenuId`) REFERENCES `Menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
