import { CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button/button";

export function Guests() {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-white">Pedro Almeida</span>
            <span className="block text-sm text-white truncate">
              pedro.almeida_92@gmail.com
            </span>
          </div>
          <CircleDashed className="text-white size-5 shrink-0" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-white">Maria Silva</span>
            <span className="block text-sm text-white truncate">
              maria.silva1985@yahoo.com
            </span>
          </div>
          <CircleDashed className="text-white size-5 shrink-0" />
        </div>
      </div>
      <Button variant="primary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  );
}
