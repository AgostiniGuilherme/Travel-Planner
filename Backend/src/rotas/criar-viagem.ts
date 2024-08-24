import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
import nodemailer from "nodemailer"
import { z } from 'zod'
import { prisma } from "../lib/prisma";
import { getMailClient } from "../lib/mail";

dayjs.locale('pt-br')
dayjs.extend(localizedFormat);
 
export async function criarViagem(app: FastifyInstance){
  //Validação de esquema com ZodTypeProvider
  app.withTypeProvider<ZodTypeProvider>().post('/viagem',{
    schema: {
      body: z.object({
        destino: z.string().min(4),
        data_inicio: z.coerce.date(),
        data_fim: z.coerce.date(),
        organizador_nome: z.string(),
        organizador_email: z.string().email(),
        emails_convidados: z.array(z.string().email()),
      })
    },
  } , async (request) => {
    const { destino, data_inicio, data_fim, organizador_nome, organizador_email, emails_convidados } = request.body
    
    //Regras de Verificação de datas
    if (dayjs(data_inicio).isBefore(new Date())) {
      throw new Error('Data de início inválida.')
    }
    if (dayjs(data_fim).isBefore(data_inicio)) {
      throw new Error('Data final inválida.')
    }

    

    //Criar viagem com Prisma (no BD)
    const viagem = await prisma.viagem.create({
      data: {
        destino,
        data_inicio,
        data_fim,
        membros: {
          createMany: {
            data: [
              {
                nome: organizador_nome,
                email: organizador_email,
                eh_organizador: true,
                esta_confirmado: true,
              },
              //Percorre lista de emails convidados e concatena
              ...emails_convidados.map(email => {
                return { email }
              })
            ],
          }
        }
      }
    })

    //formatar data
    const dataInicioFormatada = dayjs(data_inicio).format('LL')
    const dataFimFormatada = dayjs(data_fim).format('LL')

    const linkDeConfirmacao = `http://localhost:3333/viagem/:${viagem.id_viagem}/confirm`

    //Testar envio de email
    const mail = await getMailClient()

    const message = await mail.sendMail({
      from: {
        name: 'Equipe Travel Planner',
        address: 'oi@travelplanner.com'
      },
      to: {
        name: organizador_nome,
        address: organizador_email,
      },
      subject: `Confirme sua viagem para ${destino}`,
      html: `
      <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
        <p>Você solicitou a criação de uma viagem para <strong>${destino}</strong> nas datas de <strong>${dataInicioFormatada}</strong> até <strong>${dataFimFormatada}</strong>.</p>
        <p></p> 
        <p>Para confirmar sua viagem, clique no link abaixo:</p>
        <p></p> 
        <p>
          <a href="${linkDeConfirmacao}">Confirmar viagem</a>
        </p>  
        <p></p> 
        <p>Caso você não saiba do que se trata, apenas ignore esse e-mail.</p>
      </div>
      `.trim(),
    })

    console.log(nodemailer.getTestMessageUrl(message))

    
    return { idViagem: viagem.id_viagem }
  })
}