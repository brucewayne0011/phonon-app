import {
  IonButtons,
  IonContent,
  IonList,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import React from "react";
import { useParams } from "react-router-dom";
import CreatePhononButton from "../components/CreatePhononButton";
import PhononListItem from "../components/PhononListItem";
import ReceivePhononButton from "../components/ReceivePhononButton";
import { useFetchPhononsQuery } from "../store/api";

const SessionsPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { data, refetch } = useFetchPhononsQuery({ sessionId });

  function refresh(event: CustomEvent<any>) {
    refetch();
    event.detail.complete();
  }

  return (
    <IonContent>
      <div className="mt-2 text-center">
        <p className="text-xs font-extrabold text-zinc-500">WALLET</p>
        <p className="mb-3">{sessionId}</p>
      </div>
      <div className="flex mb-5 justify-evenly">
        <IonButtons slot="secondary">
          <CreatePhononButton />
        </IonButtons>
        <IonButtons slot="end">
          <ReceivePhononButton />
        </IonButtons>
      </div>

      <IonContent>
        <IonRefresher
          slot="fixed"
          onIonRefresh={refresh}
          closeDuration={"50ms"}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonList>
          {data?.map((item) => (
            <PhononListItem phonon={item} key={item.pubKey} />
          ))}
        </IonList>
      </IonContent>
    </IonContent>
  );
};

export default SessionsPage;
