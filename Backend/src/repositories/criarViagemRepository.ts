// src/repositories/viagemRepository.ts
import { prisma } from "../lib/prisma";

export const criarViagemRepository = {
  create: async ({ destino, data_inicio, data_fim, organizador_nome, organizador_email, emails_convidados }: any) => {
    return prisma.viagem.create({
      data: {
        destino,
        data_inicio,
        data_fim,
        membros: {
          createMany: {
            data: [
              {
                nome: organizador_nome,
                email: organizador_email,
                eh_organizador: true,
                esta_confirmado: true,
              },
              ...emails_convidados.map((email: string) => ({ email })),
            ],
          },
        },
      },
    });
  }
};
