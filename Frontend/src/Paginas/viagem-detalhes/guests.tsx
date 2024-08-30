import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button/button";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../lib/axios";

interface Membros {
  id_membro: string;
  nome: string | null;
  email: string;
  esta_confirmado: boolean;
}
export function Guests() {
  const { idViagem } = useParams();
  const [membros, setMembros] = useState<Membros[]>([]);
  useEffect(() => {
    api
      .get(`/viagem/${idViagem}/membros`)
      .then((response) => setMembros(response.data.viagem));
  }, [idViagem]);
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {membros?.map((membro, index) => {
          return (
            <div
              key={membro.id_membro}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-white">
                  {membro.nome ?? `Convidado ${index}`}
                </span>
                <span className="block text-sm text-white truncate">
                  {membro.email}
                </span>
              </div>
              {membro.esta_confirmado ? (
                <CheckCircle2 className="text-green-500 size-5 shrink-0" />
              ) : (
                <CircleDashed className="text-white size-5 shrink-0" />
              )}
            </div>
          );
        })}
      </div>
      <Button variant="primary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  );
}
