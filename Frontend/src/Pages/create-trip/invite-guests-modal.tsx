import { AtSign, Plus, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button/button";

interface InviteGuestsModalProps {
  CloseGuestsModal: () => void;
  emailsToInvite: string[];
  AddNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
  RemoveEmailsFromInvites: (email: string) => void;
}

export function InviteGuestsModal({
  CloseGuestsModal,
  emailsToInvite,
  AddNewEmailToInvite,
  RemoveEmailsFromInvites,
}: InviteGuestsModalProps) {
  return (
    <div className="fixed inset-0 bg-white/60 flex items-center justify-center">
      <div className="w-[648px] rounded-xl py-5 px-6 shadow-shape bg-zinc-50 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-black text-lg font-semibold">
              Selecionar convidados
            </h2>
            <button type="button" onClick={CloseGuestsModal}>
              <X className="size-5 text-black" />
            </button>
          </div>
          <p className="text-sm text-zinc-700">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map((email) => {
            return (
              <div
                key={email}
                className="py-1.5 px-2.5 rounded-md bg-orange-500 flex items-center gap-2"
              >
                <span className="text-black">{email}</span>
                <button
                  type="button"
                  onClick={() => RemoveEmailsFromInvites(email)}
                >
                  <X className="size-4 text-black" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="w-full h-px bg-zinc-400" />
        <form
          onSubmit={AddNewEmailToInvite}
          className="p-2.5 bg-zinc-100 border border-black rounded-lg flex items-center gap-2"
        >
          <div className="px-2 flex items-center flex-1 gap-2">
            <AtSign className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              placeholder="Digite o e-mail do convidado"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 text-black"
            />
          </div>
          <Button type="submit" variant="primary">
            Convidar
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
