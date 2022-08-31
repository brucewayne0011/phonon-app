import { IonButton, IonIcon } from "@ionic/react";
import { hammerSharp } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";
import { isValidMiningAttempt } from "../utils/validation";
import MinePhononModal from "./MinePhononModal";

const MinePhononButton: React.FC<{
  refetch;
  allMiningAttempts: PhononMiningAttempt | undefined;
}> = ({ refetch, allMiningAttempts }) => {
  const { showModal, hideModal, isModalVisible } = useModal();
  const [activeMiningAttempt, setActiveMiningAttempt] = useState<
    PhononMiningAttemptItem | undefined
  >(undefined);

  // if one status is "active", then set the active mining attempt
  useEffect(() => {
    setActiveMiningAttempt(undefined);

    miningAttemptCheck: for (const attemptId in allMiningAttempts) {
      if (isValidMiningAttempt(allMiningAttempts[attemptId])) {
        setActiveMiningAttempt(allMiningAttempts[attemptId]);
        // if we found one, abort, we only find the first
        break miningAttemptCheck;
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
        {!activeMiningAttempt ? "Mine" : "Mining..."}
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
