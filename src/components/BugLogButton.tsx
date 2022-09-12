import { IonButton, IonIcon } from "@ionic/react";
import { bug } from "ionicons/icons";
import React from "react";
import { useModal } from "../hooks/useModal";
import BugLogModal from "./BugLogModal";

export default function BugLogButton() {
  const { showModal, hideModal, isModalVisible } = useModal();

  return (
    <div>
      <IonButton fill="outline" color="danger" onClick={showModal}>
        <IonIcon slot="end" icon={bug} />
        Report a Bug
      </IonButton>
      <BugLogModal {...{ isModalVisible, hideModal }} />
    </div>
  );
}
