import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/clientError'

export async function deletarMembro(app: FastifyInstance) {
  // Validação de esquema com ZodTypeProvider
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/viagem/:idViagem/membro/:idMembro',
    {
      schema: {
        params: z.object({
          idViagem: z.string().uuid(),
          idMembro: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { idViagem, idMembro } = request.params

      // Verifica se a viagem existe
      const viagem = await prisma.viagem.findUnique({
        where: { id_viagem: idViagem },
      })

      if (!viagem) {
        throw new ClientError('Viagem não encontrada')
      }

      // Verifica se o membro existe
      const membro = await prisma.membro.findUnique({
        where: { id_membro: idMembro },
      })

      if (!membro) {
        throw new ClientError('Membro não encontrado')
      }

      // Verifica se o membro está associado à viagem
      if (membro.viagem_id !== idViagem) {
        throw new ClientError('Membro não pertence à viagem especificada')
      }

      // Deleta o membro
      await prisma.membro.delete({
        where: { id_membro: idMembro },
      })

      // Retorna uma resposta de sucesso
      //reply.status(204).send()  // Sem conteúdo após a exclusão
      return { membro }
    }
  )
}
