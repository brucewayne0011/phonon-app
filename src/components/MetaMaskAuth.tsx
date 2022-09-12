import { IonButton } from "@ionic/react";
import React from "react";
import useChain from "../hooks/useChain";

import ChainBadge from "./ChainBadge";

export const MetaMaskAuth = () => {
  const { authenticate, chain, currentAccount } = useChain();

  return (
    <>
      {currentAccount ? (
        <>
          <ChainBadge chain={chain ? chain : undefined} />
          <IonButton
            fill="outline"
            color="secondary"
            slot="end"
            // TODO: logout on click
          >
            0x&#8230;{currentAccount.slice(-8)}
          </IonButton>
        </>
      ) : (
        <IonButton
          fill="outline"
          color="primary"
          slot="end"
          onClick={authenticate}
        >
          Connect Wallet
        </IonButton>
      )}
    </>
  );
};
