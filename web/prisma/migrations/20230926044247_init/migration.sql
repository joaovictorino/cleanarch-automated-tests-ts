-- CreateTable
CREATE TABLE `Conta` (
    `numero` VARCHAR(191) NOT NULL,
    `saldo` DOUBLE NOT NULL,

    UNIQUE INDEX `Conta_numero_key`(`numero`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
