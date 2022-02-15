import {
  IonContent,
  IonList,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import uniqBy from "lodash/uniqBy";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NetworkListItem from "../components/NetworkListItem";
import { NETWORKS } from "../constants/networks";
import { useFetchPhononsQuery } from "../store/api";
import { NetworkValue, Phonon } from "../types";

const NetworkList: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { data, refetch, isLoading } = useFetchPhononsQuery({ sessionId });
  const [networkValues, setNetworkValues] = useState<NetworkValue[] | null>(
    null
  );

  useEffect(() => {
    const networks: number[] = uniqBy(data, "type")
      .map((p: Phonon) => p.type)
      .sort() as number[];

    const totalValueByNetwork: NetworkValue[] = NETWORKS.map((network, i) => ({
      value: data
        ?.filter((p) => p.CurrencyType === i)
        .map((p) => p.Denomination)
        .reduce((prev, cur) => prev + cur, 0),
      networkId: i,
    }));

    setNetworkValues(totalValueByNetwork);
  }, [data]);

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

      <IonContent>
        <IonRefresher
          slot="fixed"
          onIonRefresh={refresh}
          closeDuration={"50ms"}
        >
          <IonRefresherContent />
        </IonRefresher>
        <IonList>
          {networkValues?.map(({ networkId, value }) => (
            <NetworkListItem
              key={networkId}
              {...{ isLoading, networkId, value }}
            />
          ))}
        </IonList>
      </IonContent>
    </IonContent>
  );
};

export default NetworkList;
