import { IonLabel, IonList, IonListHeader } from "@ionic/react";
import SessionListItem from "../components/SessionListItem";
import { useFetchSessionsQuery } from "../store/api";

const SessionsPage: React.FC = () => {
  const { data, isLoading } = useFetchSessionsQuery();

  return (
    <>
      <IonListHeader>
        <IonLabel>Sessions</IonLabel>
      </IonListHeader>
      <IonList>
        {data?.Sessions.map((session) => (
          <SessionListItem session={session} />
        ))}
      </IonList>
    </>
  );
};

export default SessionsPage;
