import React from "react";
import { IonIcon } from "@ionic/react";
import { useModal } from "../hooks/useModal";

import NameSessionModal from "./NameSessionModal";
import { pencilOutline } from "ionicons/icons";
import { useSession } from "../hooks/useSession";

export default function SessionNameHeader() {
  const { showModal, hideModal, isModalVisible } = useModal();
  const { sessionName } = useSession();

  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const handleOnClick = () => {
    showModal();
  };

  return (
    <>
      <div
        className="flex my-5 justify-center items-center cursor-pointer"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleOnClick}
      >
        <h1 className="text-2xl">{sessionName}</h1>
        {isHovering && <IonIcon icon={pencilOutline} />}
      </div>

      <NameSessionModal {...{ isModalVisible, hideModal }} />
    </>
  );
}
