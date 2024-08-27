import { X } from "lucide-react";
import { Button } from "../../components/button/button";

interface ConfirmTripModalProps {
  CloseConfirmTripModal: () => void;
  createTrip: () => void;
}

export function ConfirmTripModal({
  CloseConfirmTripModal,
  createTrip,
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 bg-white/60 flex items-center justify-center">
      <div className="w-[648px] rounded-xl py-5 px-6 shadow-shape bg-zinc-50 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-black text-lg font-semibold">
              Confirmar criação da viagem
            </h2>
            <button type="button" onClick={CloseConfirmTripModal}>
              <X className="size-5 text-black" />
            </button>
          </div>
          <p className="text-sm text-zinc-700">
            Para concluir a criação da viagem para
            <span className="text-black font-semibold">Guarulhos, Brasil</span>
            nas datas de
            <span className="text-black font-semibold">
              17 a 23 de Agosto de 2024
            </span>
            clique abaixo:
          </p>
          <Button
            onClick={createTrip}
            type="submit"
            variant="primary"
            size="full"
          >
            Confirmar criação da viagem
          </Button>
        </div>
      </div>
    </div>
  );
}
