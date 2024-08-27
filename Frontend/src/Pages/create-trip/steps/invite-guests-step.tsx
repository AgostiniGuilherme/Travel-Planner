import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button/button";

interface InviteGuestsStepProps {
  OpenGuestsModal: () => void;
  emailsToInvite: string[];
  OpenConfirmTripModal: () => void;
}
export function InviteGuestsStep({
  OpenGuestsModal,
  emailsToInvite,
  OpenConfirmTripModal,
}: InviteGuestsStepProps) {
  return (
    <div className="h-16 bg-slate-100 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <button
        type="button"
        onClick={OpenGuestsModal}
        className="flex items-center gap-2 flex-1"
      >
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className="text-zinc-500 text-lg flex-1 text-left">
            {emailsToInvite.length} pessoa(s) convidada(s)
          </span>
        ) : (
          <span className="text-zinc-400 text-lg flex-1 text-left">
            Quem estará na viagem?
          </span>
        )}
      </button>

      <div className="w-px h-6 bg-slate-100" />

      <Button onClick={OpenConfirmTripModal} variant="primary">
        Confirmar viagem <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}
