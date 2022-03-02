import { IonModal, useIonRouter } from "@ionic/react";
import { ethers } from "ethers";
import React, { useState } from "react";
import { useParams } from "react-router";
import {
  CreatePhononFormCustom,
  CreatePhononFormCustomValues,
} from "../components/CreatePhononFormCustom";
import {
  CreatePhononFormSuggested,
  CreatePhononFormSuggestedValues,
} from "../components/CreatePhononFormSuggested";
import useNetwork from "../hooks/useNetwork";
import {
  useCreatePhononMutation,
  useFinalizeDepositMutation,
  useInitDepositMutation,
  // eslint-disable-next-line prettier/prettier
  useSetDescriptorMutation,
} from "../store/api";
import { makeChange } from "../utils/math";

const CreatePhononPage: React.FC = () => {
  const { sessionId, networkId } = useParams<{
    sessionId: string;
    networkId: string;
  }>();
  const router = useIonRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [initDeposit] = useInitDepositMutation();
  const [finalizeDeposit] = useFinalizeDepositMutation();
  const [createPhonon] = useCreatePhononMutation();
  const [setDescriptor] = useSetDescriptorMutation();
  const { network } = useNetwork();

  const onSubmitSuggested = (data: CreatePhononFormSuggestedValues) =>
    onSubmit(makeChange(data.amount));

  const onSubmitCustomized = (data: CreatePhononFormCustomValues) =>
    onSubmit(data.phononsToCreate);

  const onSubmit = async (
    data: {
      amount: number;
      denomination: number;
    }[]
  ) => {
    setIsPending(true);
    const Denominations = data.flatMap(
      (d) => Array(d.amount).fill(d.denomination) as number[]
    );
    const CurrencyType = parseInt(networkId);
    const payload = { CurrencyType, Denominations };
    await initDeposit({ payload, sessionId })
      .unwrap()
      .then(async (payload) => {
        // @ts-expect-error - window
        if (window.ethereum) {
          // @ts-expect-error - window
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const network = await provider.getNetwork();
          const ChainID = network.chainId;
          const signer = provider.getSigner();
          await Promise.all(
            payload.map(async (phonon) => {
              const response = await signer
                .sendTransaction({
                  to: phonon.Address,
                  value: phonon.Denomination,
                })
                .catch(console.error);
              if (response) {
                console.log(response);
                console.log(phonon);
                const Phonon = { ...phonon, ChainID };
                const payload = [
                  {
                    Phonon,
                    ConfirmedOnChain: true,
                    ConfirmedOnCard: true,
                  },
                ];
                console.log(payload);
                finalizeDeposit({ payload, sessionId }).catch(console.error);
              }
            })
          );
          router.push(`/${sessionId}/${networkId}/`);
        } else {
          // TODO: Show an error message to the user about MetaMask not being installed or available
          setIsPending(false);
        }
      });
  };

  const handleCustomize = () => {
    setIsCustomizing(true);
  };

  const handleSuggest = () => {
    setIsCustomizing(false);
    // setInputValue(rollupChange(denominationAmounts));
  };

  return (
    <div>
      <p className="text-xl font-bold text-center text-gray-300 uppercase">
        Create {network.ticker}
      </p>
      {isCustomizing ? (
        <CreatePhononFormCustom
          {...{ handleSuggest, onSubmit: onSubmitCustomized, isPending }}
        />
      ) : (
        <CreatePhononFormSuggested
          {...{ handleCustomize, onSubmit: onSubmitSuggested, isPending }}
        />
      )}
      <IonModal isOpen={isModalVisible}></IonModal>
    </div>
  );
};

export default CreatePhononPage;
