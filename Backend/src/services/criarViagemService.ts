import { dayjs } from "../lib/dayjs";
import { criarViagemRepository } from "../repositories/criarViagemRepository";
import { getMailClient } from "../lib/mail";
import nodemailer from "nodemailer"
import { ClientError } from "../errors/clientError";
import { env } from "../env";

export const criarViagemService = {
  execute: async ({ destino, data_inicio, data_fim, organizador_nome, organizador_email, emails_convidados }: any) => {
    // Verificação de datas
    if (dayjs(data_inicio).isBefore(new Date())) {
      throw new ClientError('Data de início inválida.');
    }
    if (dayjs(data_fim).isBefore(data_inicio)) {
      throw new ClientError('Data final inválida.');
    }
    // Chamada ao repositório para criar a viagem
    const viagem = await criarViagemRepository.create({
      destino,
      data_inicio,
      data_fim,
      organizador_nome,
      organizador_email,
      emails_convidados,
    });

    // Formatar datas
    const dataInicioFormatada = dayjs(data_inicio).format('LL');
    const dataFimFormatada = dayjs(data_fim).format('LL');

    // Link de confirmação
    const linkDeConfirmacao = `${env.API_BASE_URL}/viagem/:${viagem.id_viagem}/confirm`;

    // Enviar e-mail de confirmação
    const mail = await getMailClient();
    const message = await mail.sendMail({
      from: {
        name: 'Equipe Travel Planner',
        address: 'oi@travelplanner.com',
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
    });

    console.log(nodemailer.getTestMessageUrl(message));

    return { idViagem: viagem.id_viagem };
  }
};
