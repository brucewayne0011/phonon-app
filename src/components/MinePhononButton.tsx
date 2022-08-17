import { IonButton, IonIcon, useIonToast } from "@ionic/react";
import { addSharp, lockClosedOutline, hammerSharp } from "ionicons/icons";
import React from "react";
import useChain from "../hooks/useChain";
import { useModal } from "../hooks/useModal";
import MinePhononModal from "./MinePhononModal";

const MinePhononButton: React.FC = () => {
  const { showModal, hideModal, isModalVisible } = useModal();
  const { isAuthenticated } = useChain();
  const [present] = useIonToast();

  return (
    <>
      <IonButton
        fill="outline"
        color="light"
        slot="end"
        onClick={() => {
          if (!isAuthenticated) {
            return present({
              header: "Error",
              message: "Must be authenticated with MetaMask to mine Phonons",
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
        }}
      >
        <IonIcon slot="end" icon={hammerSharp} />
        Mine
      </IonButton>
      <MinePhononModal {...{ isModalVisible, hideModal }} />
    </>
  );
};

export default MinePhononButton;
