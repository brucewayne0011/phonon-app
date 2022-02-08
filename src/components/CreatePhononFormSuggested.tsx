import { IonButton } from "@ionic/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useNetwork from "../hooks/useNetwork";
import { makeChange } from "../utils/math";

type CreatePhononFormSuggestedProps = {
  handleCustomize: () => void;
  onSubmit: any;
  isPending: boolean;
};

export const CreatePhononFormSuggested: React.FC<
  CreatePhononFormSuggestedProps
> = ({ handleCustomize, onSubmit, isPending }) => {
  const [denominationAmounts, setDenominationAmounts] = useState([
    { denomination: 0, amount: 0 },
  ]);
  const { network } = useNetwork();

  const { register, handleSubmit, control } = useForm();

  const amount = register("amount", { required: true });

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDenominationAmounts(makeChange(parseFloat(e.target.value)));
  };

  return (
    <form
      className="flex flex-col content-center justify-start h-full gap-2 p-2"
      onSubmit={(val) => {
        console.log(val);
        return handleSubmit(onSubmit);
      }}
    >
      <input
        className="text-bold p-2 text-xl bg-zinc-800 shadow-inner"
        placeholder="Amount"
        type={"number"}
        disabled={isPending}
        onChange={(e) => {
          console.log(e);
          amount.onChange(e).catch(console.error);
          console.log(amount);
          handleOnChangeInput(e);
        }}
        onBlur={amount.onBlur}
        ref={amount.ref}
      />
      <p className="text-sm text-gray-400 font-bold text-center">SUGGESTED</p>
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
      <div className="pinned">
        <IonButton
          key="back"
          color="medium"
          size="large"
          fill="clear"
          expand="full"
          onClick={handleCustomize}
          disabled={isPending}
        >
          Customize
        </IonButton>
        <IonButton
          key="submit"
          size="large"
          type="submit"
          fill="solid"
          expand="full"
          color="primary"
          className="shadow-lg shadow-teal-300/40"
        >
          Create
        </IonButton>
      </div>
    </form>
  );
};
