import { CircleCheck } from "lucide-react";

export function Activities() {
  return (
    <div className="space-y-8">
      <div className="space-y-2.5">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl text-white font-semibold">Dia 17</span>
          <span className="text-xs text-white">Sábado</span>
        </div>
        <p className="text-white text-sm">
          Nenhuma atividade cadastrada nessa data.
        </p>
      </div>

      <div className="space-y-2.5">
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
      </div>
    </div>
  );
}
