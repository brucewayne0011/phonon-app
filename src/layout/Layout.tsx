import { IonContent, IonPage } from "@ionic/react";
import Header from "./Header";

const Layout: React.FC = ({ children }) => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>{children}</IonContent>
    </IonPage>
  );
};

export default Layout;
