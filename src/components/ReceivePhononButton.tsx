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

  const handleOk = async () => {
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
        <div className="flex flex-col justify-start content-center p-10 h-full">
          <div className="mx-auto">
            <p className="text-xs text-center text-gray-500 uppercase font-bold mb-2">
              Share Code with Sender
            </p>
            <QRCode
              value={sessionId}
              size={200}
              level="H"
              className="mx-auto"
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
            <IonButton
              fill="clear"
              color="secondary"
              slot="end"
              onClick={() => scanQr(setInputValue)}
              className="my-auto"
            >
              <IonIcon icon={scan} size="large" />
              {/* TODO: Add QR Code Scanning */}
            </IonButton>
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
              onClick={handleOk}
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
