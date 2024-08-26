import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import nodemailer from 'nodemailer'
import { dayjs } from '../lib/dayjs'
import { getMailClient } from '../lib/mail'
import { ClientError } from '../errors/clientError'
import { env } from '../env'

export async function criarConvite(app: FastifyInstance) {
	//Validação de esquema com ZodTypeProvider
	app.withTypeProvider<ZodTypeProvider>().post(
		'/viagem/:idViagem/convites',
		{
			schema: {
				params: z.object({
					idViagem: z.string().uuid(),
				}),
				body: z.object({
					email: z.string().email(),
				}),
			},
		},
		async (request) => {
			const { idViagem } = request.params
			const { email } = request.body

			const viagem = await prisma.viagem.findUnique({
				where: { id_viagem: idViagem },
			})

			if (!viagem) {
				throw new ClientError('Viagem não encontrada')
			}

			const membro = await prisma.membro.create({
				data: {
					email,
					viagem_id: idViagem,
				},
			})

			//formatar data
			const dataInicioFormatada = dayjs(viagem.data_inicio).format('LL')
			const dataFimFormatada = dayjs(viagem.data_fim).format('LL')

			const mail = await getMailClient()

			const linkDeConfirmacao = `${env.API_BASE_URL}/membro/${membro.id_membro}/confirm`

			const message = await mail.sendMail({
				from: {
					name: 'Equipe Travel Planner',
					address: 'oi@travelplanner.com',
				},
				to: membro.email,
				subject: `Confirme sua viagem para ${viagem.destino}`,
				html: `
          <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
            <p>Você foi convidado(a) para participar de uma viagem para <strong>${viagem.destino}</strong> nas datas de <strong>${dataInicioFormatada}</strong> até <strong>${dataFimFormatada}</strong>.</p>
            <p></p> 
            <p>Para confirmar sua presença na viagem, clique no link abaixo:</p>
            <p></p> 
            <p>
              <a href="${linkDeConfirmacao}">Confirmar presença</a>
            </p>  
            <p></p> 
            <p>Caso você não saiba do que se trata, apenas ignore esse e-mail.</p>
          </div>
          `.trim(),
			})

			console.log(nodemailer.getTestMessageUrl(message))

			return { idMembro: membro.id_membro }
		}
	)
}
