import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonModal,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import { useUnlockSessionMutation } from "../store/api";

interface UnlockSessionModalProps {
  session: string;
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const UnlockSessionModal: React.FC<UnlockSessionModalProps> = ({
  session,
  isOpen,
  setIsOpen,
}) => {
  const [pin, setPin] = useState<string>("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockSession] = useUnlockSessionMutation();
  let router = useIonRouter();

  const handleCancel = () => {
    setIsOpen(false);
    setIsUnlocked(false);
  };

  const handleOnKeyDown = (event: any): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      handleLogin();
    }
  };

  const handleLogin = () => {
    unlockSession({ sessionId: session, pin })
      .unwrap()
      .then(() => {
        setIsOpen(false);
        setIsUnlocked(true);
      })
      // TODO: Handle error and display something to the user
      .catch((err) => setIsUnlocked(false));
  };

  return (
    <IonContent>
      <IonModal
        // class="py-32"
        isOpen={isOpen}
        onDidDismiss={() => {
          if (isUnlocked) router.push(`/${session}/`);
        }}
      >
        <div className="flex flex-col justify-center content-center p-10 h-full">
          <h1 className="text-lg mx-auto">{session}</h1>
          <IonItem className="my-7">
            <IonInput
              value={pin}
              placeholder="Password"
              type="password"
              onIonChange={(e) => setPin(e.detail.value!)}
              onKeyDown={handleOnKeyDown}
            ></IonInput>
          </IonItem>
          <div className="flex flex-row justify-evenly">
            <IonButton color="medium" fill="clear" onClick={handleCancel}>
              Cancel
            </IonButton>
            <IonButton onClick={handleLogin}>Unlock</IonButton>
          </div>
        </div>
      </IonModal>
    </IonContent>
  );
};

export default UnlockSessionModal;
