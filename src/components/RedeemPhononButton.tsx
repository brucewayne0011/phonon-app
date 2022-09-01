import { IonButton, IonIcon, useIonToast } from "@ionic/react";
import { lockClosedOutline, logOutOutline } from "ionicons/icons";
import React from "react";
import { useModal } from "../hooks/useModal";
import RedeemPhononModal from "./RedeemPhononModal";

const RedeemPhononButton: React.FC<{
  phonon: PhononDTO;
  selectedPhonon: PhononDTO | undefined;
  setSelectedPhonon: React.Dispatch<
    React.SetStateAction<PhononDTO | undefined>
  >;
}> = ({ phonon, selectedPhonon, setSelectedPhonon }) => {
  const { showModal, hideModal, isModalVisible } = useModal();
  const [present] = useIonToast();

  // event to show redeem modal
  const handleOnClick = () => {
    if (!phonon) {
      return present({
        header: "Error",
        message: "Must select a Phonon to redeem",
        icon: lockClosedOutline,
        duration: 2000,
        color: "danger",
        cssClass: "text-md text-center font-black uppercase",
        translucent: true,
        position: "top",
      });
    } else {
      showModal();
    }
  };

  return (
    <>
      <IonButton
        fill="outline"
        color={"tertiary"}
        onClick={handleOnClick}
        slot="end"
      >
        <IonIcon slot="end" icon={logOutOutline} />
        Redeem Selected Phonon
      </IonButton>
      {phonon ? (
        <RedeemPhononModal
          {...{
            isModalVisible,
            hideModal,
            phonon,
            selectedPhonon,
            setSelectedPhonon,
          }}
        />
      ) : null}
    </>
  );
};

export default RedeemPhononButton;
