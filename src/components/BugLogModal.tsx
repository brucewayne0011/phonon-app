import { IonButton, IonIcon, IonModal } from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoggerMutation } from "../store/api";

export type ReportBugFormData = {
  userMessage: string;
  reproducibleSteps: string;
};

export default function BugLogModal({ isModalVisible, hideModal }: any) {
  const [userMessage, setUserMessage] = useState<string>("");
  const [reproducibleSteps, setReproducibleSteps] = useState<string>("");
  const [isBugReportSent, setIsBugReportSent] = useState<boolean>(false);
  const [submittedTimestamp, setSubmittedTimestamp] = useState<string>("");

  const [logger, { isLoading: isLogging }] = useLoggerMutation();

  // form set up
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<ReportBugFormData>();

  // event when you close the modal
  const destroyModal = () => {
    hideModal();

    resetForm();
  };

  // event when you submit a bug
  const onSubmit = async (data: ReportBugFormData, event) => {
    event.preventDefault();

    const reportPayload = {
      userMessage: userMessage,
      reproducibleSteps: reproducibleSteps,
      browserConsoleHistory: window.console["history"],
      userAgent: navigator.userAgent,
      env: process.env.NODE_ENV,
      version: process.env.REACT_APP_VERSION,
    };

    await logger(reportPayload).then(() => {
      setIsBugReportSent(true);

      // set timestamp of submitted
      setSubmittedTimestamp(new Date().toLocaleString());

      // reset the console history
      window.console["history"] = [];
    });
  };

  const resetForm = () => {
    reset();

    setIsBugReportSent(false);
  };

  return (
    <IonModal isOpen={isModalVisible} onDidDismiss={hideModal}>
      <div className="flex flex-col content-center justify-center h-full mx-10 gap-x-10 gap-y-2">
        {isBugReportSent ? (
          <div className="text-center">
            <IonIcon
              slot="end"
              icon={checkmarkCircle}
              className="text-green-500 text-5xl mx-auto"
            />
            <h3 className="text-2xl">
              Your bug has been submitted successfully.
            </h3>
            <div className="text-xs mb-8">
              Submitted on: {submittedTimestamp}
            </div>
            <IonButton
              size="large"
              fill="solid"
              expand="full"
              color="light"
              onClick={resetForm}
            >
              Submit another bug report
            </IonButton>
          </div>
        ) : (
          <form
            className="grid grid-cols-1 gap-y-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-xl font-bold text-center text-gray-300 uppercase">
              Report a Bug
            </p>
            <div>
              <label className="block mb-2 text-xl">
                Unexpected Behavior
                <span className="text-red-500 text-xs ml-2">* Required</span>
              </label>
              <textarea
                className={
                  "resize-none w-full text-bold p-2 text-md text-white bg-zinc-800 shadow-inner " +
                  String(errors.userMessage && "border border-red-500")
                }
                placeholder="Please describe the unexpected behavior."
                rows={3}
                {...register("userMessage", {
                  required: true,
                  onChange: async (e) => {
                    setUserMessage(e.currentTarget.value);
                    await trigger();
                  },
                  validate: (value) => {
                    return value.length > 0;
                  },
                })}
              ></textarea>
              {errors.userMessage && (
                <p className="text-xs text-red-500">
                  Unexpected behavior details are required.
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-xl">
                Reproducible Steps
                <span className="text-red-500 text-xs ml-2">* Required</span>
              </label>
              <textarea
                className={
                  "resize-none w-full text-bold p-2 text-md text-white bg-zinc-800 shadow-inner " +
                  String(errors.reproducibleSteps && "border border-red-500")
                }
                placeholder="Please provide steps to reproduce the unexpected behavior."
                rows={3}
                {...register("reproducibleSteps", {
                  required: true,
                  onChange: async (e) => {
                    setReproducibleSteps(e.currentTarget.value);
                    await trigger();
                  },
                  validate: (value) => {
                    return value.length > 0;
                  },
                })}
              ></textarea>
              {errors.reproducibleSteps && (
                <p className="text-xs text-red-500">
                  Reproducible steps are required.
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm">
                The following device details will automatically be provided with
                your report:
              </label>
              <div className="w-full font-mono p-2 text-xs text-gray-400 bg-zinc-900 shadow-inner">
                {navigator.userAgent}
              </div>
            </div>
            <IonButton
              key="submit"
              type="submit"
              size="large"
              fill="solid"
              expand="full"
              color="light"
              disabled={isLogging}
            >
              Submit Bug Report
            </IonButton>
          </form>
        )}
        <IonButton
          size="small"
          expand="full"
          fill="clear"
          color="medium"
          onClick={destroyModal}
        >
          CLOSE
        </IonButton>
      </div>
    </IonModal>
  );
}
