import { FastifyInstance } from 'fastify';
import { compare } from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { ClientError } from '../errors/clientError';

// Define o schema com Zod para o login
const loginSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(6),
});

// Função para o login de usuário
export async function loginUsuario(app: FastifyInstance) {
  app.post('/login', {
    schema: {
      body: loginSchema,
    },
  }, async (request) => {
    const { email, senha } = loginSchema.parse(request.body); // Valida e extrai os dados

    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      throw new ClientError('Usuário não encontrado');
    }

    const senhaValida = await compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new ClientError('Senha inválida');
    }

    // Gerar o token JWT
    const token = app.jwt.sign({ id: usuario.id, email: usuario.email });

    return { token };
  });
}
