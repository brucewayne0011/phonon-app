import { IonButtons, IonContent, IonList } from "@ionic/react";
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
      <div className="mt-2 text-center">
        <p className="text-xs text-zinc-500 font-extrabold">SESSION</p>
        <p className="mb-2">{sessionId}</p>
      </div>
      <div className="flex justify-evenly my-2">
        <IonButtons slot="secondary">
          <CreatePhononButton />
        </IonButtons>
        <IonButtons slot="end">
          <ReceivePhononButton />
        </IonButtons>
      </div>

      <IonList>
        {data?.map((item) => (
          <PhononListItem phonon={item} />
        ))}
      </IonList>
    </IonContent>
  );
};

export default SessionsPage;
