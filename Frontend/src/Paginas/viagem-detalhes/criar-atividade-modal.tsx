import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button/button";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface CreateActivityModalProps {
  CloseCreateActivityModal: () => void;
}
export function CreateActivityModal({
  CloseCreateActivityModal,
}: CreateActivityModalProps) {
  const { idViagem } = useParams();

  async function CreateActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const titulo = data.get("titulo")?.toString();
    const ocorre_em = data.get("ocorre_em")?.toString();
    await api.post(`/viagem/${idViagem}/atividades`, { titulo, ocorre_em });
    window.document.location.reload();
  }
  return (
    <div className="fixed inset-0 bg-white/60 flex items-center justify-center">
      <div className="w-[648px] rounded-xl py-5 px-6 shadow-shape bg-zinc-50 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-black text-lg font-semibold">
              Cadastrar atividade
            </h2>
            <button type="button" onClick={CloseCreateActivityModal}>
              <X className="size-5 text-black" />
            </button>
          </div>
          <p className="text-sm text-zinc-700">
            Todos convidados podem visualizar as atividades.
          </p>

          <form onSubmit={CreateActivity} className="space-y-3">
            <div className="h-14 px-4 bg-white border border-black rounded-lg flex items-center gap-2">
              <Tag className="text-zinc-400 size-5" />
              <input
                name="titulo"
                placeholder="Qual a atividade?"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 text-black"
              />
            </div>

            <div className="h-14 flex-1 px-4 bg-white border border-black rounded-lg flex items-center gap-2">
              <Calendar className="text-zinc-400 size-5" />
              <input
                type="datetime-local"
                name="ocorre_em"
                placeholder="Data e horário da atividade"
                className="bg-transparent text-zinc-400 text-lg placeholder-zinc-400 outline-none flex-1"
              />
            </div>
            <Button variant="primary" size="full">
              Salvar atividade
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
