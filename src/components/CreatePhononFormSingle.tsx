import { IonButton } from "@ionic/react";
import React from "react";
import { useForm } from "react-hook-form";

export type CreatePhononFormSingleValues = {
  amount: string;
};

export const CreatePhononFormSingle: React.FC<{
  onSubmit: any;
  isPending: boolean;
}> = ({ onSubmit, isPending }) => {
  const { register, handleSubmit } = useForm<CreatePhononFormSingleValues>();

  return (
    <form
      className="flex flex-col content-center justify-start h-full gap-2 p-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="text-bold p-2 text-xl bg-zinc-800 shadow-inner"
        placeholder="Amount"
        type={"number"}
        disabled={isPending}
        {...register("amount", { required: true })}
      />
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
