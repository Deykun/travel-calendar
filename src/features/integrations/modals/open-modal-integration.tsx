import Button from "@/components/button/button";
import { Modal } from "@/features/modal/components/modal";
import { closeModal, openModal } from "@/features/modal/stores/use-modal-store";
import useDataStore from "../stores/use-data-store";
import { Datetime } from "@/components/datetime/datetime";
import { getDataFromNomads } from "../actions/get-data-from-nomads";
import { useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
function ModalIntegration() {
  const [username, setUsername] = useState("deykun");
  const lastUpdate = useDataStore((store) => store.integration.lastUpdate);

  const handleSubmitNomads: React.SubmitEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();

    if (username) {
      await getDataFromNomads({ username });
      closeModal();
    }
  };

  return (
    <Modal title="Integration modal">
      {lastUpdate && (
        <p>
          Last update of data:
          <Datetime date={lastUpdate} />
        </p>
      )}
      <form onSubmit={handleSubmitNomads}>
        <h3>Integration with https://nomads.com</h3>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button type="submit" isDisabled={!username}>
          Update
        </Button>
      </form>
    </Modal>
  );
}

export function openModalIntegration() {
  openModal({
    modal: <ModalIntegration />,
  });
}
