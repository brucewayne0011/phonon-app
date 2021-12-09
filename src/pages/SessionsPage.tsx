import { IonLabel, IonList, IonListHeader } from "@ionic/react";
import SessionListItem from "../components/SessionListItem";

const sessions = ["04a85f4def001272", "04a85f4def001272", "04a85f4def001272"];
const SessionsPage: React.FC = () => {
  return (
    <>
      <IonListHeader>
        <IonLabel>Sessions</IonLabel>
      </IonListHeader>
      <IonList>
        {sessions.map((session) => (
          <SessionListItem session={session} />
        ))}
      </IonList>
    </>
  );
};

export default SessionsPage;
