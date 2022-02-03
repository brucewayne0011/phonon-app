import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonSelect,
  // eslint-disable-next-line prettier/prettier
  IonSelectOption
} from "@ionic/react";
import { add } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { denominations } from "../constants/denominations";
import useNetwork from "../hooks/useNetwork";
import {
  useCreatePhononMutation,
  // eslint-disable-next-line prettier/prettier
  useSetDescriptorMutation
} from "../store/api";
import { makeChange, rollupChange } from "../utils/math";

const CreatePhononPage: React.FC = () => {
  const { sessionId, networkId } = useParams<{
    sessionId: string;
    networkId: string;
  }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [requestPending, setRequestPending] = useState(false);
  const [denominationAmounts, setDenominationAmounts] = useState([
    { denomination: 1, amount: 1 },
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
          currencyType: parseFloat(networkId),
          value: inputValue,
          sessionId,
        })
      );
    setRequestPending(false);
    setIsModalVisible(false);
  };

  const handleCustomize = () => {
    setIsCustomizing(true);
  };

  const handleSuggesting = () => {
    setIsCustomizing(false);
    setInputValue(rollupChange(denominationAmounts));
  };

  const handleOnInputChange = (value: number) => {
    setInputValue(value);
  };

  const handleOnDenomInputChange = (value: number, denom: any) => {
    setDenominationAmounts((amounts) => {
      const _amounts = [...amounts];
      const i = amounts.indexOf(denom);
      _amounts[i].amount = value;
      return _amounts;
    });
  };

  const handleOnKeyDown = (event: any): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit().catch(console.error);
    }
  };

  const handleOnSelectDenomination = (denomination: number, denom: any) => {
    setDenominationAmounts((amounts) => {
      const _amounts = [...amounts];
      const i = amounts.indexOf(denom);
      _amounts[i].denomination = denomination;
      return _amounts;
    });
  };

  const handleAddDenomination = () => {
    setDenominationAmounts((amounts) => {
      const _amounts = [...amounts];
      const unusedDenominations = denominations.filter(
        (d) => !amounts.some(({ denomination }) => d === denomination)
      );
      console.log(
        "🚀 ~ file: CreatePhononPage.tsx ~ line 110 ~ setDenominationAmounts ~ unusedDenominations",
        unusedDenominations
      );
      const index = unusedDenominations.length - 1;
      const lowestUnusedDenomination = unusedDenominations[index];
      const newDenomAmount = {
        amount: 1,
        denomination: lowestUnusedDenomination,
      };
      _amounts.push(newDenomAmount);
      return _amounts;
    });
  };

  const CustomizationForm = () => {
    return (
      <div>
        {rollupChange(denominationAmounts)}
        <IonList>
          {denominationAmounts
            .filter((x) => x.amount)
            .map((denom) => (
              <IonItem key={denom.denomination}>
                <IonInput
                  className="text-bold p-2 text-xl shadow-inner"
                  type="number"
                  value={denom.amount}
                  onIonChange={(e) =>
                    handleOnDenomInputChange(
                      //@ts-expect-error - DOM API is not typesafe
                      parseFloat(e.target.value),
                      denom
                    )
                  }
                ></IonInput>
                <IonSelect
                  value={denom.denomination}
                  className="text-bold p-2 text-xl shadow-inner"
                  interface="popover"
                  interfaceOptions={{
                    side: "left",
                  }}
                  onIonChange={(e) =>
                    handleOnSelectDenomination(
                      //@ts-expect-error - DOM API is not typesafe
                      parseFloat(e.target.value),
                      denom
                    )
                  }
                >
                  {denominations.map((denomination) => (
                    <IonSelectOption
                      className="text-bold p-2 text-xl shadow-inner"
                      value={denomination}
                      key={denomination}
                      disabled={denominationAmounts.some(
                        (d) => d.denomination === denomination
                      )}
                    >
                      {network.symbol} {denomination}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            ))}
        </IonList>
        <IonButton
          key="back"
          color="medium"
          size="large"
          fill="clear"
          expand="full"
          onClick={handleAddDenomination}
          disabled={requestPending}
        >
          <IonIcon slot="start" icon={add} />
          Add
        </IonButton>
      </div>
    );
  };

  return (
    <div className="flex flex-col content-center justify-start h-full gap-2 p-2">
      <p className="text-xl font-bold text-center text-gray-300 uppercase">
        Create {network.name}
      </p>
      {isCustomizing ? (
        <CustomizationForm />
      ) : (
        <>
          <input
            className="text-bold p-2 text-xl bg-zinc-800 shadow-inner"
            placeholder="Amount"
            type={"number"}
            min={"1"}
            onKeyDown={handleOnKeyDown}
            disabled={requestPending}
            defaultValue={inputValue}
            onChange={(e) =>
              handleOnInputChange(parseFloat(e.target.value ?? "0"))
            }
          />

          <p className="text-sm text-gray-400 font-bold text-center">
            SUGGESTED
          </p>
          {denominationAmounts
            .filter((x) => x.amount)
            .map((denom) => (
              <p
                key={denom.denomination}
                className="text-md text-gray-200 font-bold text-center"
              >
                {denom.amount}x {network.symbol}
                {denom.denomination}
              </p>
            ))}
        </>
      )}
      <div className="pinned">
        {isCustomizing ? (
          <IonButton
            key="back"
            color="medium"
            size="large"
            fill="clear"
            expand="full"
            onClick={handleSuggesting}
            disabled={requestPending}
          >
            Suggest
          </IonButton>
        ) : (
          <IonButton
            key="back"
            color="medium"
            size="large"
            fill="clear"
            expand="full"
            onClick={handleCustomize}
            disabled={requestPending}
          >
            Customize
          </IonButton>
        )}
        <IonButton
          key="submit"
          size="large"
          fill="solid"
          expand="full"
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
