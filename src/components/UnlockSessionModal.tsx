import { IonButton, IonInput } from "@ionic/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUnlockSessionMutation } from "../store/api";

interface UnlockSessionModalProps {
  session: string;
  onDismiss: () => void;
  onSubmit: () => void;
}

const UnlockSessionModal: React.FC<UnlockSessionModalProps> = ({
  session,
  onDismiss,
  onSubmit,
}) => {
  const [pin, setPin] = useState<string>();
  const [unlockSession] = useUnlockSessionMutation();
  let navigate = useNavigate();

  const handleOk = (sessionId: string) => {
    unlockSession({ sessionId, pin })
      .unwrap()
      .then(() => {
        navigate(`/${session}/`);
      })
      // TODO: Handle error and display something to the user
      .catch((err) => "error");
  };

  return (
    <div>
      <h1>{session}</h1>
      <IonInput
        value={pin}
        placeholder="Enter Password"
        type="password"
        onIonChange={(e) => setPin(e.detail.value!)}
      ></IonInput>
      <IonButton onClick={() => onDismiss()}>Cancel</IonButton>
      <IonButton>Login</IonButton>
    </div>
  );
};

export default UnlockSessionModal;
