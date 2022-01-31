import { IonButton, IonIcon, useIonRouter } from "@ionic/react";
import { addSharp } from "ionicons/icons";
import React from "react";
import { useParams } from "react-router";

export default function CreatePhononButton() {
  const { sessionId, networkId } = useParams<{
    sessionId: string;
    networkId: string;
  }>();
  const router = useIonRouter();

  const goToCreatePage = () => {
    router.push(`/${sessionId}/${networkId}/create`);
  };

  return (
    <>
      <IonButton
        fill="outline"
        color="primary"
        slot="secondary"
        onClick={goToCreatePage}
        className="shadow-lg shadow-blue-300/20"
      >
        <IonIcon slot="start" icon={addSharp} />
        Create
      </IonButton>
    </>
  );
}
