import { ClientError } from "../errors/clientError";
import { confirmarMembroRepository } from "../repositories/confirmarMembroRepository";

export async function confirmarMembroService(idMembro: string) {
  const membro = await confirmarMembroRepository.encontrar(idMembro);

  if (!membro) {
    throw new ClientError('Membro não encontrado');
  }

  if (membro.esta_confirmado) {
    return membro.viagem_id;
  }

  await confirmarMembroRepository.confirmar(idMembro);
  
  return membro.viagem_id;
}
