import { z } from 'zod';
import { criarViagemService } from "../services/criarViagemService";

export const criarViagemController = {
  schema: z.object({
    destino: z.string().min(4),
    data_inicio: z.coerce.date(),
    data_fim: z.coerce.date(),
    organizador_nome: z.string(),
    organizador_email: z.string().email(),
    emails_convidados: z.array(z.string().email()),
  }),
  handle: async (request: any) => {
    const { 
      destino, 
      data_inicio, 
      data_fim, 
      organizador_nome, 
      organizador_email, 
      emails_convidados 
    } = request.body;
    return criarViagemService.execute({ destino, data_inicio, data_fim, organizador_nome, organizador_email, emails_convidados });
  }
};