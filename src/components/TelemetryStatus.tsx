import { IonIcon } from "@ionic/react";
import { cloudOffline, cloudDone } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import { useTelemetryStatusQuery } from "../store/api";

export const TelemetryStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(false);

  const { error } = useTelemetryStatusQuery(undefined, {
    pollingInterval: 30000,
  });

  useEffect(() => {
    setIsOnline(!error);
  }, [error]);

  return (
    <div className="fixed bottom-2 right-2 opacity-50" title="Telemetry status">
      {isOnline ? (
        <div className="flex text-green-500 gap-x-2 items-center">
          <IonIcon className="h-3 w-3 animate-pulse" icon={cloudDone} />
          <span className="text-xs">Telemetry Connected</span>
        </div>
      ) : (
        <div className="flex text-red-500 gap-x-2 items-center">
          <IonIcon className="h-3 w-3" icon={cloudOffline} />
          <span className="text-xs">Telemetry Disconnected</span>
        </div>
      )}
    </div>
  );
};
