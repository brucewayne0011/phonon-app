import { IonButton, IonIcon, useIonToast } from "@ionic/react";
import { lockClosedOutline, sendSharp } from "ionicons/icons";
import React from "react";
import { useIsConnected } from "../hooks/useIsConnected";
import { useModal } from "../hooks/useModal";
import SendPhononModal from "./SendPhononModal";

const SendPhononButton: React.FC<{
  phonon: PhononDTO;
  selectedPhonon: PhononDTO | undefined;
  setSelectedPhonon: React.Dispatch<
    React.SetStateAction<PhononDTO | undefined>
  >;
}> = ({ phonon, selectedPhonon, setSelectedPhonon }) => {
  const { showModal, hideModal, isModalVisible } = useModal();
  const { isConnected } = useIsConnected();
  const [present] = useIonToast();

  // event to handle sending phonon
  const handleOnClick = () => {
    if (!isConnected) {
      return present({
        header: "Error",
        message: "Must be connected to send",
        icon: lockClosedOutline,
        duration: 2000,
        color: "danger",
        cssClass: "text-md text-center font-black uppercase",
        translucent: true,
        position: "top",
      });
    }
    if (!phonon) {
      return present({
        header: "Error",
        message: "Must select a Phonon to send",
        icon: lockClosedOutline,
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
      {phonon ? (
        <SendPhononModal
          {...{
            isModalVisible,
            hideModal,
            phonon,
            selectedPhonon,
            setSelectedPhonon,
          }}
        />
      ) : null}
    </>
  );
};

export default SendPhononButton;
