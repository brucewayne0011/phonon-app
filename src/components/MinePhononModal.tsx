import { IonButton, IonModal } from "@ionic/react";
import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { abbreviateHash } from "../utils/addresses";
import { useSession } from "../hooks/useSession";
import MinePhononStats from "./MinePhononStats";
import {
  useMinePhononMutation,
  useCancelMinePhononMutation,
} from "../store/api";
import FormErrorText from "./FormErrorText";
import { logger } from "../utils/logger";

const defaultDifficulty = 5;
const maxDifficulty = 30;

export type MindPhononFormData = {
  difficulty: number;
};

const MinePhononModal: React.FC<{
  refetch;
  isModalVisible;
  hideModal;
  activeMiningAttemptId: string | undefined;
  allMiningAttempts: PhononMiningAttempt | undefined;
}> = ({
  refetch,
  isModalVisible,
  hideModal,
  activeMiningAttemptId,
  allMiningAttempts,
}) => {
  const { sessionId } = useSession();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [forceFetch, setForceFetch] = useState(false);
  const [currentMiningAttemptId, setCurrentMiningAttemptId] = useState<
    string | undefined
  >(undefined);

  const [minePhonon, { isLoading: isMiningLoading }] = useMinePhononMutation();
  const [cancelMinePhonon, { isLoading: isCancelLoading }] =
    useCancelMinePhononMutation();
  const [difficulty, setDifficulty] = useState<number>(defaultDifficulty);
  const difficultyErrorMessage =
    "The difficulty must be between 1 and " + String(maxDifficulty) + "!";

  // form set up
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<MindPhononFormData>();

  // event when you close the modal
  const destroyModal = () => {
    setCurrentMiningAttemptId(undefined);
    setErrorMessage("");
    if (forceFetch) {
      refetch();
      setForceFetch(false);
    }
    hideModal();
  };

  // event when you start mining a phonon
  const onSubmit = async (data: MindPhononFormData, event) => {
    event.preventDefault();

    setErrorMessage("");

    await minePhonon({ sessionId, difficulty }).catch((err) => {
      logger.error(err);
      // handle error
      if (err.message) setErrorMessage(err.message);
      else if (err.data) setErrorMessage(err.data);
    });
  };

  // event when you cancel mining a phonon
  const onCancelMinePhonon = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    await cancelMinePhonon({ sessionId })
      .then(() => {
        setCurrentMiningAttemptId(undefined);
      })
      .catch((err) => {
        logger.error(err);
        // handle error
        if (err.message) setErrorMessage(err.message);
        else if (err.data) setErrorMessage(err.data);
      });
  };

  // additional actions base on current attempt status
  useEffect(() => {
    if (activeMiningAttemptId && allMiningAttempts) {
      // if there's an error display the error
      if (allMiningAttempts[activeMiningAttemptId].Status === "error") {
        setErrorMessage("There was an error, please try again.");
      } else if (
        allMiningAttempts[activeMiningAttemptId].Status === "success"
      ) {
        setForceFetch(true);
      }
    }
  }, [activeMiningAttemptId, allMiningAttempts]);

  // we only want to run this each time the modal is opened
  const modalInit = useCallback(() => {
    if (activeMiningAttemptId && isModalVisible) {
      setCurrentMiningAttemptId(activeMiningAttemptId);
    }
  }, [activeMiningAttemptId, setCurrentMiningAttemptId, isModalVisible]);

  useEffect(modalInit, [modalInit]);

  return (
    <IonModal isOpen={isModalVisible} onDidDismiss={destroyModal}>
      <div className="flex flex-col content-center justify-center h-full mx-10">
        <p className="text-xl font-bold text-center text-gray-300 uppercase">
          Phonon Mining
        </p>
        <p className="font-bold text-center text-red-400 uppercase mt-2">
          {errorMessage}
        </p>
        {allMiningAttempts && currentMiningAttemptId ? (
          <div>
            {allMiningAttempts[currentMiningAttemptId].Status === "success" ? (
              <div>
                <div className="w-24 h-24 mx-auto my-4 relative">
                  <img
                    className="w-full h-full z-50 absolute"
                    src="/assets/phonon-icon.png"
                  />
                  <img
                    className="w-full h-full animate-ping absolute"
                    src="/assets/phonon-icon.png"
                  />
                </div>

                <h3 className="text-xl text-white font-bold text-center">
                  New Phonon Mined!
                </h3>
                <h4 className="text-sm text-gray-300 mb-8 text-center">
                  Hash:{" "}
                  {abbreviateHash(
                    allMiningAttempts[currentMiningAttemptId].Hash
                  )}
                </h4>
              </div>
            ) : allMiningAttempts[currentMiningAttemptId].Status ===
              "active" ? (
              <img
                className="w-32 h-32 mx-auto mb-8"
                src="/assets/mining-phonon.gif"
              />
            ) : (
              <div className="animate-pulse text-red-600 text-2xl">
                WHELP THAT DID NOT WORK!
              </div>
            )}

            <MinePhononStats
              activeMiningAttempt={allMiningAttempts[currentMiningAttemptId]}
            />

            <div className="grid grid-cols-1 gap-x-3 mt-4">
              {allMiningAttempts[currentMiningAttemptId].Status !==
              "success" ? (
                <IonButton
                  size="large"
                  fill="solid"
                  expand="full"
                  color="light"
                  onClick={onCancelMinePhonon}
                  disabled={isCancelLoading}
                >
                  {isCancelLoading ? "CANCELING..." : "CANCEL MINING"}
                </IonButton>
              ) : (
                <IonButton
                  size="large"
                  expand="full"
                  fill="clear"
                  color="medium"
                  onClick={destroyModal}
                >
                  CLOSE
                </IonButton>
              )}
            </div>
          </div>
        ) : (
          <form
            className="flex flex-col mt-12"
            onSubmit={handleSubmit(onSubmit)}
          >
            {errors?.difficulty && (
              <FormErrorText>{difficultyErrorMessage}</FormErrorText>
            )}
            <span className="my-4 text-white">
              Set the mining difficulty. The higher the difficulty, the longer
              it will take to mine a phonon.
            </span>
            <input
              className="text-bold p-2 text-xl text-white bg-zinc-800 shadow-inner"
              placeholder="Amount"
              type="number"
              min="1"
              max={maxDifficulty}
              value={difficulty}
              disabled={!!activeMiningAttemptId}
              {...register("difficulty", {
                required: true,
                onChange: async (e) => {
                  setDifficulty(parseInt(e.currentTarget.value));
                  await trigger();
                },
                validate: (value) => {
                  return value <= maxDifficulty;
                },
              })}
            />
            <span className="text-sm text-gray-500 my-1 text-right">
              Max difficulty: {maxDifficulty}
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 mt-4">
              <IonButton
                key="submit"
                type="submit"
                size="large"
                fill="solid"
                expand="full"
                color="light"
                disabled={isMiningLoading || !!activeMiningAttemptId}
              >
                {isMiningLoading || !!activeMiningAttemptId
                  ? "STARTING MINING..."
                  : "START MINING"}
              </IonButton>

              {!isMiningLoading && !activeMiningAttemptId && (
                <IonButton
                  size="large"
                  expand="full"
                  fill="clear"
                  color="medium"
                  onClick={destroyModal}
                >
                  CANCEL
                </IonButton>
              )}
            </div>
          </form>
        )}
      </div>
    </IonModal>
  );
};

export default MinePhononModal;
