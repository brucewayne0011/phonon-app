import React from "react";
import { IonIcon } from "@ionic/react";

const NoticeBadge: React.FC<{
  icon: string;
  theme?: string;
  children?;
}> = ({ icon, theme = "neutral", children }) => {
  // themes for the badge
  const themes = {
    neutral: {
      bgColor: "bg-gray-300",
      bgIconColor: "bg-gray-500",
      textColor: "text-gray-800",
    },
    error: {
      bgColor: "bg-red-300",
      bgIconColor: "bg-red-500",
      textColor: "text-red-800",
    },
  };

  return (
    <div className="">
      <div
        className={
          "p-2 rounded shadow-lg sm:p-3 " + String(themes[theme].bgColor)
        }
      >
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span
              className={
                "flex p-2 rounded-lg " + String(themes[theme].bgIconColor)
              }
            >
              <IonIcon color="white" icon={icon} />
            </span>
            <p
              className={"ml-3 font-medium " + String(themes[theme].textColor)}
            >
              {children}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeBadge;
