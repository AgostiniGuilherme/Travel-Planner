import { CircleCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Atividade {
  date: string;
  atividades: {
    id: string;
    title: string;
    occurs_at: string;
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
      {atividades.map((categoria) => {
        return (
          <div key={categoria.date} className="space-y-2.5">
            <div className="flex gap-2 items-baseline">
              <span className="text-xl text-white font-semibold">
                Dia {format(categoria.date, "d")}
              </span>
              <span className="text-xs text-white">
                {format(categoria.date, "EEEE", { locale: ptBR })}
              </span>
            </div>
            {categoria.atividades.length > 0 ? (
              <div>
                {categoria.atividades.map((atividade) => {
                  return (
                    <div key={atividade.id} className="space-y-2.5">
                      <div className="px-4 py-2.5 bg-white rounded-xl shadow-shape flex items center ">
                        <CircleCheck className="size-5 text-orange-500" />
                        <span className="text-black">{atividade.title}</span>
                        <span className="text-black text-sm ml-auto">
                          {format(atividade.occurs_at, "HH:mm")}h
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

      {/*<div className="space-y-2.5">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl text-white font-semibold">Dia 18</span>
          <span className="text-xs text-white">Domingo</span>
        </div>
        <div className="space-y-2.5">
          <div className="px-4 py-2.5 bg-white rounded-xl shadow-shape flex items center ">
            <CircleCheck className="size-5 text-orange-500" />
            <span className="text-black">Academia em grupo</span>
            <span className="text-black text-sm ml-auto">08:00h</span>
          </div>
        </div>
        <div className="space-y-2.5">
          <div className="px-4 py-2.5 bg-white rounded-xl shadow-shape flex items center ">
            <CircleCheck className="size-5 text-orange-500" />
            <span className="text-black">Academia em grupo</span>
            <span className="text-black text-sm ml-auto">08:00h</span>
          </div>
        </div>
      </div>*/}
    </div>
  );
}
