import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { dayjs } from '../lib/dayjs'
import { ClientError } from '../errors/clientError'

export async function criarAtividade(app: FastifyInstance) {
	//Validação de esquema com ZodTypeProvider
	app.withTypeProvider<ZodTypeProvider>().post(
		'/viagem/:idViagem/atividades',
		{
			schema: {
        params: z.object({
          idViagem: z.string().uuid(),
        }),
				body: z.object({
					titulo: z.string().min(4),
					ocorre_em: z.coerce.date(),
				}),
			},
		},
		async (request) => {
      const { idViagem } = request.params
			const { titulo, ocorre_em } = request.body

      const viagem = await prisma.viagem.findUnique({
        where: { id_viagem: idViagem}
      })

      if (!viagem) {
        throw new ClientError('Viagem não encontrada')
      }

      if(dayjs(ocorre_em).isBefore(viagem.data_inicio)){
        throw new ClientError('Data da atividade inválida')
      }

      if(dayjs(ocorre_em).isAfter(viagem.data_fim)){
        throw new ClientError('Data da atividade inválida')
      }

      const atividade = await prisma.atividade.create({
        data:{
          titulo,
          ocorre_em,
          viagem_id: idViagem,
        }
      })

			return { idAtividade: atividade.id_atividade }
		}
	)
}
