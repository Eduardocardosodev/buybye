-- CreateTable
CREATE TABLE `competidor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_competidor` VARCHAR(191) NOT NULL,
    `nivel_cabeca` INTEGER NOT NULL,
    `nivel_pe` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_evento` VARCHAR(191) NOT NULL,
    `vlr_inscricao` DECIMAL(4, 2) NOT NULL,
    `qtd_inscricao_sorteio` INTEGER NOT NULL,
    `data_hr_prova` DATETIME(3) NOT NULL,

    UNIQUE INDEX `evento_nome_evento_key`(`nome_evento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `regra_evento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `soma_nivel` INTEGER NOT NULL,
    `qtd_corrida` INTEGER NOT NULL,
    `id_evento` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `premio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `posicao` INTEGER NOT NULL,
    `id_evento` INTEGER NULL,
    `premio` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inscricao_sorteio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_compet_cabeca` INTEGER NOT NULL,
    `id_compet_pe` INTEGER NOT NULL,
    `qtd_inscricao` INTEGER NOT NULL,
    `id_evento` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `regra_evento` ADD CONSTRAINT `regra_evento_id_evento_fkey` FOREIGN KEY (`id_evento`) REFERENCES `evento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `premio` ADD CONSTRAINT `premio_id_evento_fkey` FOREIGN KEY (`id_evento`) REFERENCES `evento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inscricao_sorteio` ADD CONSTRAINT `inscricao_sorteio_id_evento_fkey` FOREIGN KEY (`id_evento`) REFERENCES `evento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
