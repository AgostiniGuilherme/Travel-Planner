import fastify from 'fastify';
import cors from '@fastify/cors';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { confirmarViagemRouter } from './rotas/confirmarViagemRouter';
import { criarViagemRouter } from './rotas/criarViagemRouter';
import { confirmarMembroRouter } from './rotas/confirmarMembroRouter';
import { criarAtividade } from './rotas/criar-atividade';
import { listarAtividade } from './rotas/listar-atividades';
import { criarLink } from './rotas/criar-link';
import { listarLinks } from './rotas/listar-links';
import { listarMembros } from './rotas/listar-membros';
import { listarViagensMembro } from './rotas/listar-viagens-membro';
import { criarConvite } from './rotas/criar-convite';
import { atualizarViagem } from './rotas/atualizar-viagem';
import { listarDetalhesViagem } from './rotas/listar-detalhes-viagem';
import { listarMembro } from './rotas/listar-membro';
import { errorHandler } from './errorHandler';
import { env } from './env';
import { deletarLink } from './rotas/delete-link';
import { deletarViagem } from './rotas/delete-viagem';
import { deletarAtividade } from './rotas/delete-atividade';
import { deletarMembro } from './rotas/delete-membro';

const app = fastify()

//acesso frontend
app.register(cors, {
  origin: '*',
})

//Validação com 'zod'
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler)

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