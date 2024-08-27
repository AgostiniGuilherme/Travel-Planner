import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button/button";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  CloseGuestsInput: () => void;
  OpenGuestsInput: () => void;
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  CloseGuestsInput,
  OpenGuestsInput,
}: DestinationAndDateStepProps) {
  return (
    <div className="h-16 bg-slate-100 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 text-black"
        />
      </div>

      <div className="flex items-center gap-2">
        <Calendar className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Quando?"
          className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none text-black"
        />
      </div>

      <div className="w-px h-6 bg-slate-100" />

      {isGuestsInputOpen ? (
        <Button onClick={CloseGuestsInput} variant="primary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={OpenGuestsInput} variant="primary">
          Continuar <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}
