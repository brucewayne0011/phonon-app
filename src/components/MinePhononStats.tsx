import React, { useEffect, useState } from "react";

const MinePhononStats: React.FC<{
  currentAttempt: PhononMiningAttemptItem | undefined;
}> = ({ currentAttempt }) => {
  const miningStats: PhononStatusItem[] = [];

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
              <div className="text-xs">{item.SubText}</div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default MinePhononStats;
