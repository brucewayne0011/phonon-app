import { IonButton, IonModal, IonIcon } from "@ionic/react";
import { copyOutline } from "ionicons/icons";
import React, { useState } from "react";
import QRCode from "qrcode.react";
import { useSession } from "../hooks/useSession";

export default function ReceivePhononModal({ isModalVisible, hideModal }: any) {
  const { sessionId } = useSession();
  const [showCopyNotification, setShowCopyNotification] =
    useState<boolean>(false);
  const handleSubmit = () => {
    hideModal();
  };

  const handleIDClicked = async () => {
    await navigator.clipboard.writeText(sessionId);
    setShowCopyNotification(true);

    setTimeout(() => {
      setShowCopyNotification(false);
    }, 1500);
  };

  const handleOnKeyDown = (event: any): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit();
    }
  };

  return (
    <IonModal isOpen={isModalVisible} onDidDismiss={hideModal}>
      <div className="flex flex-col content-center justify-center h-full mx-10 gap-10">
        <p className="text-xl font-bold text-center text-gray-300 uppercase">
          Share Code with Sender
        </p>
        <QRCode
          value={sessionId}
          size={200}
          level="H"
          className="mx-auto"
          includeMargin
        />
        <div className="relative mx-auto">
          <div
            className="text-l cursor-pointer font-bold text-gray-400 uppercase flex gap-x-2 items-center"
            onClick={handleIDClicked}
          >
            {sessionId}
            <IonIcon slot="end" icon={copyOutline} />
          </div>

          <span
            className={
              (showCopyNotification ? "opacity-100" : "opacity-0") +
              " absolute left-1/2 transform -translate-x-1/2 uppercase font-bold text-xs transition-opacity easy-in duration-500 group-hover:flex -top-2 -translate-y-full px-2 py-1 bg-green-700 rounded-lg text-center text-white after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-green-700"
            }
          >
            COPIED!
          </span>
        </div>
        <IonButton
          key="submit"
          size="large"
          expand="full"
          color="dark"
          onKeyDown={handleOnKeyDown}
          onClick={handleSubmit}
        >
          OK
        </IonButton>
      </div>
    </IonModal>
  );
}
