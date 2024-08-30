import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/button";

export function MenuPage() {
  const navigate = useNavigate();

  function CriarUmaViagem() {
    navigate("/viagem");
  }
  function Sair() {
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <img
            className="w-24 h-24 border border-zinc-300 rounded-full"
            src=""
            alt="Imagem de perfil"
          />
          <div>
            <p className="text-lg font-semibold">Bem-vindo Usuário!</p>
            <p className="text-sm">Organize-se e seja feliz!</p>
          </div>
        </div>
        <Button onClick={Sair} className="" type="button" variant="primary">
          Sair
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="w-full flex justify-center px-32 mt-4">
          <h2 className="text-3xl font-semibold mb-8">
            Escolha o que deseja fazer:
          </h2>
        </div>
        <div className="flex flex-col w-full max-w-xl px-6 items-center justify-center gap-6 mt-8">
          <div className="flex flex-col w-full max-w-xl px-32 items-center justify-center gap-10">
            <Button
              onClick={CriarUmaViagem}
              className="w-full mt-6 px-12 py-5"
              type="submit"
              variant="primary"
              size="full"
            >
              Criar uma viagem
            </Button>
            <Button
              className="w-full mt-4 px-12 py-5"
              type="submit"
              variant="primary"
              size="full"
            >
              Administrar viagens criadas
            </Button>
            <Button
              className="w-full mt-4 px-12 py-5"
              type="submit"
              variant="primary"
              size="full"
            >
              Acessar minhas viagens
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
