import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import icon from "../assets/icon.svg";

const Header: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <img src={icon} className="w-1" alt="logo" style={{ width: "70px" }} />
        <IonTitle>PHONON</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
