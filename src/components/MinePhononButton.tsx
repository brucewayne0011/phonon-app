import { IonButton, IonIcon, useIonToast } from "@ionic/react";
import { hammerSharp } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";
import MinePhononModal from "./MinePhononModal";

const MinePhononButton: React.FC<{
  refetch;
  allMiningAttempts: PhononMiningAttempt | undefined;
}> = ({ refetch, allMiningAttempts }) => {
  const { showModal, hideModal, isModalVisible } = useModal();
  const [activeMiningAttempt, setActiveMiningAttempt] = useState<
    PhononMiningAttemptItem | undefined
  >(undefined);

  // if one status is "active", then set the status
  useEffect(() => {
    setActiveMiningAttempt(undefined);

    for (const attemptId in allMiningAttempts) {
      if (allMiningAttempts[attemptId].Status === "active") {
        setActiveMiningAttempt(allMiningAttempts[attemptId]);
      }
    }
  }, [allMiningAttempts]);

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
            activeMiningAttempt !== undefined
              ? "motion-safe:animate-bounce"
              : ""
          }
        />
        {activeMiningAttempt !== undefined ? "Mining..." : "Mine"}
      </IonButton>
      <MinePhononModal
        {...{
          refetch,
          isModalVisible,
          hideModal,
          activeMiningAttempt,
          allMiningAttempts,
        }}
      />
    </>
  );
};

export default MinePhononButton;
