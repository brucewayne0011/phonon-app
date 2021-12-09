import {
  IonButton,
  IonIcon,
  IonInput,
  IonModal,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useState } from "react";
import { useParams } from "react-router";
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
      <IonButton fill="outline" slot="secondary" onClick={showCreateModal}>
        <IonIcon slot="start" icon={add} />
        Create
      </IonButton>

      <IonModal
        isOpen={isModalVisible}
        // title="Create Phonon"
        // visible={isModalVisible}
        // bodyStyle={{ textAlign: "center" }}
        // onOk={useHandleOk}
        // onCancel={handleCancel}
      >
        <IonInput
          placeholder="Amount"
          type={"number"}
          min={"1"}
          defaultValue={1}
          onIonChange={(e) => handleOnInputChange(parseInt(e.detail.value!))}
          disabled={requestPending}
        />
        <IonSelect
          placeholder="Currency"
          onIonChange={(e) => handleOnSelectChange(e.detail.value)}
          defaultValue={1}
          disabled={requestPending}
        >
          <IonSelectOption value={1}>Bitcoin</IonSelectOption>
          <IonSelectOption value={2}>Ethereum</IonSelectOption>
        </IonSelect>
        <IonButton key="back" onClick={handleCancel} disabled={requestPending}>
          Cancel
        </IonButton>
        <IonButton
          key="submit"
          // type="primary"
          // loading={requestPending}
          onClick={useHandleOk}
        >
          Create
        </IonButton>
      </IonModal>
    </>
  );
}
