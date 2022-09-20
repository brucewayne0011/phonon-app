import { IonButton, IonIcon, useIonToast } from "@ionic/react";
import { warning, sendSharp } from "ionicons/icons";
import React from "react";
import { useModal } from "../hooks/useModal";
import SendPhononModal from "./SendPhononModal";

const SendPhononButton: React.FC<{
  selectedPhonon: PhononDTO | undefined;
  setSelectedPhonon: React.Dispatch<
    React.SetStateAction<PhononDTO | undefined>
  >;
  isConnectedToServer: boolean;
}> = ({ selectedPhonon, setSelectedPhonon, isConnectedToServer }) => {
  const { showModal, hideModal, isModalVisible } = useModal();
  const [present] = useIonToast();

  // event to handle sending phonon
  const handleOnClick = () => {
    if (!isConnectedToServer) {
      return present({
        header: "Error",
        message: "Must be connected to the server to send!",
        icon: warning,
        duration: 2000,
        color: "danger",
        cssClass: "text-md text-center font-black uppercase",
        translucent: true,
        position: "top",
      });
    } else {
      showModal();
    }
  };

  return (
    <>
      <IonButton
        fill="outline"
        color={"primary"}
        onClick={handleOnClick}
        slot="end"
      >
        <IonIcon slot="end" icon={sendSharp} />
        Send Selected Phonon
      </IonButton>
      <SendPhononModal
        {...{
          isModalVisible,
          hideModal,
          selectedPhonon,
          setSelectedPhonon,
          isConnectedToServer,
        }}
      />
    </>
  );
};

export default SendPhononButton;
