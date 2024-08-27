import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/clientError'

export async function listarLinks(app: FastifyInstance) {
	//Validação de esquema com ZodTypeProvider
	app.withTypeProvider<ZodTypeProvider>().get(
		'/viagem/:idViagem/links',
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
        where: { id_viagem: idViagem },
        include: { 
          links: true 
        }
      })

      if (!viagem) {
        throw new ClientError('Viagem não encontrada')
      }
			
      return { links: viagem.links }
		}
	)
}
