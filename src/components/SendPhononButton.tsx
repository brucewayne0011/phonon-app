import { IonButton, IonIcon, IonInput, IonModal } from "@ionic/react";
import { sendOutline } from "ionicons/icons";
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

  const handleOnChange = (event: any) => {
    setInputValue(() => event.target.value);
    setHasError(false);
  };

  return (
    <>
      <IonButton
        color="primary"
        shape="round"
        slot="end"
        onClick={showModal}
        className="mt-5"
      >
        <IonIcon slot="end" icon={sendOutline} />
        Send
      </IonButton>
      <IonModal isOpen={isModalVisible}>
        {hasError ? "Error sending phonons. Please try again." : null}
        <IonInput
          placeholder="Recipient"
          onChange={handleOnChange}
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
