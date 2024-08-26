import { prisma } from "../lib/prisma";

export const confirmarViagemRepository = {
  // Método para encontrar uma viagem pelo ID e incluir membros que não são organizadores
  async encontrarViagem(idViagem: string) {
    return prisma.viagem.findUnique({
      where: {
        id_viagem: idViagem,
      },
      include: {
        membros: {
          where: {
            eh_organizador: false,
          },
        },
      },
    });
  },

  // Método para confirmar a viagem, atualizando o campo 'esta_confirmado' no banco de dados
  async confirmar(idViagem: string) {
    return prisma.viagem.update({
      where: { id_viagem: idViagem },
      data: { esta_confirmado: true },
    });
  }
};