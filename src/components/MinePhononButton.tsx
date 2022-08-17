import { IonButton, IonIcon, useIonToast } from "@ionic/react";
import { addSharp, lockClosedOutline, hammerSharp } from "ionicons/icons";
import React from "react";
import useChain from "../hooks/useChain";
import { useModal } from "../hooks/useModal";
import CreatePhononModal from "./CreatePhononModal";

export default function MinePhononButton() {
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
            alert("TODO!");
          }
        }}
      >
        <IonIcon slot="end" icon={hammerSharp} />
        Mine
      </IonButton>
      <CreatePhononModal {...{ isModalVisible, hideModal }} />
    </>
  );
}
