import type { FastifyInstance } from "fastify"
import { ClientError } from "./errors/clientError"
import { ZodError } from "zod"

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  console.log(error)
  
  //erros de campos de entrada
  if (error instanceof ZodError){
    return reply.status(400).send({
      message: 'Entrada inválida',
      errors: error.flatten().fieldErrors
    })
  }

  //Tratamento de erro
  if (error instanceof ClientError) {
    console.log(error)
    return reply.status(400).send({
      message: error.message
    })
  }

  return reply.status(500).send ({ message: 'Internal server error' })
}