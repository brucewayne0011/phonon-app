import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IonAvatar,
  IonItem,
  IonLabel,
  IonSpinner,
  IonText,
} from "@ionic/react";
import React from "react";
import { useParams } from "react-router";
import { NETWORKS } from "../constants/networks";
import "../index.css";
import { NetworkValue } from "../types";
import { weiToEth } from "../utils/denomination";

const NetworkListItem: React.FC<NetworkValue & { isLoading: boolean }> = ({
  networkId,
  value,
  isLoading,
}) => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const network = NETWORKS[networkId];
  const label = weiToEth(value?.toString() ?? "0");

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
            {isLoading ? <IonSpinner /> : label} {network.ticker}
          </h1>
        </IonText>
      </IonLabel>
    </IonItem>
  );
};

export default NetworkListItem;
