-- CreateTable
CREATE TABLE "membros" (
    "id_membro" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT,
    "email" TEXT NOT NULL,
    "esta_confirmado" BOOLEAN NOT NULL DEFAULT false,
    "eh_organizador" BOOLEAN NOT NULL DEFAULT false,
    "viagem_id" TEXT NOT NULL,
    CONSTRAINT "membros_viagem_id_fkey" FOREIGN KEY ("viagem_id") REFERENCES "viagem" ("id_viagem") ON DELETE RESTRICT ON UPDATE CASCADE
);
