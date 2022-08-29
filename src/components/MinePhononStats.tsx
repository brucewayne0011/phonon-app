import React from "react";
import { IonIcon } from "@ionic/react";
import { calendarOutline } from "ionicons/icons";
import { DateTime } from "luxon";

const MinePhononStats: React.FC<{
  currentAttempt: PhononMiningAttemptItem | undefined;
}> = ({ currentAttempt }) => {
  const miningStats: PhononStatusItem[] = [];

  // let's conditionally add stats to show
  if (currentAttempt !== undefined) {
    if ("Attempts" in currentAttempt) {
      miningStats.push({
        Name: "Attempts",
        Stat: String(currentAttempt.Attempts),
        SubText: "",
      });
    }

    if ("TimeElapsed" in currentAttempt) {
      miningStats.push({
        Name: "Time Elapsed",
        Stat: String(currentAttempt.TimeElapsed / 1000),
        SubText: "seconds",
      });
    }

    if ("AverageTime" in currentAttempt) {
      miningStats.push({
        Name: "Avg. Time",
        Stat: String(currentAttempt.AverageTime / 1000),
        SubText: "seconds",
      });
    }
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-white">Mining stats</h3>
      <dl className="mt-2 md:flex justify-between rounded-lg bg-gray-800 overflow-hidden divide-y divide-gray-700 md:divide-y-0 md:divide-x">
        {miningStats.map((item) => (
          <div key={item.Name} className="px-4 py-3">
            <dt className="text-base font-normal text-gray-400">{item.Name}</dt>
            <dd className="mt-1 items-baseline">
              <div className="flex items-baseline text-2xl font-semibold text-white">
                {item.Stat}
              </div>
              <div className="text-xs text-gray-400">{item.SubText}</div>
            </dd>
          </div>
        ))}
      </dl>

      {currentAttempt !== undefined && (
        <dl className="mt-2 md:grid md:grid-cols-2 rounded-lg bg-gray-800 overflow-hidden divide-y divide-gray-700 md:divide-y-0 md:divide-x">
          <div className="px-4 py-3">
            <dt className="text-base font-normal text-gray-400">
              Started mining on:
            </dt>
            <dd className="mt-1 flex text-white">
              <IonIcon slot="end" icon={calendarOutline} />
              <div className="text-xs inline ml-2">
                {DateTime.fromISO(currentAttempt.StartTime).toLocaleString(
                  DateTime.DATETIME_MED
                )}
              </div>
            </dd>
          </div>

          <div className="px-4 py-3">
            <dt className="text-base font-normal text-gray-400">
              Completed mining on:
            </dt>
            <dd className="mt-1 flex text-white">
              {DateTime.fromISO(currentAttempt.StopTime) >
              DateTime.fromISO(currentAttempt.StartTime) ? (
                <>
                  <IonIcon slot="end" icon={calendarOutline} />
                  <div className="text-xs inline ml-2">
                    {DateTime.fromISO(currentAttempt.StopTime).toLocaleString(
                      DateTime.DATETIME_MED
                    )}
                  </div>
                </>
              ) : currentAttempt.Status === "error" ? (
                <div className="text-xs text-red-600">ERROR!</div>
              ) : (
                <div className="text-xs animate-pulse">still mining...</div>
              )}
            </dd>
          </div>
        </dl>
      )}
    </div>
  );
};

export default MinePhononStats;
