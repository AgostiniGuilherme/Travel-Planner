import { CircleCheck, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format, parseISO } from "date-fns";
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
  const [editandoAtividade, setEditandoAtividade] = useState<string | null>(null);
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novoHorario, setNovoHorario] = useState("");

  useEffect(() => {
    api
      .get(`/viagem/${idViagem}/atividades`)
      .then((response) => setAtividades(response.data.atividades));
  }, [idViagem]);

  function CloseActivity(categoriaIndex: number, atividadeId: string) {
    api
      .delete(`/viagem/${idViagem}/atividades/${atividadeId}`)
      .then(() => {
        setAtividades((prevAtividades) => {
          const newAtividades = [...prevAtividades];
          const categoria = newAtividades[categoriaIndex];
          categoria.atividades = categoria.atividades.filter(
            (atividade) => atividade.id_atividade !== atividadeId
          );
          return newAtividades;
        });
      })
      .catch((error) => {
        console.error("Erro ao excluir atividade:", error);
      });
  }

  function iniciarEdicao(atividade: { id_atividade: string; titulo: string; ocorre_em: string }) {
    setEditandoAtividade(atividade.id_atividade);
    setNovoTitulo(atividade.titulo);
    setNovoHorario(atividade.ocorre_em);
  }

  function salvarEdicao(categoriaIndex: number, atividadeId: string) {
    setAtividades((prevAtividades) => {
      const newAtividades = [...prevAtividades];
      const categoria = newAtividades[categoriaIndex];
      const atividade = categoria.atividades.find((a) => a.id_atividade === atividadeId);
      if (atividade) {
        atividade.titulo = novoTitulo;
        atividade.ocorre_em = novoHorario;
      }
      return newAtividades;
    });
    setEditandoAtividade(null);
  }

  return (
    <div className="space-y-8">
      {atividades.map((categoria, categoriaIndex) => {
        const date = parseISO(categoria.data);
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
                {categoria.atividades.map((atividade) => {
                  const hora = parseISO(atividade.ocorre_em);
                  return (
                    <div key={atividade.id_atividade} className="space-y-2.5">
                      {editandoAtividade === atividade.id_atividade ? (
                        <div className="px-4 py-2.5 bg-white rounded-xl shadow-shape flex items-center ">
                          <input
                            type="text"
                            value={novoTitulo}
                            onChange={(e) => setNovoTitulo(e.target.value)}
                            className="text-black flex-1"
                          />
                          <input
                            type="time"
                            value={novoHorario}
                            onChange={(e) => setNovoHorario(e.target.value)}
                            className="text-black text-sm ml-auto"
                          />
                          <button
                            type="button"
                            onClick={() => salvarEdicao(categoriaIndex, atividade.id_atividade)}
                          >
                            Salvar
                          </button>
                        </div>
                      ) : (
                        <div
                          className="px-4 py-2.5 bg-white rounded-xl shadow-shape flex items-center "
                          onDoubleClick={() => iniciarEdicao(atividade)}
                        >
                          <CircleCheck className="size-5 text-orange-500" />
                          <span className="text-black">{atividade.titulo}</span>
                          <span className="text-black text-sm ml-auto">
                            {format(hora, 'HH:mm')}h
                          </span>
                          <button
                            type="button"
                            onClick={() => CloseActivity(categoriaIndex, atividade.id_atividade)}
                          >
                            <X className="size-5 text-black" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-white text-sm">
                Nenhuma atividade cadastrada nessa data.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
