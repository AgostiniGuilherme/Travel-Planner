import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/clientError'

export async function listarMembro(app: FastifyInstance) {
	//Validação de esquema com ZodTypeProvider
	app.withTypeProvider<ZodTypeProvider>().get(
		'/membro/:idMembro',
		{
			schema: {
        params: z.object({
          idMembro: z.string().uuid(),
        })
			},
		},
		async (request) => {
      const { idMembro} = request.params

      const membro = await prisma.membro.findUnique({
        select: {
          id_membro: true,
          nome: true,
          email: true,
          esta_confirmado: true
        },
        where: { id_membro: idMembro},
      })

      if (!membro) {
        throw new ClientError('Membro não encontrado')
      }
			
      return { membro }
		}
	)
}
