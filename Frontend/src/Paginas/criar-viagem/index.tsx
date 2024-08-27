import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConvidarMembrosModal } from "./convidar-membros-modal";
import { ConfirmarViagemModal } from "./confirmar-viagem-modal";
import { DestinoEDataPasso } from "./passos/destino-e-data-passo";
import { InviteGuestsStep } from "./passos/convidar-membros-passo";
export function CriarViagemPage() {
  const navigate = useNavigate();
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState(["matheus@gmail.com"]);
  const [isConfirmarViagemModalOpen, setConfirmarViagemModalOpen] = useState(false);

  function OpenGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function CloseGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function OpenGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function CloseGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function OpenConfirmarViagemModal() {
    setConfirmarViagemModalOpen(true);
  }

  function CloseConfirmarViagemModal() {
    setConfirmarViagemModalOpen(false);
  }

  function AddNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return;
    }

    setEmailsToInvite([...emailsToInvite, email]);
    event.currentTarget.reset();
  }

  function RemoveEmailsFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove
    );

    setEmailsToInvite(newEmailList);
  }

  function criarViagem() {
    navigate("/viagem/123");
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="Travel Planner.io" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinoEDataPasso
            CloseGuestsInput={CloseGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            OpenGuestsInput={OpenGuestsInput}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              OpenGuestsModal={OpenGuestsModal}
              emailsToInvite={emailsToInvite}
              OpenConfirmarViagemModal={OpenConfirmarViagemModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela TravelPlanner.io você automaticamente
          concorda <br />
          com nossos
          <a className="text-zinc-300 underline" href="#">
            termos de uso
          </a>
          e
          <a className="text-zinc-300 underline" href="#">
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      {isGuestsModalOpen && (
        <ConvidarMembrosModal
          emailsToInvite={emailsToInvite}
          AddNewEmailToInvite={AddNewEmailToInvite}
          CloseGuestsModal={CloseGuestsModal}
          RemoveEmailsFromInvites={RemoveEmailsFromInvites}
        />
      )}

      {isConfirmarViagemModalOpen && (
        <ConfirmarViagemModal
          CloseConfirmarViagemModal={CloseConfirmarViagemModal}
          criarViagem={criarViagem}
        />
      )}
    </div>
  );
}
