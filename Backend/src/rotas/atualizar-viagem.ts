import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { dayjs } from '../lib/dayjs'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/clientError'

export async function atualizarViagem(app: FastifyInstance) {
	//Validação de esquema com ZodTypeProvider
	app.withTypeProvider<ZodTypeProvider>().put(
		'/viagem/:idViagem',
		{
			schema: {
				params: z.object({
					idViagem: z.string().uuid(),
				}),
				body: z.object({
					destino: z.string().min(4),
					data_inicio: z.coerce.date(),
					data_fim: z.coerce.date(),
				}),
			},
		},
		async (request) => {
      const { idViagem} = request.params
			const { destino, data_inicio, data_fim } = request.body

			const viagem = await prisma.viagem.findUnique({
				where: { id_viagem: idViagem },
			})

			if (!viagem) {
				throw new ClientError('Viagem não encontrada')
			}

			//Regras de Verificação de datas
			if (dayjs(data_inicio).isBefore(new Date())) {
				throw new ClientError('Data de início inválida.')
			}
			if (dayjs(data_fim).isBefore(data_inicio)) {
				throw new ClientError('Data final inválida.')
			}

      await prisma.viagem.update({
        where: { id_viagem: idViagem},
        data: {
          destino, data_inicio, data_fim, 
        }
      })

			return { idViagem: viagem.id_viagem }
		}
	)
}
