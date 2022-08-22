import {
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CreatePhononButton from "../components/CreatePhononButton";
import SessionNameHeader from "../components/SessionNameHeader";
import NoticeBadge from "../components/NoticeBadge";
import PhononListItem from "../components/PhononListItem";
import MinePhononButton from "../components/MinePhononButton";
import ReceivePhononButton from "../components/ReceivePhononButton";
import RedeemPhononButton from "../components/RedeemPhononButton";
import SendPhononButton from "../components/SendPhononButton";
import { useSession } from "../hooks/useSession";
import useChain from "../hooks/useChain";
import Layout from "../layout/Layout";
import { bulb } from "ionicons/icons";
import { useFetchPhononsQuery, useMinePhononStatusQuery } from "../store/api";

const PhononsList: React.FC = () => {
  const { sessionId, activeSession, isSessionLoading } = useSession();
  const { isAuthenticated } = useChain();
  const router = useIonRouter();

  const { data: allMiningAttempts, refetch: miningStatusRefetch } =
    useMinePhononStatusQuery({ sessionId }, { pollingInterval: 1000 });

  const [selectedPhonon, setSelectedPhonon] = useState<PhononDTO>();
  const { data, refetch, isLoading, isFetching, isError } =
    useFetchPhononsQuery({
      sessionId,
    });

  if (isError || (!isSessionLoading && !activeSession)) {
    //TODO: Improve how this works. It's a bit hacky.
    router.push("/");
    window.location.reload();
  }

  function refresh(event: CustomEvent<any>) {
    refetch();
    event.detail.complete();
  }

  return (
    <Layout>
      <div className="mx-4">
        <SessionNameHeader />
        {!isAuthenticated && (
          <NoticeBadge icon={bulb}>
            Welcome to the testnet phonon app! Connect your browser wallet to
            create phonons from your wallet.
          </NoticeBadge>
        )}
        <div className="flex gap-x-2 justify-between md:justify-start md:gap-x-5 my-3">
          <MinePhononButton allMiningAttempts={allMiningAttempts} />
          {isAuthenticated && <CreatePhononButton />}
          <ReceivePhononButton />
        </div>

        {isLoading || isFetching ? (
          <div className="w-full flex justify-center align-middle">
            <IonSpinner />
          </div>
        ) : (
          <>
            <IonRefresher
              slot="fixed"
              onIonRefresh={refresh}
              closeDuration={"50ms"}
            >
              <IonRefresherContent></IonRefresherContent>
            </IonRefresher>

            <IonList className="overflow-auto max-h-[calc(100vh_-_350px)] rounded mb-5">
              {data !== undefined && data.length > 0 ? (
                data?.map((p) => (
                  <ErrorBoundary
                    FallbackComponent={({ error }) => (
                      <div className="p-3 uppercase font-black">
                        <p className="text-xs">Failed to load phonon</p>
                        <p className="text-xs text-red-400">{error.message}</p>
                      </div>
                    )}
                    key={p.PubKey}
                  >
                    <PhononListItem
                      phonon={p}
                      {...{ selectedPhonon, setSelectedPhonon }}
                    />
                  </ErrorBoundary>
                ))
              ) : (
                <span className="px-4 py-2">
                  You currently have no phonons on this card.
                </span>
              )}
            </IonList>
          </>
        )}

        {selectedPhonon && (
          <div className="grid md:flex gap-x-5 my-3 md:justify-end">
            <SendPhononButton
              phonon={selectedPhonon}
              {...{ selectedPhonon, setSelectedPhonon }}
            />
            <RedeemPhononButton
              phonon={selectedPhonon}
              {...{ selectedPhonon, setSelectedPhonon }}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PhononsList;
