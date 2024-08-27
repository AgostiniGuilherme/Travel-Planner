import { FastifyInstance } from 'fastify';
import { hash, compare } from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { ClientError } from '../errors/clientError';

// Define o schema com Zod
const cadastroSchema = z.object({
  nome: z.string().min(2),
  email: z.string().email(),
  senha: z.string().min(6),
});

// Função para o cadastro de usuário
export async function cadastrarUsuario(app: FastifyInstance) {
  app.post('/cadastro', {
    schema: {
      body: cadastroSchema,
    },
  }, async (request) => {
    const { nome, email, senha } = cadastroSchema.parse(request.body); // Valida e extrai os dados

    const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
    if (usuarioExistente) {
      throw new ClientError('Usuário já existe');
    }

    const senhaHash = await hash(senha, 10);
    const usuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaHash },
    });

    return { idUsuario: usuario.id };
  });
}

