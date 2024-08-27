import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/clientError'

export async function deletarViagem(app: FastifyInstance) {
  // Validação de esquema com ZodTypeProvider
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/viagem/:idViagem',
    {
      schema: {
        params: z.object({
          idViagem: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { idViagem } = request.params

      // Verifica se a viagem existe
      const viagem = await prisma.viagem.findUnique({
        where: { id_viagem: idViagem },
      })

      if (!viagem) {
        throw new ClientError('Viagem não encontrada')
      }

      //Exclui atividades associadas à viagem
      await prisma.atividade.deleteMany({
        where: { viagem_id: idViagem },
      })

      // Exclui links associados à viagem
      await prisma.link.deleteMany({
        where: { viagem_id: idViagem },
      })

      // Exclui membros associados à viagem
      await prisma.membro.deleteMany({
        where: { viagem_id: idViagem },
      })
      
      // Deleta a viagem
      await prisma.viagem.delete({
        where: { id_viagem: idViagem },
      })

      // Retorna uma resposta de sucesso
      //reply.status(204).send()  // Sem conteúdo após a exclusão
      return { viagem }
    }
  )
}
