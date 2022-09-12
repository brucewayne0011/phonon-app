import React from "react";
import { IonIcon } from "@ionic/react";
import { useModal } from "../hooks/useModal";

import NameSessionModal from "./NameSessionModal";
import { pencilOutline } from "ionicons/icons";
import { useSession } from "../hooks/useSession";

export default function SessionNameHeader() {
  const { showModal, hideModal, isModalVisible } = useModal();
  const { sessionName } = useSession();

  const handleOnClick = () => {
    showModal();
  };

  return (
    <>
      <div
        className="flex my-5 justify-center items-center cursor-pointer"
        onClick={handleOnClick}
      >
        <h1 className="text-2xl">{sessionName}</h1>
        <span className="ml-2 text-xs bg-white px-2 py-1 text-black rounded-sm flex items-center gap-x-2">
          <IonIcon icon={pencilOutline} slot="start" /> EDIT
        </span>
      </div>

      <NameSessionModal {...{ isModalVisible, hideModal }} />
    </>
  );
}
