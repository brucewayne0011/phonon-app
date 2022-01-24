import { isPlatform } from "@ionic/core";
import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
} from "@ionic/react";
import { download, scan } from "ionicons/icons";
import QRCode from "qrcode.react";
import { useState } from "react";
import { useParams } from "react-router";

import { scanQr } from "../hooks/useQRScannner";
import { usePairSessionMutation } from "../store/api";

export default function ReceivePhononButton() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [requestPending, setRequestPending] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [pairSession] = usePairSessionMutation();

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
      .then((data) => {
        hideModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCancel = () => {
    hideModal();
  };

  const handleOnChange = (value: any) => {
    setInputValue(value);
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
      <IonButton
        fill="outline"
        color="secondary"
        onClick={showModal}
        className="shadow-lg shadow-teal-300/20"
      >
        <IonIcon slot="start" icon={download} />
        Receive
      </IonButton>
      <IonModal isOpen={isModalVisible}>
        <div className="flex flex-col content-center justify-start h-full p-10">
          <div className="mx-auto">
            <p className="mb-2 text-xs font-bold text-center text-gray-500 uppercase">
              Share Code with Sender
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
            <IonLabel position="stacked">Sender ID</IonLabel>
            <IonInput
              value={inputValue}
              placeholder="0xPHONON"
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
            >
              Cancel
            </IonButton>
            <IonButton
              key="submit"
              fill="solid"
              color="primary"
              disabled={requestPending}
              onKeyDown={handleOnKeyDown}
              onClick={handleSubmit}
              className="shadow-lg shadow-teal-300/40"
            >
              Receive
            </IonButton>
          </div>
        </div>
      </IonModal>
    </>
  );
}
