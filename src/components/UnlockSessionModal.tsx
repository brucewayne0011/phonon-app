import {
  IonButton,
  IonContent,
  IonInput,
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
        <h1>{session}</h1>
        <IonInput
          value={pin}
          placeholder="Enter Password"
          type="password"
          onIonChange={(e) => setPin(e.detail.value!)}
        ></IonInput>
        <IonButton onClick={handleCancel}>Cancel</IonButton>
        <IonButton onClick={handleLogin}>Login</IonButton>
      </IonModal>
    </IonContent>
  );
};

export default UnlockSessionModal;
