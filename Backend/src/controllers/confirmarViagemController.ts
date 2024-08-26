import { FastifyReply, FastifyRequest } from "fastify";
import { confirmarViagemService } from "../services/confirmarViagemService";
import { env } from "../env";

export async function confirmarViagemController(request: FastifyRequest, reply: FastifyReply) {
  const { idViagem } = request.params as { idViagem: string };

    await confirmarViagemService(idViagem);
    return reply.redirect(`${env.WEB_BASE_URL}/viagem/${idViagem}`);

}