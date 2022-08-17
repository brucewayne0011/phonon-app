import React from "react";
import { IonIcon } from "@ionic/react";

const NoticeBadge: React.FC<{
  icon: string;
  children?;
}> = ({ icon, children, ...rest }) => {
  return (
    <div className="">
      <div className="p-2 rounded bg-gray-300 shadow-lg sm:p-3">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-gray-500">
              <IonIcon color="white" icon={icon} />
            </span>
            <p className="ml-3 font-medium text-gray-800">{children}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeBadge;
