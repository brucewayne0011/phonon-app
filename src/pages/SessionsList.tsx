import { IonButton, IonList } from "@ionic/react";
import React from "react";
import SessionListItem from "../components/SessionListItem";
import { useCreateMockCardMutation, useFetchSessionsQuery } from "../store/api";

const SessionsPage: React.FC = () => {
  const { data } = useFetchSessionsQuery();
  const [createMockCard, { isLoading }] = useCreateMockCardMutation();

  return (
    <>
      <h2 className="my-2 text-lg text-center">Wallets</h2>
      {data && (
        <IonList>
          {data.map((session) => (
            <SessionListItem session={session} key={session.Id} />
          ))}
        </IonList>
      )}

      {!data && (
        <div className="text-center">
          <p className="mt-10">No phonon cards detected.</p>
          <p className="text-sm mt-5">
            Create a mock card below to preview the Phonon Protocol features.
            Please note, mock cards have a different certificate then alpha and
            test net phonon cards and thefore cannot communicate with them.
          </p>
          <IonButton
            color="primary"
            fill="outline"
            onClick={() => createMockCard()}
            className="mt-4"
            disabled={isLoading}
          >
            Create mock card
          </IonButton>
        </div>
      )}
    </>
  );
};

export default SessionsPage;
