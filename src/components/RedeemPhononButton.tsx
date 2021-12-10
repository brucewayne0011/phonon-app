import { IonButton, IonIcon } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { useParams } from "react-router";
import "../index.css";
import { useRedeemPhononMutation } from "../store/api";

const RedeemPhononButton: React.FC<{ index: number }> = ({ index }) => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [redeemPhonon] = useRedeemPhononMutation();

  const handleRedeem = () =>
    redeemPhonon({ index, sessionId })
      .unwrap()
      .then(
        ({ privateKey }) => {
          const one = 1;
        }
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
    <IonButton
      color="tertiary"
      fill="clear"
      slot="end"
      onClick={() => handleRedeem()}
      // className="shadow-lg shadow-pink-300/30"
    >
      <IonIcon slot="end" icon={logOutOutline} />
      Redeem
    </IonButton>
  );
};

export default RedeemPhononButton;
