import { Clipboard } from "@capacitor/clipboard";
import { IonAlert, IonButton, IonIcon } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useParams } from "react-router";
import "../index.css";
import { useRedeemPhononMutation } from "../store/api";

const RedeemPhononButton: React.FC<{ index: number }> = ({ index }) => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [redeemPhonon] = useRedeemPhononMutation();
  const [showAlert, setShowAlert] = useState(false);
  const [privateKey, setPrivateKey] = useState("");

  const handleRedeem = () =>
    redeemPhonon({ index, sessionId })
      .unwrap()
      .then(({ privateKey }) => {
        setPrivateKey(privateKey);
        setShowAlert(true);
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
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Redeemed Phonon"
        subHeader={privateKey}
        buttons={[
          {
            text: "Close",
            role: "cancel",
            cssClass: "secondary",
            id: "cancel-button",
          },
          {
            text: "Copy",
            id: "confirm-button",
            handler: () => {
              Clipboard.write({ string: privateKey }).catch(console.error);
            },
          },
        ]}
      />
    </>
  );
};

export default RedeemPhononButton;
