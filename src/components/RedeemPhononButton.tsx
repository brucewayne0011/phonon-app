import { IonButton, IonIcon, IonToast } from "@ionic/react";
import { informationCircle, logOutOutline } from "ionicons/icons";
import { useState } from "react";
import { useParams } from "react-router";
import "../index.css";
import { useRedeemPhononMutation } from "../store/api";

const RedeemPhononButton: React.FC<{ index: number }> = ({ index }) => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [redeemPhonon] = useRedeemPhononMutation();
  const [showToast, setShowToast] = useState(false);
  const [privateKey, setPrivateKey] = useState("");

  const handleRedeem = () =>
    redeemPhonon({ index, sessionId })
      .unwrap()
      .then(({ privateKey }) => {
        setShowToast(true);
        setPrivateKey(privateKey);
      });

  return (
    <>
      <IonButton
        color="tertiary"
        fill="clear"
        slot="end"
        onClick={() => handleRedeem()}
      >
        <IonIcon slot="end" icon={logOutOutline} />
        Redeem
      </IonButton>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={privateKey}
        icon={informationCircle}
        position="top"
        buttons={[
          {
            text: "Done",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            },
          },
        ]}
      />
    </>
  );
};

export default RedeemPhononButton;
