//Create a context for HIVE controllable information: such as
// * change person (select checkboxes)
// * switch between overall to different phases (with slider)
// * with audio (default) or position only

// GUIDE: https://kentcdodds.com/blog/how-to-use-react-context-effectively

import React from "react";

const HiveContext = React.createContext();

function HiveProvider({ simulationId, children }) {
  const [hrData, setHrData] = React.useState({});
  const [hiveState, hiveSetState] = React.useState({
    participants: { BLUE: true, RED: true, GREEN: true, YELLOW: true },
    phase: [0, 100],
    isPositionOnly: false,
    showPositionAudioData: true,
    showHeartRateData: true,
  });
  const [isHiveReady] = React.useState(true);

  const value = {
    hiveState,
    hiveSetState,
    isHiveReady,
    setHrData,
    hrData,
  };

  return <HiveContext.Provider value={value}>{children}</HiveContext.Provider>;
}

function useHive() {
  const context = React.useContext(HiveContext);
  if (context === undefined) {
    throw new Error("useHive must be used within a HiveProvider");
  }
  return context;
}

export { HiveProvider, useHive };
