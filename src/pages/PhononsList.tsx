import {
  IonButtons,
  IonContent,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import CreatePhononButton from "../components/CreatePhononButton";
import PhononListItem from "../components/PhononListItem";
import ReceivePhononButton from "../components/ReceivePhononButton";
import { useFetchPhononsQuery } from "../store/api";

const SessionsPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { data, isLoading } = useFetchPhononsQuery({ sessionId });

  return (
    <IonContent>
      <h1>{sessionId}</h1>
      <IonToolbar>
        <IonButtons slot="secondary">
          <CreatePhononButton />
        </IonButtons>
        <IonTitle>Phonons</IonTitle>
        <IonButtons slot="primary">
          <ReceivePhononButton />
        </IonButtons>
      </IonToolbar>

      <IonList>
        {data?.map((item) => (
          <PhononListItem phonon={item} />
        ))}
      </IonList>
    </IonContent>
  );
};

export default SessionsPage;
