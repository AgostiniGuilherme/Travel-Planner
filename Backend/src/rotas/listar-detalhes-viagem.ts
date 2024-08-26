import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/clientError'

export async function listarDetalhesViagem(app: FastifyInstance) {
	//Validação de esquema com ZodTypeProvider
	app.withTypeProvider<ZodTypeProvider>().get(
		'/viagem/:idViagem',
		{
			schema: {
        params: z.object({
          idViagem: z.string().uuid(),
        })
			},
		},
		async (request) => {
      const { idViagem } = request.params

      const viagem = await prisma.viagem.findUnique({
        select: {
          id_viagem: true,
          destino: true,
          data_inicio: true,
          data_fim: true,
          esta_confirmado: true
        },
        where: { id_viagem: idViagem },
      })

      if (!viagem) {
        throw new ClientError('Viagem não encontrada')
      }
			
      return { viagem }
		}
	)
}
