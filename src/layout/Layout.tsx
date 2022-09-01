import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import Header from "./Header";

const Layout: React.FC<{
  isConnectedToServer: boolean;
  children?;
}> = ({ isConnectedToServer, children }) => {
  return (
    <IonPage>
      <Header isConnectedToServer={isConnectedToServer} />
      <IonContent fullscreen>{children}</IonContent>
    </IonPage>
  );
};

export default Layout;
