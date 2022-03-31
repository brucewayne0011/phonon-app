import { IonBackButton, IonButtons, IonHeader, IonToolbar } from "@ionic/react";
import React from "react";
import icon from "../assets/icon.svg";

const Header: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="" />
        </IonButtons>
        <div className="flex flex-row content-center justify-center">
          <img src={icon} className="mr-1 w-7" alt="logo" />
          <h2 className="logoHeader">PHONON</h2>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
