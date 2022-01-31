import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonAvatar, IonItem, IonLabel } from "@ionic/react";
import React from "react";
import { NETWORKS } from "../constants/networks";
import "../index.css";
import { Phonon } from "../types";
import RedeemPhononButton from "./RedeemPhononButton";
import SendPhononButton from "./SendPhononButton";

const PhononListItem: React.FC<{ phonon: Phonon }> = ({ phonon }) => {
  const network = NETWORKS[phonon.type];

  return (
    <IonItem>
      <IonAvatar slot="start">
        <FontAwesomeIcon
          icon={network.icon}
          size="2x"
          className={network.textColor}
        />
      </IonAvatar>
      <IonLabel>
        <h2>
          {phonon.value} {network.ticker}
        </h2>
        <p>{phonon.pubKey}</p>
      </IonLabel>
      <SendPhononButton index={phonon.index} />
      <RedeemPhononButton index={phonon.index} />
    </IonItem>
  );
};

export default PhononListItem;
