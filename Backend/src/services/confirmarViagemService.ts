import { confirmarViagemRepository } from "../repositories/confirmarViagemRepository";
import { getMailClient } from "../lib/mail";
import { dayjs } from "../lib/dayjs";
import nodemailer from "nodemailer";
import { ClientError } from "../errors/clientError";
import { env } from "../env";

export async function confirmarViagemService(idViagem: string) {
  const viagem = await confirmarViagemRepository.encontrarViagem(idViagem);

  if (!viagem) {
    throw new Error('Viagem não encontrada');
  }

  if (viagem.esta_confirmado) {
    throw new ClientError('Viagem já confirmada');
  }

  await confirmarViagemRepository.confirmar(idViagem);

  // Formatar datas
  const dataInicioFormatada = dayjs(viagem.data_inicio).format('LL');
  const dataFimFormatada = dayjs(viagem.data_fim).format('LL');

  const mail = await getMailClient();

  await Promise.all(
    viagem.membros.map(async (membro: any) => {
      const linkDeConfirmacao = `${env.API_BASE_URL}/membro/${membro.id_membro}/confirm/`;

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
            <p>Para confirmar sua presença na viagem, clique no link abaixo:</p>
            <p><a href="${linkDeConfirmacao}">Confirmar presença</a></p>
            <p>Caso você não saiba do que se trata, apenas ignore esse e-mail.</p>
          </div>
        `.trim(),
      });

      console.log(nodemailer.getTestMessageUrl(message));
    })
  );
}
