import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { dayjs } from '../lib/dayjs'
import { ClientError } from '../errors/clientError'

export async function listarAtividade(app: FastifyInstance) {
	//Validação de esquema com ZodTypeProvider
	app.withTypeProvider<ZodTypeProvider>().get(
		'/viagem/:idViagem/atividades',
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
          atividades: {
            orderBy: {
              ocorre_em: 'asc',
            }
        } }
      })

      if (!viagem) {
        throw new ClientError('Viagem não encontrada')
      }

      //listagem das atividades por dia
      const diferencaDeDiasEntreDataInicioEDataFim = dayjs(viagem.data_fim).diff(viagem.data_inicio, 'days')
      
      const atividades = Array.from({ length: diferencaDeDiasEntreDataInicioEDataFim + 1}).map((_, index) => {
        const data = dayjs(viagem.data_inicio).add(index, 'days')
        return {
          data: data.toDate(),
          atividades: viagem.atividades.filter(atividade => {
            return dayjs(atividade.ocorre_em).isSame(data, 'day')
          })
        }
      })
			
      return { atividades }
		}
	)
}
