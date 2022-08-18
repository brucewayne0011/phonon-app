import { IonButton, IonModal } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useChainByCurrencyType from "../hooks/useChainByCurrencyType";
import { CHAINS } from "../constants/chains";
import useChain from "../hooks/useChain";
import { abbreviateHash } from "../utils/addresses";
import { useSession } from "../hooks/useSession";
import {
  useMinePhononMutation,
  useCancelMinePhononMutation,
} from "../store/api";
import FormErrorText from "./FormErrorText";
import { logger } from "../utils/logger";

export type MindPhononFormData = {
  difficulty: number;
};

const MinePhononModal: React.FC<{
  isModalVisible;
  hideModal;
  miningStatus: PhononMiningStatus | undefined;
}> = ({ isModalVisible, hideModal, miningStatus }) => {
  const { sessionId } = useSession();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showMiningResults, setShowMiningResults] = useState<boolean>(false);
  const [showMining, setShowMining] = useState<boolean>(false);
  const [miningStats, setMiningStats] = useState<PhononMiningStats>([]);
  const [minePhonon, { isLoading: isMiningLoading }] = useMinePhononMutation();
  const [cancelMinePhonon, { isLoading: isCancelLoading }] =
    useCancelMinePhononMutation();
  const [difficulty, setDifficulty] = useState<number>(5);
  const { chain } = useChain();
  const maxDifficulty = 30;
  const difficultyErrorMessage =
    "The difficulty must be between 1 and " + String(maxDifficulty) + "!";

  const destroyModal = () => {
    setErrorMessage("");
    hideModal();
    setShowMiningResults(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<MindPhononFormData>();

  const onSubmit = async (data: MindPhononFormData, event) => {
    event.preventDefault();

    await minePhonon({ sessionId, difficulty })
      .then((response) => {
        setShowMiningResults(true);
      })
      .catch((err) => {
        logger.error(err);
        // handle error
        console.log(err);
      });
  };

  const onCancelMinePhonon = async (event) => {
    event.preventDefault();

    await cancelMinePhonon({ sessionId }).catch((err) => {
      logger.error(err);
      // handle error
      console.log(err);
    });
  };

  useEffect(() => {
    setMiningStats([
      {
        Name: "Attempts",
        Stat:
          miningStatus?.Attempts !== undefined ? miningStatus?.Attempts : "",
        SubText: "",
      },
      {
        Name: "Time Elapsed",
        Stat:
          miningStatus?.TimeElapsed !== undefined
            ? String(miningStatus.TimeElapsed) + " seconds"
            : "",
        SubText: miningStatus?.StartTime
          ? "Since: " + String(miningStatus?.StartTime)
          : "",
      },
      {
        Name: "Avg. Time",
        Stat: miningStatus?.AverageTime ? miningStatus?.AverageTime : "",
        SubText: "",
      },
    ]);
  }, [miningStatus]);

  useEffect(() => {
    setShowMining(miningStatus?.Status === "Active" || showMiningResults);
  }, [miningStatus, showMiningResults]);

  return (
    <IonModal isOpen={isModalVisible} onDidDismiss={destroyModal}>
      <div className="flex flex-col content-center justify-center h-full mx-10">
        <p className="text-xl font-bold text-center text-gray-300 uppercase">
          {chain?.name} Phonon Mining
        </p>
        <p className="font-bold text-center text-red-400 uppercase mt-2">
          {errorMessage}
        </p>
        {showMining ? (
          <div>
            {miningStatus?.Status === "success" ? (
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
                  Hash: {abbreviateHash(miningStatus.Hash)}
                </h4>
              </div>
            ) : (
              <img
                className="w-32 h-32 mx-auto mb-8"
                src="/assets/mining-phonon.gif"
              />
            )}
            <div>
              <h3 className="text-lg font-medium text-white">Mining stats</h3>
              <dl className="mt-2 md:flex justify-between rounded-lg bg-gray-800 overflow-hidden divide-y divide-gray-200 md:divide-y-0 md:divide-x">
                {miningStats.map((item) => (
                  <div key={item.Name} className="px-4 py-3">
                    <dt className="text-base font-normal text-gray-400">
                      {item.Name}
                    </dt>
                    <dd className="mt-1 items-baseline">
                      <div className="flex items-baseline text-2xl font-semibold text-white">
                        {item.Stat}
                      </div>
                      <div className="text-xs">{item.SubText}</div>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="grid grid-cols-1 gap-x-3 mt-4">
              {miningStatus?.Status !== "success" ? (
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
              disabled={showMining}
              {...register("difficulty", {
                required: true,
                onChange: async (e) => {
                  setDifficulty(e.currentTarget.value);
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
                disabled={isMiningLoading}
              >
                {isMiningLoading ? "STARTING MINING..." : "START MINING"}
              </IonButton>
              <IonButton
                size="large"
                expand="full"
                fill="clear"
                color="medium"
                onClick={destroyModal}
              >
                CANCEL
              </IonButton>
            </div>
          </form>
        )}
      </div>
    </IonModal>
  );
};

export default MinePhononModal;
