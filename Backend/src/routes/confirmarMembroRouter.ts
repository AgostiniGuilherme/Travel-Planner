import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { confirmarMembroController } from "../controllers/confirmarMembroController";

export async function confirmarMembroRouter(app: FastifyInstance){
  //Validação de esquema com ZodTypeProvider
  app.withTypeProvider<ZodTypeProvider>().get('/membro/:idMembro/confirm', {
    schema: { params: z.object({ idMembro: z.string().uuid() }) },
  }, confirmarMembroController)
}

