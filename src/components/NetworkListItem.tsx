import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonAvatar, IonItem, IonLabel, IonText } from "@ionic/react";
import React from "react";
import { useParams } from "react-router";
import { NETWORKS } from "../constants/networks";
import "../index.css";
import { NetworkValue } from "../types";

const NetworkListItem: React.FC<NetworkValue> = ({ networkId, value }) => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const network = NETWORKS[networkId];

  return (
    <IonItem routerLink={`/${sessionId}/${networkId}/`}>
      <IonAvatar slot="start">
        <FontAwesomeIcon
          icon={network.icon}
          size="2x"
          className={network.textColor}
        />
      </IonAvatar>
      <IonLabel>
        <IonText color="light">
          <h1 className="text-xl">
            {value} {network.ticker}
          </h1>
        </IonText>
      </IonLabel>
    </IonItem>
  );
};

export default NetworkListItem;
