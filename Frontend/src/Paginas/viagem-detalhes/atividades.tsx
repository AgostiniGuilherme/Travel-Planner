import { CircleCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Atividade {
  data: string;
  atividades: {
    id_atividade: string;
    titulo: string;
    ocorre_em: string;
  }[];
}

export function Atividades() {
  const { idViagem } = useParams();
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  useEffect(() => {
    api
      .get(`/viagem/${idViagem}/atividades`)
      .then((response) => setAtividades(response.data.atividades));
  }, [idViagem]);
  return (
    <div className="space-y-8">
      {atividades.map(categoria => {
        const date = new Date(categoria.data);
        return (
          <div key={categoria.data} className="space-y-2.5">
            <div className="flex gap-2 items-baseline">
              <span className="text-xl text-white font-semibold">
                Dia {format(date, 'd')}
              </span>
              <span className="text-xs text-white">
                {format(date, 'EEEE', { locale: ptBR })}
              </span>
            </div>
            {categoria.atividades.length > 0 ? (
              <div>
                {categoria.atividades.map(atividade => {
                  const hora = new Date(atividade.ocorre_em);
                  return (
                    <div key={atividade.id_atividade} className="space-y-2.5">
                      <div className="px-4 py-2.5 bg-white rounded-xl shadow-shape flex items-center ">
                        <CircleCheck className="size-5 text-orange-500" />
                        <span className="text-black">{atividade.titulo}</span>
                        <span className="text-black text-sm ml-auto">
                          {format(hora, 'HH:mm')}h
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-white text-sm">
                {" "}
                Nenhuma atividade cadastrada nessa data.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
