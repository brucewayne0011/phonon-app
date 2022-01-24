import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import icon from "../assets/icon.svg";

const Header: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [isSessionActive, setIsSessionActive] = useState(false);
  useEffect(() => {
    setIsSessionActive(!!sessionId);
  }, [sessionId]);
  const router = useIonRouter();

  return (
    <IonHeader>
      <IonToolbar>
        {isSessionActive ? (
          <IonButtons slot="start">
            <IonButton color="light" onClick={() => router.push("/")}>
              <IonIcon slot="end" icon={chevronBack} />
            </IonButton>
          </IonButtons>
        ) : null}
        <div
          className="flex flex-row content-center justify-center"
          // style={{ marginLeft: "-70px" }}
        >
          <img src={icon} className="mr-1 w-7" alt="logo" />
          <h2 className="logoHeader">PHONON</h2>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
