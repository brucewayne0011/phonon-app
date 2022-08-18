import { IonButton, IonIcon, useIonToast } from "@ionic/react";
import { hammerSharp } from "ionicons/icons";
import React from "react";
import { useModal } from "../hooks/useModal";
import MinePhononModal from "./MinePhononModal";

const MinePhononButton: React.FC<{
  miningStatus: PhononMiningStatus | undefined;
}> = ({ miningStatus }) => {
  const { showModal, hideModal, isModalVisible } = useModal();

  return (
    <>
      <IonButton
        fill="outline"
        color="light"
        slot="end"
        onClick={() => {
          showModal();
        }}
      >
        <IonIcon
          slot="end"
          icon={hammerSharp}
          className={
            miningStatus?.Status === "Active"
              ? "motion-safe:animate-bounce"
              : ""
          }
        />
        {miningStatus?.Status === "Active" ? "Mining..." : "Mine"}
      </IonButton>
      <MinePhononModal {...{ isModalVisible, hideModal, miningStatus }} />
    </>
  );
};

export default MinePhononButton;
