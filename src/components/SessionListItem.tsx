import { IonButton, IonItem, IonLabel } from "@ionic/react";
import React, { useState } from "react";
import UnlockSessionModal from "./UnlockSessionModal";
import SetSessionNameModal from "./SetSessionNameModal";
import useSessionDisplayName from "../hooks/useSessionDisplayName";

type Props = {
  sessionId: string;
};

const SessionListItem: React.FC<Props> = ({ sessionId }) => {
  const [isUnlockOpen, setIsUnlockOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);

  const displayName = useSessionDisplayName(sessionId);

  return (
    <>
      <IonItem detail>
        <IonLabel>{displayName}</IonLabel>
        <IonButton
          fill="clear"
          slot="end"
          onClick={() => setIsRenameOpen(true)}
        >
          Rename
        </IonButton>
        <IonButton
          fill="clear"
          slot="end"
          onClick={() => setIsUnlockOpen(true)}
        >
          Unlock
        </IonButton>
      </IonItem>
      <UnlockSessionModal
        sessionId={sessionId}
        isOpen={isUnlockOpen}
        setIsOpen={setIsUnlockOpen}
      />
      <SetSessionNameModal
        sessionId={sessionId}
        isOpen={isRenameOpen}
        setIsOpen={setIsRenameOpen}
      />
    </>
  );
};

export default SessionListItem;
