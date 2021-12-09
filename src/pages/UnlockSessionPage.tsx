import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
} from "@ionic/react";
import { useParams } from "react-router";
import "./Page.css";

const SessionsPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>SESSION</IonCardSubtitle>
          <IonCardTitle>04a85f4def001272</IonCardTitle>
        </IonCardHeader>

        <IonItem>
          {/* <IonIcon icon={lock} slot="start" /> */}
          <IonButton fill="outline" slot="end">
            Unlock
          </IonButton>
        </IonItem>
      </IonCard>
    </>
  );
};

export default SessionsPage;
