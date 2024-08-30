import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { format } from "date-fns";

interface DestinoEDataPassoProps {
  isGuestsInputOpen: boolean;
  CloseGuestsInput: () => void;
  OpenGuestsInput: () => void;
  setDestino: (destino: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
  eventStartAndEndDates: DateRange | undefined;
}

export function DestinoEDataPasso({
  isGuestsInputOpen,
  CloseGuestsInput,
  OpenGuestsInput,
  setDestino,
  setEventStartAndEndDates,
  eventStartAndEndDates,
}: DestinoEDataPassoProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function OpenDatePicker() {
    return setIsDatePickerOpen(true);
  }
  function CloseDatePicker() {
    return setIsDatePickerOpen(false);
  }
  const displayedAndDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d ' de ' LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDates.to, "d ' de ' LLL"))
      : null;
  return (
    <div className="h-16 bg-slate-100 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 text-black"
          onChange={(event) => setDestino(event.target.value)}
        />
      </div>

      <button
        onClick={OpenDatePicker}
        disabled={isGuestsInputOpen}
        className="flex items-center gap-2 text-left w-[240px]"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-400 w-40 flex-1">
          {displayedAndDate || "Quando?"}
        </span>
      </button>
      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-white/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button type="button" onClick={CloseDatePicker}>
                  <X className="size-5 text-white" />
                </button>
              </div>
            </div>
            <DayPicker
              mode="range"
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
            />
          </div>
        </div>
      )}

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
