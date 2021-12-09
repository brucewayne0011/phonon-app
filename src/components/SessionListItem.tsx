import { IonButton, IonItem, IonLabel } from "@ionic/react";
import { useState } from "react";
import UnlockSessionModal from "./UnlockSessionModal";

const SessionListItem: React.FC<{ session: string }> = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <IonItem>
      <IonLabel>{session}</IonLabel>

      <IonButton fill="outline" slot="end" onClick={() => setIsOpen(true)}>
        Unlock
      </IonButton>
      <UnlockSessionModal
        session={session}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </IonItem>
  );
};

export default SessionListItem;
