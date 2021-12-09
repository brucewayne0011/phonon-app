import { IonButton, IonItem, IonLabel, useIonModal } from "@ionic/react";
import { useState } from "react";
import UnlockSessionModal from "./UnlockSessionModal";

const SessionListItem: React.FC<{ session: string }> = ({ session }) => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDismiss = () => {
    dismiss();
  };

  /**
   * First parameter is the component to show, second is the props to pass
   */
  const [present, dismiss] = useIonModal(UnlockSessionModal, {
    session,
    onDismiss: handleDismiss,
    onIncrement: handleIncrement,
  });

  return (
    <IonItem>
      <IonLabel>{session}</IonLabel>

      <IonButton fill="outline" slot="end" onClick={() => present()}>
        Unlock
      </IonButton>
    </IonItem>
  );
};

export default SessionListItem;
