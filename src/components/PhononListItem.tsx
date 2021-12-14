import { faBtc, faEthereum } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonAvatar, IonItem, IonLabel } from "@ionic/react";
import "../index.css";
import { Phonon } from "../types";
import RedeemPhononButton from "./RedeemPhononButton";
import SendPhononButton from "./SendPhononButton";

const PhononListItem: React.FC<{ phonon: Phonon }> = ({ phonon }) => {
  return (
    <IonItem>
      <IonAvatar slot="start">
        <FontAwesomeIcon
          icon={phonon.type === 1 ? faBtc : faEthereum}
          size="2x"
          className={phonon.type === 1 ? "text-yellow-200" : "text-indigo-300"}
        />
      </IonAvatar>
      <IonLabel>
        <h2>
          {phonon.value} {phonon.type === 1 ? "BTC" : "ETH"}
        </h2>
        <p>{phonon.pubKey}</p>
      </IonLabel>
      {/* <IonSendPhononModal index={item.index} />, */}
      <SendPhononButton index={phonon.index} />
      <RedeemPhononButton index={phonon.index} />
    </IonItem>
  );
};

export default PhononListItem;
