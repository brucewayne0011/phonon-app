import { IonButton, IonItem, IonLabel } from "@ionic/react";
import { useState } from "react";

import UnlockSessionModal from "./UnlockSessionModal";

const SessionListItem: React.FC<{ session: string }> = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IonItem button onClick={() => setIsOpen(true)} detail>
        <IonLabel>{session}</IonLabel>

        <IonButton fill="clear" slot="end">
          Unlock
        </IonButton>
      </IonItem>
      <UnlockSessionModal
        session={session}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default SessionListItem;
