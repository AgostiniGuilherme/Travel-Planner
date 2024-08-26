import { prisma } from "../lib/prisma";

export const confirmarMembroRepository = {
  async encontrar(idMembro: string) {
    return prisma.membro.findUnique({
      where: {
        id_membro: idMembro,
      },
    });
  },

  async confirmar(idMembro: string) {
    return prisma.membro.update({
      where: { id_membro: idMembro },
      data: { esta_confirmado: true },
    });
  },
};
