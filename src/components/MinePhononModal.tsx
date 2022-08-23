import { IonButton, IonModal } from "@ionic/react";
import React, { useEffect, useState } from "react";
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
  activeMiningAttempt: PhononMiningAttemptItem | undefined;
  allMiningAttempts: PhononMiningAttempt | undefined;
}> = ({
  refetch,
  isModalVisible,
  hideModal,
  activeMiningAttempt,
  allMiningAttempts,
}) => {
  const { sessionId } = useSession();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [currentAttemptId, setCurrentAttemptId] = useState<string | undefined>(
    undefined
  );
  const [currentAttempt, setCurrentAttempt] = useState<
    PhononMiningAttemptItem | undefined
  >(undefined);
  const [forceFetch, setForceFetch] = useState(false);

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
    setCurrentAttemptId(undefined);
    setCurrentAttempt(undefined);
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

    await minePhonon({ sessionId, difficulty })
      .then((response) => {
        if ("data" in response) {
          setCurrentAttemptId(response.data.AttemptId);
        }
      })
      .catch((err) => {
        logger.error(err);
        // handle error
        if (err.message) setErrorMessage(err.message);
        else if (err.data) setErrorMessage(err.data);
      });
  };

  // event when you cancel mining a phonon
  const onCancelMinePhonon = async (event) => {
    event.preventDefault();

    await cancelMinePhonon({ sessionId })
      .then(() => {
        setCurrentAttemptId(undefined);
      })
      .catch((err) => {
        logger.error(err);
        // handle error
        if (err.message) setErrorMessage(err.message);
        else if (err.data) setErrorMessage(err.data);
      });
  };

  // let's set the current attempt
  useEffect(() => {
    if (allMiningAttempts !== undefined && currentAttemptId !== undefined) {
      setCurrentAttempt(allMiningAttempts[currentAttemptId]);
    } else if (activeMiningAttempt !== undefined) {
      setCurrentAttempt(activeMiningAttempt);
    }
  }, [currentAttemptId, activeMiningAttempt, allMiningAttempts]);

  // additional actions base on current attempt status
  useEffect(() => {
    if (currentAttempt !== undefined) {
      if (currentAttempt.Status === "error") {
        setErrorMessage("There was an error, please try again.");
      } else if (currentAttempt.Status === "success") {
        setForceFetch(true);
      }
    }
  }, [currentAttempt]);

  return (
    <IonModal isOpen={isModalVisible} onDidDismiss={destroyModal}>
      <div className="flex flex-col content-center justify-center h-full mx-10">
        <p className="text-xl font-bold text-center text-gray-300 uppercase">
          Phonon Mining
        </p>
        <p className="font-bold text-center text-red-400 uppercase mt-2">
          {errorMessage}
        </p>
        {currentAttempt !== undefined ? (
          <div>
            {currentAttempt.Status === "success" ? (
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

                <h3 className="text-xl font-bold text-center">
                  New Phonon Mined!
                </h3>
                <h4 className="text-sm text-gray-300 mb-8 text-center">
                  Hash: {abbreviateHash(currentAttempt.Hash)}
                </h4>
              </div>
            ) : currentAttempt.Status === "active" ? (
              <img
                className="w-32 h-32 mx-auto mb-8"
                src="/assets/mining-phonon.gif"
              />
            ) : (
              <div className="animate-pulse text-red-600 text-2xl">
                WHELP THAT DID NOT WORK!
              </div>
            )}

            <MinePhononStats currentAttempt={currentAttempt} />

            <div className="grid grid-cols-1 gap-x-3 mt-4">
              {currentAttempt.Status !== "success" ? (
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
            <span className="my-4">
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
              disabled={currentAttempt !== undefined}
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
                disabled={isMiningLoading || currentAttemptId !== undefined}
              >
                {isMiningLoading || currentAttemptId !== undefined
                  ? "STARTING MINING..."
                  : "START MINING"}
              </IonButton>

              {!isMiningLoading && currentAttemptId === undefined && (
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
