/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `competidor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `competidor` ADD COLUMN `email` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `senha` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX `competidor_email_key` ON `competidor`(`email`);
