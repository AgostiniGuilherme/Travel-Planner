import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format } from "date-fns";

interface Viagem {
  id: string;
  destino: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export function DestinationAndDateHeader() {
  const { idViagem } = useParams();
  const [viagem, setViagem] = useState<Viagem | undefined>();
  useEffect(() => {
    api
      .get(`/viagem/${idViagem}`)
      .then((response) => setViagem(response.data.viagem));
  }, [idViagem]);

  const displayedAndDate = viagem
    ? format(viagem.starts_at, "d ' de ' LLL")
        .concat(" até ")
        .concat(format(viagem.ends_at, "d ' de ' LLL"))
    : null;

  return (
    <div className="px-4 h-16 rounded-xl bg-white shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-black" />
        <span className="text-black">{viagem?.destino}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-black" />
          <span className="text-black">{displayedAndDate}</span>
        </div>

        <div className="w-px h-6 bg-slate-300" />

        <Button variant="primary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  );
}
