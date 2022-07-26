import { IonButton, IonItem, IonLabel } from "@ionic/react";
import React, { useState } from "react";
import InitSessionModal from "./InitSessionModal";
import UnlockSessionModal from "./UnlockSessionModal";

type Props = {
  session: Session;
};

const SessionListItem: React.FC<Props> = ({ session }) => {
  const [isUnlockOpen, setIsUnlockOpen] = useState(false);
  const [isInitOpen, setIsInitOpen] = useState(false);

  const displayName = session.Name ? session.Name : session.Id;

  return (
    <>
      <IonItem detail>
        <IonLabel>{displayName}</IonLabel>
        {session.Initialized ? (
          <IonButton
            fill="clear"
            slot="end"
            onClick={() => setIsUnlockOpen(true)}
          >
            Unlock
          </IonButton>
        ) : (
          <IonButton
            fill="clear"
            slot="end"
            onClick={() => setIsInitOpen(true)}
          >
            Initialize
          </IonButton>
        )}
      </IonItem>

      <UnlockSessionModal
        sessionId={session.Id}
        isOpen={isUnlockOpen}
        setIsOpen={setIsUnlockOpen}
      />
      <InitSessionModal
        sessionId={session.Id}
        isOpen={isInitOpen}
        setIsOpen={setIsInitOpen}
      />
    </>
  );
};

export default SessionListItem;
