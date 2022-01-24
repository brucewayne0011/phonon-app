import { IonList } from "@ionic/react";

import SessionListItem from "../components/SessionListItem";
import { useFetchSessionsQuery } from "../store/api";

const SessionsPage: React.FC = () => {
  const { data, isLoading } = useFetchSessionsQuery();

  return (
    <>
      <h2 className="my-2 text-lg text-center">Wallets</h2>
      <IonList>
        {data?.Sessions.map((session) => (
          <SessionListItem session={session} key={session} />
        ))}
      </IonList>
    </>
  );
};

export default SessionsPage;
