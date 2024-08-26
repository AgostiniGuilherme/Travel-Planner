import { FastifyInstance } from "fastify";
import { confirmarViagemController } from "../controllers/confirmarViagemController";
import { z } from 'zod';
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function confirmarViagemRouter(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/viagem/:idViagem/confirm', {
    schema: {
      params: z.object({
        idViagem: z.string().uuid(),
      })
    },
  }, confirmarViagemController);
}