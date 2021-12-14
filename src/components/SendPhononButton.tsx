import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  isPlatform,
} from "@ionic/react";
import { scan, sendSharp } from "ionicons/icons";
import QRCode from "qrcode.react";
import { useState } from "react";
import { useParams } from "react-router";
import { scanQr } from "../hooks/useQRScannner";
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

  const handleSubmit = async () => {
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

  const handleOnKeyDown = (event: any): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit();
    }
  };

  return (
    <>
      <IonButton color="primary" fill="clear" slot="end" onClick={showModal}>
        <IonIcon slot="end" icon={sendSharp} />
        Send
      </IonButton>
      <IonModal isOpen={isModalVisible}>
        {hasError ? "Error sending phonons. Please try again." : null}
        <div className="flex flex-col justify-start content-between p-10 h-full">
          <div className="mx-auto">
            <p className="text-xs text-center text-gray-500 uppercase font-bold mb-2">
              Share Code with Receiver
            </p>
            <QRCode
              value={sessionId}
              size={200}
              level="H"
              className="mx-auto"
              includeMargin
            />
          </div>

          <IonItem className="my-7">
            <IonLabel position="stacked">Receiver ID</IonLabel>
            <IonInput
              value={inputValue}
              placeholder="0xPHONON"
              onKeyDown={handleOnKeyDown}
              onIonChange={(e) => handleOnChange(e.detail.value!)}
              disabled={requestPending}
            ></IonInput>
            {isPlatform("capacitor") ? (
              <IonButton
                fill="clear"
                color="secondary"
                slot="end"
                onClick={() => scanQr(setInputValue)}
                className="my-auto"
              >
                <IonIcon icon={scan} size="large" />
              </IonButton>
            ) : null}
          </IonItem>
          <div className="flex flex-row justify-evenly">
            <IonButton
              key="back"
              color="medium"
              fill="clear"
              onClick={handleCancel}
              disabled={requestPending}
            >
              Cancel
            </IonButton>
            <IonButton
              key="submit"
              fill="solid"
              color="primary"
              disabled={requestPending}
              onClick={handleSubmit}
              className="shadow-lg shadow-teal-300/40"
            >
              Send
            </IonButton>
          </div>
        </div>
      </IonModal>
    </>
  );
}
