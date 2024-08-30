import { User, X } from "lucide-react";
import { Button } from "../../components/button/button";
import { FormEvent } from "react";

interface ConfirmarViagemModalProps {
  CloseConfirmarViagemModal: () => void;
  criarViagem: (event: FormEvent<HTMLFormElement>) => void;
  setCriadorEmail: (email: string) => void;
  setCriadorNome: (nome: string) => void;
}

export function ConfirmarViagemModal({
  CloseConfirmarViagemModal,
  criarViagem,
  setCriadorEmail,
  setCriadorNome,
}: ConfirmarViagemModalProps) {
  return (
    <div className="fixed inset-0 bg-white/60 flex items-center justify-center">
      <div className="w-[648px] rounded-xl py-5 px-6 shadow-shape bg-zinc-50 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-black text-lg font-semibold">
              Confirmar criação da viagem
            </h2>
            <button type="button" onClick={CloseConfirmarViagemModal}>
              <X className="size-5 text-black" />
            </button>
          </div>
          <p className="text-sm text-zinc-700">
            Para concluir a criação da viagem para
            <span className="text-black font-semibold">
              {" "}
              Guarulhos, Brasil{" "}
            </span>
            nas datas de
            <span className="text-black font-semibold">
              {" "}
              17 a 23 de Agosto de 2024{" "}
            </span>
            preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={criarViagem} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              type="text"
              name="name"
              placeholder="Seu nome completo"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={(event) => setCriadorNome(event.target.value)}
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              placeholder="Seu e-mail pessoal"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={(event) => setCriadorEmail(event.target.value)}
            />
          </div>

          <Button type="submit" variant="primary" size="full">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  );
}
