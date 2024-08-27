import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/clientError'

export async function listarViagensMembro(app: FastifyInstance) {
	//Validação de esquema com ZodTypeProvider
	app.withTypeProvider<ZodTypeProvider>().get(
		'/membro/:idMembro/viagens',
		{
			schema: {
				params: z.object({
					idMembro: z.string().uuid(),
				}),
			},
		},
		async (request) => {
			const { idMembro } = request.params

			const membro = await prisma.membro.findUnique({
				where: { id_membro: idMembro },
				include: {
					viagem: true,
				},
			})

			if (!membro) {
				throw new ClientError('Membro não encontrado')
			}

			// Buscar as viagens associadas ao membro
			const viagens = await prisma.viagem.findMany({
				where: {
					membros: {
						some: {
							id_membro: idMembro,
						},
					},
				},
				select: {
					//id_viagem: true,
					destino: true,
					data_inicio: true,
					data_fim: true,
					esta_confirmado: true,
					criado_em: true,
				},
			})

			return { viagens }
		}
	)
}
