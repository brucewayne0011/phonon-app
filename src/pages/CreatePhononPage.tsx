import { IonModal } from "@ionic/react";
import React, { useState } from "react";
import { useParams } from "react-router";
import { CreatePhononFormCustom } from "../components/CreatePhononFormCustom";
import { CreatePhononFormSuggested } from "../components/CreatePhononFormSuggested";
import useNetwork from "../hooks/useNetwork";
import {
  useCreatePhononMutation,
  // eslint-disable-next-line prettier/prettier
  useSetDescriptorMutation,
} from "../store/api";

const CreatePhononPage: React.FC = () => {
  const { sessionId, networkId } = useParams<{
    sessionId: string;
    networkId: string;
  }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [createPhonon] = useCreatePhononMutation();
  const [setDescriptor] = useSetDescriptorMutation();
  const { network } = useNetwork();

  const onSubmit = async (data: any) => {
    console.log({ data });
    if (!data || !data.amount) return;
    setIsPending(true);
    await createPhonon({ sessionId })
      .unwrap()
      .then((payload) =>
        setDescriptor({
          index: payload.index,
          currencyType: parseFloat(networkId),
          value: data.amount,
          sessionId,
        })
      );
    setIsPending(false);
    setIsModalVisible(false);
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
        <CreatePhononFormCustom {...{ handleSuggest, onSubmit, isPending }} />
      ) : (
        <CreatePhononFormSuggested
          {...{ handleCustomize, onSubmit, isPending }}
        />
      )}
      <IonModal isOpen={isModalVisible}></IonModal>
    </div>
  );
};

export default CreatePhononPage;
