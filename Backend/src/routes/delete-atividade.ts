import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/clientError'

export async function deletarAtividade(app: FastifyInstance) {
  // Validação de esquema com ZodTypeProvider
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/viagem/:idViagem/atividades/:idAtividade',
    {
      schema: {
        params: z.object({
          idViagem: z.string().uuid(),
          idAtividade: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { idViagem, idAtividade } = request.params

      // Verifica se a viagem existe
      const viagem = await prisma.viagem.findUnique({
        where: { id_viagem: idViagem },
      })

      if (!viagem) {
        throw new ClientError('Viagem não encontrada')
      }

      // Verifica se a atividade existe
      const atividade = await prisma.atividade.findUnique({
        where: { id_atividade: idAtividade },
      })

      if (!atividade) {
        throw new ClientError('Atividade não encontrada')
      }

      // Deleta a atividade
      await prisma.atividade.delete({
        where: {
          id_atividade: idAtividade,
        },
      })

      // Retorna uma resposta de sucesso
      //reply.status(204).send()  // Sem conteúdo após a exclusão
      return { atividade }
    }
  )
}
