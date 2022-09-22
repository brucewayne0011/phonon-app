import { IonSpinner } from "@ionic/react";
import React from "react";

export default function LoadingMessage({ children }: { children }) {
  return (
    <div className="text-xl mt-8 mx-auto flex items-center">
      <IonSpinner className="mr-2" />
      {children}
    </div>
  );
}
