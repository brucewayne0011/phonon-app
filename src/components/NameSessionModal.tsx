import { IonButton, IonModal } from "@ionic/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "../hooks/useSession";
import { useNameSessionMutation } from "../store/api";

export type NameSessionFormData = {
  name: string;
};

export default function NameSessionModal({
  isModalVisible,
  hideModal,
}: {
  isModalVisible: boolean;
  hideModal: () => void;
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [nameSession, { isLoading }] = useNameSessionMutation();
  const { sessionId, sessionName } = useSession();

  const destroyModal = () => {
    setErrorMessage("");
    hideModal();
    reset();
  };

  const { register, handleSubmit, reset } = useForm<NameSessionFormData>();

  const onSubmit = async (data: NameSessionFormData, event) => {
    event.preventDefault();
    await nameSession({ name: data.name, sessionId })
      .then(destroyModal)
      .catch((err) => {
        setErrorMessage(err.message);
        console.error(err);
      });
  };

  return (
    <IonModal isOpen={isModalVisible} onDidDismiss={destroyModal}>
      <div className="flex flex-col content-center justify-center h-full mx-10">
        <p className="text-xl font-bold text-center text-gray-300 uppercase">
          Rename {sessionName}
        </p>
        <p className="font-bold text-center text-red-400 uppercase mt-2">
          {errorMessage}
        </p>

        <form className="flex flex-col mt-12" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="text-bold p-2 text-xl text-white bg-zinc-800 shadow-inner"
            placeholder={sessionName}
            disabled={isLoading}
            {...register("name", {
              required: true,
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
              disabled={isLoading}
            >
              RENAME
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
      </div>
    </IonModal>
  );
}
