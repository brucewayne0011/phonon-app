import { IonButton, IonIcon, IonInput, IonModal } from "@ionic/react";
import { sendSharp } from "ionicons/icons";
import { useState } from "react";
import { useParams } from "react-router";
import { usePairSessionMutation, useSendPhononMutation } from "../store/api";

export default function SendPhononButton({ index }: { index: number }) {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [requestPending, setRequestPending] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(false);
  const [pairSession] = usePairSessionMutation();
  const [sendPhonon] = useSendPhononMutation();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setInputValue("");
    setIsModalVisible(false);
    setRequestPending(false);
  };

  const handleOk = async () => {
    setRequestPending(true);
    pairSession({ cardId: inputValue, sessionId })
      .unwrap()
      .then(() => {
        sendPhonon({ index, sessionId });
        hideModal();
      })
      .catch((err) => {
        setHasError(true);
        setRequestPending(false);
      });
  };

  const handleCancel = () => {
    hideModal();
  };

  const handleOnChange = (value: any) => {
    setInputValue(value);
    setHasError(false);
  };

  return (
    <>
      <IonButton
        color="primary"
        fill="clear"
        slot="end"
        onClick={showModal}
        // className="shadow-lg shadow-blue-300/30"
      >
        <IonIcon slot="end" icon={sendSharp} />
        Send
      </IonButton>
      <IonModal isOpen={isModalVisible}>
        {hasError ? "Error sending phonons. Please try again." : null}
        <IonInput
          placeholder="Recipient"
          onIonChange={(e) => handleOnChange(e.detail.value!)}
          disabled={requestPending}
        />
        <IonButton key="back" onClick={handleCancel} disabled={requestPending}>
          Cancel
        </IonButton>
        <IonButton
          key="submit"
          // type="primary"
          // loading={requestPending}
          onClick={handleOk}
        >
          Send
        </IonButton>
      </IonModal>
    </>
  );
}
