import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/button";

export function LoginPage() {
  const navigate = useNavigate();

  function CriarCadastro() {
    navigate("/cadastro");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full flex justify-center px-32 mt-4">
        <h2 className="text-3xl font-semibold mb-8">Acesse sua conta</h2>
      </div>
      <div className="flex flex-col w-full max-w-xl px-6 items-center justify-center gap-6 mt-8">
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
        <div className="flex flex-col w-full max-w-xl px-32 items-center justify-center gap-4">
          <Button
            className="w-full mt-6 px-12 py-5"
            type="submit"
            variant="primary"
            size="full"
          >
            Entrar
          </Button>
          <Button
            className="w-full mt-4 px-12 py-5"
            type="submit"
            variant="primary"
            size="full"
          >
            Esqueci a senha
          </Button>
        </div>
        <div className="flex flex-col w-full max-w-xl px-32 items-center justify-center gap-2">
          <span className="text-zinc-400">Não possui uma conta?</span>
          <button
            onClick={CriarCadastro}
            className="underline text-white hover:text-zinc-400"
          >
            Clique aqui e cadastre-se
          </button>
        </div>
      </div>
    </div>
  );
}
