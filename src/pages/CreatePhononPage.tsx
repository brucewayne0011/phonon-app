import { IonButton, IonModal } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import icon from "../assets/icon.svg";
import useNetwork from "../hooks/useNetwork";
import {
  useCreatePhononMutation,
  useSetDescriptorMutation,
} from "../store/api";
import { makeChange } from "../utils";

const CreatePhononPage: React.FC = () => {
  const { sessionId, networkId } = useParams<{
    sessionId: string;
    networkId: string;
  }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [requestPending, setRequestPending] = useState(false);
  const [denominationAmounts, setDenominationAmounts] = useState([
    { denomination: 0, amount: 0 },
  ]);
  const [inputValue, setInputValue] = useState(1);
  const [createPhonon] = useCreatePhononMutation();
  const [setDescriptor] = useSetDescriptorMutation();
  const { network } = useNetwork();

  useEffect(() => {
    setDenominationAmounts(makeChange(inputValue));
  }, [inputValue]);

  const showCreateModal = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = async () => {
    setRequestPending(true);
    await createPhonon({ sessionId })
      .unwrap()
      .then((payload) =>
        setDescriptor({
          index: payload.index,
          currencyType: parseInt(networkId),
          value: inputValue,
          sessionId,
        })
      );
    setRequestPending(false);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setInputValue(1);
    setIsModalVisible(false);
    setRequestPending(false);
  };

  const handleOnInputChange = (value: number) => {
    setInputValue(value);
  };

  const handleOnKeyDown = (event: any): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit().catch(console.error);
    }
  };

  return (
    <div className="flex flex-col content-center justify-start h-full p-12">
      <p className="mb-2 text-2xl font-bold text-center text-gray-500 uppercase">
        Create Phonon
      </p>

      <img src={icon} className="w-32 mx-auto" alt="logo" />

      <div className="flex flex-row">
        <input
          className="text-bold p-2 text-5xl bg-zinc-800 shadow-inner"
          placeholder="Amount"
          type={"number"}
          min={"1"}
          onKeyDown={handleOnKeyDown}
          disabled={requestPending}
          defaultValue={1}
          onChange={(e) => handleOnInputChange(parseInt(e.target.value ?? "0"))}
        />
        <p className="mb-2 text-5xl font-bold text-center text-gray-500 uppercase">
          ETH
        </p>
      </div>

      <div>
        <p className="text-md text-gray-400 font-bold text-center">SUGGESTED</p>
        {denominationAmounts
          .filter((x) => x.amount)
          .map((denom) => (
            <div key={denom.denomination} className="text-xl">
              <p className="text-2xl text-gray-200 font-bold text-center">
                {denom.amount}x {network.symbol}
                {denom.denomination}
              </p>
            </div>
          ))}
      </div>
      <div className="flex flex-row justify-evenly">
        <IonButton
          key="back"
          color="medium"
          fill="clear"
          expand="block"
          onClick={handleCancel}
          disabled={requestPending}
        >
          Cancel
        </IonButton>
        <IonButton
          key="submit"
          fill="solid"
          expand="block"
          color="primary"
          onClick={handleSubmit}
          className="shadow-lg shadow-teal-300/40"
        >
          Create
        </IonButton>
      </div>
      <IonModal isOpen={isModalVisible}></IonModal>
    </div>
  );
};

export default CreatePhononPage;
