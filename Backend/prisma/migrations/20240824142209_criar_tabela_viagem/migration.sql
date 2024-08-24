-- CreateTable
CREATE TABLE "viagem" (
    "id_viagem" TEXT NOT NULL PRIMARY KEY,
    "destino" TEXT NOT NULL,
    "data_inicio" DATETIME NOT NULL,
    "data_fim" DATETIME NOT NULL,
    "esta_confirmado" BOOLEAN NOT NULL DEFAULT false,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
