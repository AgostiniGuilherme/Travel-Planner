import { FastifyPluginAsync } from 'fastify';
import FastifyJWT from '@fastify/jwt';

const jwtPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.register(FastifyJWT, {
    secret: 'chave', // Mude para uma chave secreta segura
    sign: {
      expiresIn: '1h', // Define o tempo de expiração do token
    },
  });
};

export default jwtPlugin;