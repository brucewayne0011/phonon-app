import { IonBadge, IonButton } from "@ionic/react";
import React from "react";
import { useSession } from "../hooks/useSession";
import { useConnectionStatusQuery, useConnectMutation } from "../store/api";

export const ConnectButton: React.FC<{
  isConnectedToServer: boolean;
}> = ({ isConnectedToServer }) => {
  const { sessionId } = useSession();
  const [connect, { isLoading }] = useConnectMutation();
  const [isHovering, setIsHovering] = React.useState(false);

  const { refetch } = useConnectionStatusQuery(
    { sessionId },
    { pollingInterval: 1000 }
  );

  if (isConnectedToServer) {
    return (
      <IonBadge color="success" className="mr-2">
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
      disabled={isConnectedToServer || isLoading}
    >
      {isLoading ? "connecting..." : "connect to server"}
    </IonButton>
  );
};
