import { FastifyInstance } from 'fastify';

export async function authenticateDecorator(app: FastifyInstance) {
  app.decorate('authenticate', async (request: any, reply: any) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
}
