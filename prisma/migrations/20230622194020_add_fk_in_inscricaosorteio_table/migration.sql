-- AlterTable
ALTER TABLE `inscricao_sorteio` MODIFY `id_compet_cabeca` INTEGER NULL,
    MODIFY `id_compet_pe` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `inscricao_sorteio` ADD CONSTRAINT `inscricao_sorteio_id_compet_cabeca_fkey` FOREIGN KEY (`id_compet_cabeca`) REFERENCES `competidor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inscricao_sorteio` ADD CONSTRAINT `inscricao_sorteio_id_compet_pe_fkey` FOREIGN KEY (`id_compet_pe`) REFERENCES `competidor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
