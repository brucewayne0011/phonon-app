import { IonButton, IonIcon } from "@ionic/react";
import { hammerSharp } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";
import { isValidMiningAttempt } from "../utils/validation";
import MinePhononModal from "./MinePhononModal";
import { useMinePhononStatusQuery } from "../store/api";

const MinePhononButton: React.FC<{
  refetch;
  sessionId;
}> = ({ refetch, sessionId }) => {
  const { showModal, hideModal, isModalVisible } = useModal();
  const [activeMiningAttemptId, setActiveMiningAttemptId] = useState<
    string | undefined
  >(undefined);

  const { data: allMiningAttempts } = useMinePhononStatusQuery(
    { sessionId },
    { pollingInterval: 1000 }
  );

  // if one status is "active", then set the active mining attempt
  useEffect(() => {
    setActiveMiningAttemptId(undefined);

    miningAttemptCheck: for (const attemptId in allMiningAttempts) {
      if (isValidMiningAttempt(allMiningAttempts[attemptId])) {
        setActiveMiningAttemptId(attemptId);
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
            activeMiningAttemptId !== undefined
              ? "motion-safe:animate-bounce"
              : ""
          }
        />
        {!activeMiningAttemptId ? "Mine" : "Mining..."}
      </IonButton>
      <MinePhononModal
        {...{
          refetch,
          isModalVisible,
          hideModal,
          activeMiningAttemptId,
          allMiningAttempts,
        }}
      />
    </>
  );
};

export default MinePhononButton;
