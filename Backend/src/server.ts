import fastify from 'fastify';
import cors from '@fastify/cors';
import { criarViagem } from './rotas/criar-viagem';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { confirmarViagem } from './rotas/confirmar-viagem';

const app = fastify()

//acesso frontend
app.register(cors, {
  origin: '*',
})

//Validação com 'zod'
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(criarViagem)
app.register(confirmarViagem) 

app.listen({port: 3333}).then(() => {
  console.log('Server running')
})