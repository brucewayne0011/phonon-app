import {
  IonButtons,
  IonContent,
  IonList,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreatePhononButton from "../components/CreatePhononButton";
import PhononListItem from "../components/PhononListItem";
import ReceivePhononButton from "../components/ReceivePhononButton";
import { NETWORKS } from "../constants/networks";
import { useFetchPhononsQuery } from "../store/api";

const SessionsPage: React.FC = () => {
  const { sessionId, networkId } = useParams<{
    sessionId: string;
    networkId: string;
  }>();
  const { data, refetch, isLoading, isUninitialized } = useFetchPhononsQuery({
    sessionId,
  });
  const network = NETWORKS[parseInt(networkId)];

  function refresh(event: CustomEvent<any>) {
    refetch();
    event.detail.complete();
  }

  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    const total = data
      ?.filter((p) => p.type === parseInt(networkId))
      .map((p) => p.value)
      .reduce((prev, cur) => prev + cur, 0);
    setTotal(total ? total : 0);
  }, [data, networkId]);

  useEffect(() => {
    console.log({ isLoading });
  }, [isLoading]);
  useEffect(() => {
    console.log({ isUninitialized });
  }, [isUninitialized]);
  return (
    <IonContent>
      <div className="mt-2 text-center">
        <p className="text-xs font-extrabold text-zinc-500">WALLET</p>
        <p className="mb-3">
          {total} {network?.symbol}
        </p>
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
          {data
            ?.filter((item) => item.type === parseInt(networkId))
            .map((item) => (
              <PhononListItem phonon={item} key={item.pubKey} />
            ))}
        </IonList>
      </IonContent>
    </IonContent>
  );
};

export default SessionsPage;
