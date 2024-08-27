// src/routes/viagemRouter.ts
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { criarViagemController } from "../controllers/criarViagemController";

export async function criarViagemRouter(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/viagem', {
    schema: { body: criarViagemController.schema },
  }, criarViagemController.handle)
}