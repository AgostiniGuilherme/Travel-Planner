import { Button } from "../../components/button/button";

export function CadastroPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full flex justify-between items-start px-32 mt-4">
        <h2 className="text-3xl font-semibold">Cadastre seus dados:</h2>
        <div className="flex items-center gap-4">
          <p className="text-lg text-white">Ícone de perfil:</p>
          <img
            className="w-24 h-24 border border-zinc-300"
            src=""
            alt="Imagem de perfil"
          />
        </div>
      </div>
      <div className="flex flex-col w-full max-w-lg px-6 items-center justify-center gap-6 mt-8">
        <div className="w-full">
          <p className="text-left mb-1">Nome:</p>
          <input
            className="bg-white text-base placeholder-zinc-400 border border-zinc-300 outline-none rounded-lg w-full text-black p-3"
            type="text"
            placeholder="Seu nome"
          />
        </div>
        <div className="w-full">
          <p className="text-left mb-1">E-mail:</p>
          <input
            className="bg-white text-base placeholder-zinc-400 border border-zinc-300 outline-none rounded-lg w-full text-black p-3"
            type="email"
            name="email"
            placeholder="Seu e-mail"
          />
        </div>
        <div className="w-full">
          <p className="text-left mb-1">Senha:</p>
          <input
            className="bg-white text-base placeholder-zinc-400 border border-zinc-300 outline-none rounded-lg w-full text-black p-3"
            type="password"
            name="senha"
            placeholder="Sua senha"
          />
        </div>
        <Button
          className="w-full mt-4 px-8 py-4"
          type="submit"
          variant="primary"
        >
          Cadastrar
        </Button>
      </div>
    </div>
  );
}
