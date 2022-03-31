import { IonButton } from "@ionic/react";
import React from "react";
import { useForm } from "react-hook-form";
import { isValidPhononDenomination } from "../utils/validation";
// import * as yup from "yup";

export type CreatePhononFormSingleValues = {
  amount: string;
};

export const CreatePhononFormSingle: React.FC<{
  onSubmit: any;
  isPending: boolean;
}> = ({ onSubmit, isPending }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePhononFormSingleValues>();

  return (
    <form
      className="flex flex-col content-center justify-start h-full gap-2 p-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="text-bold p-2 text-xl bg-zinc-800 shadow-inner"
        placeholder="Amount"
        disabled={isPending}
        {...register("amount", {
          required: true,
          validate: isValidPhononDenomination,
        })}
      />
      {errors?.amount?.type === "required" && (
        <p className="text-bold p-2 text-xl text-zinc-200 shadow-inner">
          Amount is required.
        </p>
      )}
      {errors?.amount?.type === "validate" && (
        <p className="text-bold p-2 text-xl text-zinc-200 shadow-inner">
          First three digits must be less than 255.
        </p>
      )}

      <div className="pinned">
        <IonButton
          key="submit"
          size="large"
          type="submit"
          fill="solid"
          expand="full"
          color="primary"
          className="shadow-lg shadow-teal-300/40"
          disabled={isPending}
        >
          Create
        </IonButton>
      </div>
    </form>
  );
};
