import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button/button";

export function DestinationAndDateHeader() {
  return (
    <div className="px-4 h-16 rounded-xl bg-white shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-black" />
        <span className="text-black">Guarulhos, Brasil</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-black" />
          <span className="text-black">17 a 23 de agosto</span>
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
