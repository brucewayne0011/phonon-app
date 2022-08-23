import { IonButton, IonModal } from "@ionic/react";
import { ethers } from "ethers";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useChain from "../hooks/useChain";
import { useSession } from "../hooks/useSession";
import {
  useCheckDenominationMutation,
  useFinalizeDepositMutation,
  useInitDepositMutation,
} from "../store/api";
import { ethToBn, ethToWei, weiToEth } from "../utils/denomination";
import FormErrorText from "./FormErrorText";

export type CreatePhononFormData = {
  amount: string;
};

export default function CreatePhononModal({
  isModalVisible,
  hideModal,
}: {
  isModalVisible: boolean;
  hideModal: () => void;
}) {
  const { sessionId } = useSession();
  const [isPending, setIsPending] = useState(false);
  const [initDeposit] = useInitDepositMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [finalizeDeposit] = useFinalizeDepositMutation();
  const { chain, chainId, isAuthenticated } = useChain();
  const [checkDenomination] = useCheckDenominationMutation();

  const destroyModal = () => {
    setErrorMessage("");
    hideModal();
    reset();
  };

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<CreatePhononFormData>();

  const onSubmitSingle = (data: CreatePhononFormData) =>
    onSubmit([{ amount: 1, denomination: data.amount }])
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => setIsPending(false));

  const onSubmit = async (
    data: {
      amount: number;
      denomination: string;
    }[]
  ) => {
    setIsPending(true);
    setErrorMessage("");
    if (!chain) {
      throw new Error(
        "Chain Unavailable. Please reauthenticate with MetaMask."
      );
    }
    if (!isAuthenticated) {
      throw new Error("Must be authenticated with MetaMask.");
    }
    const Denominations = data.flatMap((d) => {
      const denomination = ethToWei(d.denomination);
      const arr = Array(d.amount);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return arr.fill(denomination);
    });
    const CurrencyType = chain.CurrencyType;
    const payload = { CurrencyType, Denominations };
    await initDeposit({ payload, sessionId })
      .unwrap()
      .then(async (payload) => {
        // @ts-expect-error - window
        if (window.ethereum) {
          // @ts-expect-error - window
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const ChainID = chainId;
          const signer = provider.getSigner();
          await Promise.all(
            payload.map(async (phonon) => {
              const to = phonon.Address;
              const value = ethToBn(weiToEth(phonon.Denomination));

              return signer
                .sendTransaction({ to, value })
                .then(async (response) => {
                  if (response) {
                    const Phonon = { ...phonon, ChainID };

                    const payload = [
                      {
                        Phonon,
                        ConfirmedOnChain: true,
                        ConfirmedOnCard: true,
                      },
                    ];
                    await finalizeDeposit({ payload, sessionId }).catch(
                      console.error
                    );
                    destroyModal();
                  }
                })
                .catch((err) => {
                  console.error(err);
                  setErrorMessage(err.message);
                  const Phonon = { ...phonon, ChainID };
                  const payload = [
                    {
                      Phonon,
                      ConfirmedOnChain: false,
                      ConfirmedOnCard: true,
                    },
                  ];
                  finalizeDeposit({ payload, sessionId }).catch(console.error);
                })
                .finally(() => setIsPending(false));
            })
          );
        } else {
          // TODO: Show an error message to the user about MetaMask not being installed or available
          throw new Error("MetaMask is not installed.");
        }
      })
      .catch((err) => {
        if (err.message) setErrorMessage(err.message);
        else if (err.data) setErrorMessage(err.data);
      });
  };

  return (
    <IonModal isOpen={isModalVisible} onDidDismiss={destroyModal}>
      <div className="flex flex-col content-center justify-center h-full mx-10">
        <p className="text-xl font-bold text-center text-gray-300 uppercase">
          Create {chain?.name} Phonon
        </p>
        <p className="font-bold text-center text-red-400 uppercase mt-2">
          {errorMessage}
        </p>
        <form
          className="flex flex-col mt-12"
          onSubmit={handleSubmit(onSubmitSingle)}
        >
          {errors?.amount?.type === "required" && (
            <FormErrorText>Amount is required.</FormErrorText>
          )}
          {errors?.amount?.type === "validate" && (
            <FormErrorText>Invalid denomination.</FormErrorText>
          )}
          <input
            className="text-bold p-2 text-xl text-white bg-zinc-800 shadow-inner"
            placeholder="Amount"
            disabled={isPending}
            {...register("amount", {
              required: true,
              onChange: () => trigger(),
              validate: async (value) => {
                if (parseInt(value) === NaN) {
                  return false;
                }

                const wei = ethToWei(value);
                const resp = await checkDenomination({ denomination: wei });
                //@ts-expect-error - type is wrong
                if (resp.error) return false;
                return true;
              },
            })}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 mt-4">
            <IonButton
              key="submit"
              size="large"
              type="submit"
              fill="solid"
              expand="full"
              color="primary"
              disabled={isPending || !!errors.amount}
            >
              CREATE
            </IonButton>
            <IonButton
              size="large"
              expand="full"
              fill="clear"
              color="medium"
              onClick={destroyModal}
              disabled={isPending}
            >
              CANCEL
            </IonButton>
          </div>
        </form>
      </div>
    </IonModal>
  );
}
