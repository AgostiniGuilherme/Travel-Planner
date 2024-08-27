import fastify from 'fastify';
import cors from '@fastify/cors';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { confirmarViagemRouter } from './routes/confirmarViagemRouter';
import { criarViagemRouter } from './routes/criarViagemRouter';
import { confirmarMembroRouter } from './routes/confirmarMembroRouter';
import { criarAtividade } from './routes/criar-atividade';
import { listarAtividade } from './routes/listar-atividades';
import { criarLink } from './routes/criar-link';
import { listarLinks } from './routes/listar-links';
import { listarMembros } from './routes/listar-membros';
import { listarViagensMembro } from './routes/listar-viagens-membro';
import { criarConvite } from './routes/criar-convite';
import { atualizarViagem } from './routes/atualizar-viagem';
import { listarDetalhesViagem } from './routes/listar-detalhes-viagem';
import { listarMembro } from './routes/listar-membro';
import { errorHandler } from './errorHandler';
import { env } from './env';
import { deletarLink } from './routes/delete-link';
import { deletarViagem } from './routes/delete-viagem';
import { deletarAtividade } from './routes/delete-atividade';
import { deletarMembro } from './routes/delete-membro';
import { cadastrarUsuario } from './routes/auth-cadastro';
import { loginUsuario } from './routes/auth-login';
import fastifyJwt from '@fastify/jwt';
import { authenticateDecorator } from './decorator/authenticate';

const app = fastify()

//Acesso frontend
app.register(cors, {
  origin: '*',
})

//Validação com 'zod'
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

//Tratamento de erro
app.setErrorHandler(errorHandler)

// Registra o plugin Fastify JWT, que permite a geração e verificação de tokens JWT
// A opção 'secret' define a chave secreta usada para assinar e verificar os tokens
app.register(fastifyJwt, {
  secret: 'chave-senha', // chave secreta para assinatura/verificação dos tokens JWT
});


//Registra o decorator de autenticação,  que adiciona a funcionalidade de verificar 
//se as requisições possuem um token JWT válido antes de acessar determinadas rotas
app.register(authenticateDecorator);

app.register(cadastrarUsuario)
app.register(loginUsuario)


app.register(criarViagemRouter)
app.register(confirmarViagemRouter) 
app.register(atualizarViagem)
app.register(listarDetalhesViagem)
app.register(deletarViagem)
app.register(confirmarMembroRouter)
app.register(listarMembros)
app.register(criarConvite)
app.register(listarMembro)
app.register(listarViagensMembro)
app.register(deletarMembro)
app.register(criarAtividade)
app.register(listarAtividade)
app.register(deletarAtividade)
app.register(criarLink)
app.register(listarLinks)
app.register(deletarLink)


app.listen({ port: env.PORT }).then(() => {
  console.log('Server running')
})