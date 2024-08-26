import { FastifyReply, FastifyRequest } from "fastify";
import { confirmarMembroService } from "../services/confirmarMembroService";
import { env } from "../env";

export async function confirmarMembroController(request: FastifyRequest, reply: FastifyReply) {
  const { idMembro } = request.params as { idMembro: string };

    await confirmarMembroService(idMembro);
    return reply.redirect(`${env.WEB_BASE_URL}/viagem/${idMembro}`);

}