import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/clientError'

export async function criarLink(app: FastifyInstance) {
	//Validação de esquema com ZodTypeProvider
	app.withTypeProvider<ZodTypeProvider>().post(
		'/viagem/:idViagem/links',
		{
			schema: {
        params: z.object({
          idViagem: z.string().uuid(),
        }),
				body: z.object({
					titulo: z.string().min(4),
					url: z.string().url(),
				}),
			},
		},
		async (request) => {
      const { idViagem } = request.params
			const { titulo, url } = request.body

      const viagem = await prisma.viagem.findUnique({
        where: { id_viagem: idViagem}
      })

      if (!viagem) {
        throw new ClientError('Viagem não encontrada')
      }

      const link = await prisma.link.create({
        data:{
          titulo,
          url,
          viagem_id: idViagem,
        }
      })

			return { idLink: link.id_link }
		}
	)
}
