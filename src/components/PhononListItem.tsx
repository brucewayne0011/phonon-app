import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonAvatar, IonItem, IonLabel, IonSpinner } from "@ionic/react";
import React from "react";
import { NETWORKS } from "../constants/networks";
import "../index.css";
import { PhononDTO } from "../types";
import RedeemPhononButton from "./RedeemPhononInlineButton";
import SendPhononButton from "./SendPhononButton";

const PhononListItem: React.FC<{ phonon: PhononDTO }> = ({ phonon }) => {
  const network = NETWORKS[phonon.CurrencyType];

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
          {phonon.Denomination > 0 ? phonon.Denomination : <IonSpinner />}{" "}
          {network.ticker}
        </h2>
        <p>{phonon.PubKey}</p>
      </IonLabel>
      <SendPhononButton index={phonon.KeyIndex} />
      <RedeemPhononButton index={phonon.KeyIndex} />
    </IonItem>
  );
};

export default PhononListItem;
