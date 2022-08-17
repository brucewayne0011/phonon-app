import { IonButton, IonModal } from "@ionic/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useChainByCurrencyType from "../hooks/useChainByCurrencyType";
import { CHAINS } from "../constants/chains";
import useChain from "../hooks/useChain";
import { useIsConnected } from "../hooks/useIsConnected";
import { useSession } from "../hooks/useSession";
import { useMinePhononMutation } from "../store/api";
import FormErrorText from "./FormErrorText";

export type MindPhononFormData = {
  difficulty: number;
};

const MinePhononModal: React.FC<{
  isModalVisible;
  hideModal;
}> = ({ isModalVisible, hideModal }) => {
  const { sessionId } = useSession();
  const [errorMessage, setErrorMessage] = useState("");
  const [minePhonon, { isLoading: isMining }] = useMinePhononMutation();
  const [difficulty, setDifficulty] = useState(5);
  const { chain } = useChain();
  const { isConnected } = useIsConnected();
  const maxDifficulty = 30;
  const difficultyErrorMessage =
    "The difficulty must be between 1 and " + String(maxDifficulty) + "!";

  const destroyModal = () => {
    setErrorMessage("");
    hideModal();
  };

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<MindPhononFormData>();

  const startMining = () => {
    alert("TODO:Start mining!");

    console.log(difficulty);
  };

  return (
    <IonModal isOpen={isModalVisible} onDidDismiss={destroyModal}>
      <div className="flex flex-col content-center justify-center h-full mx-10">
        <p className="text-xl font-bold text-center text-gray-300 uppercase">
          {chain?.name} Phonon Mining
        </p>
        <form
          className="flex flex-col mt-12"
          onSubmit={handleSubmit(startMining)}
        >
          {errors?.difficulty && (
            <FormErrorText>{difficultyErrorMessage}</FormErrorText>
          )}
          <span className="my-4">
            Set the mining difficulty. The higher the difficulty, the longer it
            will take to mine a phonon.
          </span>
          <input
            className="text-bold p-2 text-xl text-white bg-zinc-800 shadow-inner"
            placeholder="Amount"
            type="number"
            min="1"
            max={maxDifficulty}
            value={difficulty}
            disabled={isMining}
            {...register("difficulty", {
              required: true,
              onChange: async (e) => {
                setDifficulty(e.currentTarget.value);
                await trigger();
              },
              validate: (value) => {
                if (value > maxDifficulty) return false;

                return true;
              },
            })}
          />
          <span className="text-sm text-gray-500 my-1 text-right">
            Max difficulty: {maxDifficulty}
          </span>

          {isMining ? (
            <div className="grid grid-cols-1 gap-x-3 mt-4">
              <IonButton
                size="large"
                fill="solid"
                expand="full"
                color="light"
                onClick={destroyModal}
              >
                CANCEL MINING
              </IonButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 mt-4">
              <IonButton
                key="submit"
                type="submit"
                size="large"
                fill="solid"
                expand="full"
                color="light"
              >
                START MINING
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
          )}
        </form>
      </div>
    </IonModal>
  );
};

export default MinePhononModal;
