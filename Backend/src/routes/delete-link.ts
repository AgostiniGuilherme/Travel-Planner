import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/clientError'

export async function deletarLink(app: FastifyInstance) {
	//Validação de esquema com ZodTypeProvider
	app.withTypeProvider<ZodTypeProvider>().delete(
		'/viagem/:idViagem/links/:idLink',
		{
			schema: {
        params: z.object({
          idViagem: z.string().uuid(),
          idLink: z.string().uuid(),
        })
			},
		},
		async (request) => {
      const { idViagem, idLink } = request.params

      const viagem = await prisma.viagem.findUnique({
        where: { id_viagem: idViagem}
      })

      if (!viagem) {
        throw new ClientError('Viagem não encontrada')
      }

      // Verifica se o link existe e está associado à viagem
      const link = await prisma.link.findUnique({
        where: {
          id_link: idLink,
        }
      })

      if (!link || link.viagem_id !== idViagem) {
        throw new ClientError('Link não encontrado ou não associado à viagem')
      }

      // Deleta o link
      await prisma.link.delete({
        where: {
          id_link: idLink,
        },
      })
      
			return { link }
		}
	)
}
