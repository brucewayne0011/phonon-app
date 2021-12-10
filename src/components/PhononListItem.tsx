import { faBtc, faEthereum } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonAvatar, IonItem, IonLabel } from "@ionic/react";
import { useState } from "react";
import { useParams } from "react-router";
import "../index.css";
import { useRedeemPhononMutation } from "../store/api";
import { Phonon } from "../types";
import RedeemPhononButton from "./RedeemPhononButton";
import SendPhononButton from "./SendPhononButton";

const PhononListItem: React.FC<{ phonon: Phonon }> = ({ phonon }) => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const [redeemPhonon] = useRedeemPhononMutation();

  const handleRedeem = (index: number) =>
    redeemPhonon({ index, sessionId })
      .unwrap()
      .then(
        ({ privateKey }) => {
          const one = 1;
        }
        // TODO: Add
        // notification["success"]({
        //   message: "Phonon Successfully Redeemed",
        //   description: (
        //     <IonPopover content="Added to clipboard" trigger="click">
        //       <h2>{`Click to copy private key`}</h2>
        //       <h5>{privateKey}</h5>
        //     </IonPopover>
        //   ),
        //   duration: 0,
        //   onClick: () => navigator.clipboard.writeText(privateKey),
        // })
      );
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
