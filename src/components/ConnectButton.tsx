import { IonBadge, IonButton } from "@ionic/react";
import React from "react";
import { useSession } from "../hooks/useSession";
import { useConnectionStatusQuery, useConnectMutation } from "../store/api";

export const ConnectButton: React.FC = () => {
  const { sessionId } = useSession();
  const [connect, { isLoading }] = useConnectMutation();
  const [isHovering, setIsHovering] = React.useState(false);

  const { data, refetch } = useConnectionStatusQuery(
    { sessionId },
    { pollingInterval: 1000 }
  );
  const isConnected = !!data?.ConnectionStatus;

  if (isConnected) {
    return (
      <IonBadge color="success" className="mr-2 hidden md:flex">
        Connected to Server
      </IonBadge>
    );
  }

  return (
    <IonButton
      fill={"outline"}
      onClick={() => {
        connect({ sessionId })
          .then(() => refetch())
          .catch(console.error);
      }}
      color={isHovering ? "tertiary" : "secondary"}
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => setIsHovering(false)}
      disabled={isConnected || isLoading}
    >
      {isLoading ? "connecting..." : "connect to server"}
    </IonButton>
  );
};
