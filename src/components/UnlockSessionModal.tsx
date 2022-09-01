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
import { useSession } from "../hooks/useSession";
import { useUnlockSessionMutation } from "../store/api";
import { logger } from "../utils/logger";

interface UnlockSessionModalProps {
  sessionId: string;
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const UnlockSessionModal: React.FC<UnlockSessionModalProps> = ({
  sessionId,
  isOpen,
  setIsOpen,
}) => {
  const [pin, setPin] = useState<string>("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockSession, { isError, isLoading }] = useUnlockSessionMutation();
  const router = useIonRouter();
  const { getSessionNameForId } = useSession();

  const handleDismiss = () => {
    setIsOpen(false);
    setIsUnlocked(false);
    if (isUnlocked) router.push(`/${sessionId}/`);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setIsUnlocked(false);
  };

  const handleOnKeyDown = (event: any): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      handleLogin(event);
    }
  };

  const handleLogin = (evt) => {
    evt.preventDefault();

    unlockSession({ sessionId, pin })
      .unwrap()
      .then(() => {
        setIsOpen(false);
        setIsUnlocked(true);
      })
      // TODO: Handle error and display something to the user
      .catch((err) => {
        logger.error(err);
        setIsUnlocked(false);
      });
  };
  const displayName = getSessionNameForId(sessionId);

  return (
    <IonContent>
      <IonModal isOpen={isOpen} onDidDismiss={handleDismiss}>
        <div className="flex flex-col content-center justify-center h-full p-10">
          <IonText color="light">
            <h1 className="mx-auto text-lg text-center">
              Unlock {displayName}
            </h1>
          </IonText>
          {isError && (
            <IonText color="danger">
              <h1 className="mx-auto text-center">
                Something went wrong. Please try again.
              </h1>
            </IonText>
          )}
          <form onSubmit={handleLogin}>
            <IonItem className="my-7">
              <IonInput
                value={pin}
                placeholder="PIN"
                type="password"
                className="text-white"
                onIonChange={(e) => setPin(e?.detail?.value ?? "")}
                onKeyDown={handleOnKeyDown}
                disabled={isLoading}
              ></IonInput>
            </IonItem>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
              <IonButton
                type="submit"
                size="large"
                fill="solid"
                expand="full"
                color="primary"
                disabled={isLoading}
              >
                Unlock
              </IonButton>
              <IonButton
                size="large"
                expand="full"
                fill="clear"
                color="medium"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </IonButton>
            </div>
          </form>
        </div>
      </IonModal>
    </IonContent>
  );
};

export default UnlockSessionModal;
