import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'

export async function confirmarViagem(app: FastifyInstance){
  //Validação de esquema com ZodTypeProvider
  app.withTypeProvider<ZodTypeProvider>().get('/viagem/:idViagem/confirm',{
    schema: {
      params: z.object({
        idViagem: z.string().uuid(),
      })
    },
  } , async (request) => {

    return { idViagem: request.params.idViagem }
  })
}