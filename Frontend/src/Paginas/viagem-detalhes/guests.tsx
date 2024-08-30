import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button/button";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../lib/axios";

interface participantes {
  id: string;
  nome: string | null;
  email: string;
  esta_confirmado: boolean;
}
export function Guests() {
  const { idViagem } = useParams();
  const [participantes, setParticipantes] = useState<participantes[]>([]);
  useEffect(() => {
    api
      .get(`/viagem/${idViagem}/participantes`)
      .then((response) => setParticipantes(response.data.viagem));
  }, [idViagem]);
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {participantes.map((participante, index) => {
          return (
            <div
              key={participante.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-white">
                  {participante.nome ?? `Convidado ${index}`}
                </span>
                <span className="block text-sm text-white truncate">
                  {participante.email}
                </span>
              </div>
              {participante.esta_confirmado ? (
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
