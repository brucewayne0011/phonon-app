import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonModal,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { addSharp } from "ionicons/icons";
import { useState } from "react";
import { useParams } from "react-router";
import icon from "../assets/icon.svg";
import {
  useCreatePhononMutation,
  useSetDescriptorMutation,
} from "../store/api";

export default function CreatePhononButton() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [requestPending, setRequestPending] = useState(false);
  const [inputValue, setInputValue] = useState(1);
  const [selectValue, setSelectValue] = useState(1);
  const [createPhonon] = useCreatePhononMutation();
  const [setDescriptor] = useSetDescriptorMutation();

  const showCreateModal = () => {
    setIsModalVisible(true);
  };

  const useHandleOk = async () => {
    setRequestPending(true);
    createPhonon({ sessionId })
      .unwrap()
      .then((payload) =>
        setDescriptor({
          index: payload.index,
          currencyType: selectValue,
          value: inputValue,
          sessionId,
        })
      );
    setRequestPending(false);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setInputValue(1);
    setIsModalVisible(false);
    setRequestPending(false);
  };

  const handleOnInputChange = (value: number) => {
    setInputValue(value);
  };

  const handleOnSelectChange = (value: number) => {
    setSelectValue(value);
  };

  return (
    <>
      <IonButton
        fill="outline"
        color="primary"
        slot="secondary"
        onClick={showCreateModal}
        className="shadow-lg shadow-blue-300/20"
      >
        <IonIcon slot="start" icon={addSharp} />
        Create
      </IonButton>

      <IonModal isOpen={isModalVisible}>
        <div className="flex flex-col justify-start content-center p-12 h-full">
          <p className="text-xs text-center text-gray-500 uppercase font-bold mb-2">
            Create Phonon
          </p>

          <img src={icon} className="mx-auto w-32" alt="logo" />

          <div>
            <IonItem className="my-5">
              <IonInput
                placeholder="Amount"
                type={"number"}
                min={"1"}
                defaultValue={1}
                onIonChange={(e) =>
                  handleOnInputChange(parseInt(e.detail.value!))
                }
                disabled={requestPending}
              />
            </IonItem>
            <IonItem className="my-5">
              <IonSelect
                placeholder="Currency"
                onIonChange={(e) => handleOnSelectChange(e.detail.value)}
                defaultValue={1}
                disabled={requestPending}
              >
                <IonSelectOption value={1}>Bitcoin</IonSelectOption>
                <IonSelectOption value={2}>Ethereum</IonSelectOption>
              </IonSelect>
            </IonItem>
          </div>
          <div className="flex flex-row justify-evenly">
            <IonButton
              key="back"
              color="medium"
              fill="clear"
              expand="block"
              onClick={handleCancel}
              disabled={requestPending}
            >
              Cancel
            </IonButton>
            <IonButton
              key="submit"
              fill="solid"
              expand="block"
              color="primary"
              onClick={useHandleOk}
              className="shadow-lg shadow-teal-300/40"
            >
              Create
            </IonButton>
          </div>
        </div>
      </IonModal>
    </>
  );
}
