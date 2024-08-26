-- CreateTable
CREATE TABLE "atividades" (
    "id_atividade" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "ocorre_em" DATETIME NOT NULL,
    "viagem_id" TEXT NOT NULL,
    CONSTRAINT "atividades_viagem_id_fkey" FOREIGN KEY ("viagem_id") REFERENCES "viagem" ("id_viagem") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "links" (
    "id_link" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "viagem_id" TEXT NOT NULL,
    CONSTRAINT "links_viagem_id_fkey" FOREIGN KEY ("viagem_id") REFERENCES "viagem" ("id_viagem") ON DELETE RESTRICT ON UPDATE CASCADE
);
