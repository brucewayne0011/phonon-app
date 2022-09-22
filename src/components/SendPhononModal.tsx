import { IonButton, IonModal } from "@ionic/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CHAINS } from "../constants/chains";
import { useIsConnected } from "../hooks/useIsConnected";
import { useSession } from "../hooks/useSession";
import { usePairMutation, useSendPhononMutation } from "../store/api";
import { weiToEth } from "../utils/denomination";
import { isNativePhonon } from "../utils/validation";
import LoadingMessage from "./LoadingMessage";

export type SendPhononFormData = {
  cardId: string;
};

const SendPhononModal: React.FC<{
  isModalVisible;
  hideModal;
  selectedPhonon;
  setSelectedPhonon: React.Dispatch<
    React.SetStateAction<PhononDTO | undefined>
  >;
  isConnectedToServer;
}> = ({
  isModalVisible,
  hideModal,
  selectedPhonon,
  setSelectedPhonon,
  isConnectedToServer,
}) => {
  const { sessionId } = useSession();
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageDetails, setErrorMessageDetails] = useState("");
  const [sendPhonon, { isLoading: isSending }] = useSendPhononMutation();
  const [pair, { isLoading: isPairing }] = usePairMutation();
  const chain = CHAINS[selectedPhonon.ChainID] ?? null;
  const { isConnected } = useIsConnected();

  const isLoading = isSending || isPairing;

  const destroyModal = () => {
    setErrorMessage("");
    setErrorMessageDetails("");
    hideModal();
    reset();
  };

  const { register, handleSubmit, reset, getValues } =
    useForm<SendPhononFormData>();

  const onSubmit = async (data: SendPhononFormData, event) => {
    event.preventDefault();

    if (!isConnected) {
      throw new Error("Must be connected.");
    }
    const payload: SendPhononDTO = [selectedPhonon];

    try {
      await pair({ cardId: data.cardId, sessionId })
        .unwrap()
        .then(() => {
          sendPhonon({ payload, sessionId })
            .then(() => {
              destroyModal();
              // if successful, we remove selected phonon
              setSelectedPhonon(undefined);
            })
            .catch((err) => {
              setErrorMessage(err.message);
              console.error(err);
            });
        })
        .catch((err) => {
          setErrorMessage("PAIRING ERROR: " + String(err.data));

          // set error message details
          if (
            String(err.data).trim().toLowerCase() ===
            String("timeout").toLowerCase().trim()
          ) {
            setErrorMessageDetails(
              "There's a known issue that is preventing the pairing of a remote card after a previous Phonon was sent to that same remote card. This will be resolved in a future release."
            );
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <IonModal isOpen={isModalVisible} onDidDismiss={destroyModal}>
      <div className="flex flex-col content-center justify-center h-full mx-10">
        <p className="text-xl font-bold text-center text-gray-300 uppercase">
          Send {chain?.name} Phonon
        </p>
        <p className="text-l font-bold text-center text-gray-400 uppercase">
          {`${weiToEth(selectedPhonon.Denomination)} ${
            chain ? chain.ticker : "ERR"
          }`}
        </p>
        <div className="font-bold text-xl text-red-400 mt-2">
          <div className="uppercase text-center">{errorMessage}</div>
          {errorMessageDetails && (
            <span className="text-sm block mt-2">{errorMessageDetails}</span>
          )}
        </div>

        {/* Loading message while pairing with remote card */}
        {isPairing && (
          <LoadingMessage>
            Pairing with{" "}
            <span className="font-bold ml-1">{getValues("cardId")}</span>...
          </LoadingMessage>
        )}
        {/* Loading message while sending phonon to remote card */}
        {isSending && (
          <LoadingMessage>
            Sending{" "}
            <span className="font-bold ml-1">
              {isNativePhonon(selectedPhonon)
                ? selectedPhonon.Denomination
                : weiToEth(selectedPhonon.Denomination)}{" "}
              {chain?.ticker}
            </span>{" "}
            to
            <span className="font-bold ml-1">{getValues("cardId")}</span>...
          </LoadingMessage>
        )}
        {/* Show the send form if not pairing, not sending and connected to server */}
        {!isPairing && !isSending && isConnectedToServer ? (
          <form
            className="flex flex-col mt-12"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="text-bold p-2 text-xl text-white bg-zinc-800 shadow-inner"
              placeholder="Recipient Card ID"
              disabled={isLoading}
              {...register("cardId", {
                required: true,
              })}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 mt-4">
              <IonButton
                key="submit"
                size="large"
                fill="solid"
                expand="full"
                color="primary"
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                SEND
              </IonButton>
              <IonButton
                size="large"
                expand="full"
                fill="clear"
                color="medium"
                onClick={destroyModal}
                disabled={isLoading}
              >
                CANCEL
              </IonButton>
            </div>
          </form>
        ) : (
          <IonButton
            size="large"
            expand="full"
            fill="solid"
            color="medium"
            onClick={destroyModal}
            className="mt-8"
          >
            CLOSE
          </IonButton>
        )}
      </div>
    </IonModal>
  );
};

export default SendPhononModal;
