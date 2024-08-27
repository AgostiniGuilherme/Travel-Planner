import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";
export function CreateTripPage() {
  const navigate = useNavigate();
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState(["matheus@gmail.com"]);
  const [isConfirmTripModalOpen, setConfirmTripModalOpen] = useState(false);

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

  function OpenConfirmTripModal() {
    setConfirmTripModalOpen(true);
  }

  function CloseConfirmTripModal() {
    setConfirmTripModalOpen(false);
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

  function createTrip() {
    navigate("/trips/123");
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
          <DestinationAndDateStep
            CloseGuestsInput={CloseGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            OpenGuestsInput={OpenGuestsInput}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              OpenGuestsModal={OpenGuestsModal}
              emailsToInvite={emailsToInvite}
              OpenConfirmTripModal={OpenConfirmTripModal}
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
        <InviteGuestsModal
          emailsToInvite={emailsToInvite}
          AddNewEmailToInvite={AddNewEmailToInvite}
          CloseGuestsModal={CloseGuestsModal}
          RemoveEmailsFromInvites={RemoveEmailsFromInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          CloseConfirmTripModal={CloseConfirmTripModal}
          createTrip={createTrip}
        />
      )}
    </div>
  );
}
