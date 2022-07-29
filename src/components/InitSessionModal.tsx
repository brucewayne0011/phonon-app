import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonModal,
  IonText,
} from "@ionic/react";
import React, { useState } from "react";
import { useSession } from "../hooks/useSession";
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
  const [confirmPin, setConfirmPin] = useState<string>("");
  const [initSession, { isError, isLoading }] = useInitSessionMutation();
  const { getSessionNameForId } = useSession();

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleOnKeyDown = (event: any): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      handleInit();
    }
  };

  const handleInit = () => {
    initSession({ sessionId, pin })
      .unwrap()
      .then(() => {
        setIsOpen(false);
      })
      // TODO: Handle error and display something to the user
      .catch((err) => {
        logger.error(err);
      });
  };

  const displayName = getSessionNameForId(sessionId);

  const pinContainsNonDigitChars = pin.length > 0 && !!pin.match(/^([^0-9]*)$/);

  const validPin = !!pin.match(/^[0-9]{6}$/) && pin === confirmPin;

  return (
    <IonContent>
      <IonModal isOpen={isOpen}>
        <div className="flex flex-col content-center justify-center h-full p-10">
          <IonText color="light">
            <h1 className="mx-auto text-xl text-center">
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
          <p className="mt-10 text-sm text-center">
            Choose a 6 digit pin for your card
          </p>
          <IonItem className="my-7">
            <IonInput
              value={pin}
              placeholder="Pin"
              type="password"
              disabled={isLoading}
              className="text-white"
              onIonChange={(e) => setPin(e?.detail?.value ?? "")}
              onKeyDown={handleOnKeyDown}
            ></IonInput>
          </IonItem>
          {pinContainsNonDigitChars && (
            <IonText color="danger">
              <h1 className="mx-auto text-center">
                Your pin can only contain digits
              </h1>
            </IonText>
          )}
          {pin.length > 6 && (
            <IonText color="danger">
              <h1 className="mx-auto text-center">
                Your pin must be 6 characters
              </h1>
            </IonText>
          )}
          <IonItem className="my-7">
            <IonInput
              value={confirmPin}
              placeholder="Confirm Pin"
              type="password"
              disabled={isLoading}
              className="text-white"
              onIonChange={(e) => setConfirmPin(e?.detail?.value ?? "")}
              onKeyDown={handleOnKeyDown}
            ></IonInput>
          </IonItem>

          {!!confirmPin.length && confirmPin !== pin && (
            <IonText color="danger">
              <h1 className="mx-auto text-center mb-10">Pins do not match</h1>
            </IonText>
          )}
          <div className="flex flex-row justify-evenly mt-10">
            <IonButton
              color="medium"
              fill="clear"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </IonButton>
            <IonButton onClick={handleInit} disabled={isLoading || !validPin}>
              Initialize
            </IonButton>
          </div>
        </div>
      </IonModal>
    </IonContent>
  );
};

export default InitSessionModal;
