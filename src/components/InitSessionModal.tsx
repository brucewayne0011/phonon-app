import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonModal,
  IonText,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import useSessionDisplayName from "../hooks/useSessionDisplayName";
import { useInitSessionMutation } from "../store/api";
import { logger } from "../utils/logger";

interface InitSessionModalProps {
  sessionId: string;
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const InitSessionModal: React.FC<InitSessionModalProps> = ({
  sessionId,
  isOpen,
  setIsOpen,
}) => {
  const [pin, setPin] = useState<string>("");
  const [isInited, setIsInited] = useState(false);
  const [initSession, { isError }] = useInitSessionMutation();
  const router = useIonRouter();

  const handleCancel = () => {
    setIsOpen(false);
    setIsInited(false);
  };

  const handleOnKeyDown = (event: any): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      handleLogin();
    }
  };

  const handleLogin = () => {
    initSession({ sessionId, pin })
      .unwrap()
      .then(() => {
        setIsOpen(false);
        setIsInited(true);
      })
      // TODO: Handle error and display something to the user
      .catch((err) => {
        logger.error(err);
        setIsInited(false);
      });
  };

  const displayName = useSessionDisplayName(sessionId);

  return (
    <IonContent>
      <IonModal
        isOpen={isOpen}
        onDidDismiss={() => {
          if (isInited) router.push(`/${sessionId}/`);
        }}
      >
        <div className="flex flex-col content-center justify-center h-full p-10">
          <IonText color="light">
            <h1 className="mx-auto text-lg text-center">
              Initialize {displayName}
            </h1>
          </IonText>
          {isError && (
            <IonText color="danger">
              <h1 className="mx-auto text-center">
                Something went wrong. Please try again.
              </h1>
            </IonText>
          )}
          <IonItem className="my-7">
            <IonInput
              value={pin}
              placeholder="Password"
              type="password"
              className="text-white"
              onIonChange={(e) => setPin(e?.detail?.value ?? "")}
              onKeyDown={handleOnKeyDown}
            ></IonInput>
          </IonItem>
          <div className="flex flex-row justify-evenly">
            <IonButton color="medium" fill="clear" onClick={handleCancel}>
              Cancel
            </IonButton>
            <IonButton onClick={handleLogin}>Initialize</IonButton>
          </div>
        </div>
      </IonModal>
    </IonContent>
  );
};

export default InitSessionModal;
