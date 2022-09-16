import { IonButtons, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import icon from "../assets/icon.svg";
import CardLockButton from "../components/CardLockButton";
import { ConnectButton } from "../components/ConnectButton";
import { MetaMaskAuth } from "../components/MetaMaskAuth";
import { hasMetamaskInstalled } from "../utils/validation";

const Header: React.FC<{
  isConnectedToServer: boolean;
}> = ({ isConnectedToServer }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <div className="md:flex mx-3">
          <div className="flex mb-2">
            <IonButtons slot="start">
              <CardLockButton />
              <ConnectButton isConnectedToServer={isConnectedToServer} />
            </IonButtons>
          </div>
          <div className="flex w-full justify-between mb-2">
            <IonTitle>
              <div className="flex flex-row content-center justify-center">
                <img src={icon} className="mr-1 w-7" alt="logo" />
                <h2 className="logoHeader hidden md:inline">PHONON</h2>
              </div>
            </IonTitle>
            {hasMetamaskInstalled() && (
              <IonButtons slot="end">
                <MetaMaskAuth />
              </IonButtons>
            )}
          </div>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
