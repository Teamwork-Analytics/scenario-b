//Create a context for HIVE controllable information: such as
// * change person (select checkboxes)
// * switch between overall to different phases (with slider)
// * with audio (default) or position only

// GUIDE: https://kentcdodds.com/blog/how-to-use-react-context-effectively

import React, { useState } from "react";
const ObservationContext = React.createContext();

function ObservationProvider({ simulationId, children }) {
  const [notes] = React.useState([
    {
      timestamp: "2024-06-27T03:19:57.284Z",
      message: "Handover to doctor",
      phaseKey: "handover_to_doctor",
      favourite: false,
      performers: [],
      _id: "667cda5d46cbc27332482dec",
    },
    {
      timestamp: "2024-06-27T03:19:32.448Z",
      message: "Doctor enters",
      phaseKey: "doctor_enters",
      favourite: false,
      performers: [],
      _id: "667cda4446cbc27332482de8",
    },
    {
      timestamp: "2024-06-27T03:18:13.726Z",
      message: "Documents care",
      phaseKey: "documents_care",
      favourite: false,
      performers: [],
      _id: "667cd9f546cbc27332482de4",
    },
    {
      timestamp: "2024-06-27T03:17:41.798Z",
      message: "Ecg",
      phaseKey: "ecg",
      favourite: false,
      performers: [],
      _id: "667cd9d546cbc27332482de0",
    },
    {
      timestamp: "2024-06-27T03:17:15.872Z",
      message: "Assesses leg for DVT",
      phaseKey: "assesses_leg_for_dvt",
      favourite: false,
      performers: [],
      _id: "667cd9bb46cbc27332482dda",
    },
    {
      timestamp: "2024-06-27T03:16:52.305Z",
      message: "Delegates care",
      phaseKey: "delegates_care",
      favourite: false,
      performers: [],
      _id: "667cd9a446cbc27332482dcf",
    },
    {
      timestamp: "2024-06-27T03:15:51.000Z",
      message: "Handover to secondary nurse",
      phaseKey: "handover_to_secondary_nurse",
      favourite: false,
      performers: [],
      _id: "667cd9a346cbc27332482dcb",
    },
    {
      timestamp: "2024-06-27T03:15:40.000Z",
      message: "Secondary nurse enters",
      phaseKey: "secondary_nurse_enters",
      favourite: false,
      performers: [],
      _id: "667cd99046cbc27332482dbf",
    },
    {
      timestamp: "2024-06-27T03:15:30.290Z",
      message: "Recognises deterioration",
      phaseKey: "recognises_deterioration",
      favourite: false,
      performers: [],
      _id: "667cd95246cbc27332482daf",
    },
    {
      timestamp: "2024-06-27T03:15:27.939Z",
      message: "Assesses Ruth",
      phaseKey: "assesses_ruth",
      favourite: false,
      performers: [],
      _id: "667cd95046cbc27332482dab",
    },
    {
      timestamp: "2024-06-27T03:14:53.000Z",
      message: "Calls MET",
      phaseKey: "calls_met",
      favourite: false,
      performers: [],
      _id: "667cd96946cbc27332482db3",
    },
    {
      timestamp: "2024-06-27T03:13:41.361Z",
      message: "Assesses patient/s",
      phaseKey: "assesses_patient/s",
      favourite: false,
      performers: [],
      _id: "667cd8e546cbc27332482da7",
    },
    {
      timestamp: "2024-06-27T03:13:29.859Z",
      message: "Handover ends",
      phaseKey: "handover_ends",
      favourite: false,
      performers: [],
      _id: "667cd8d946cbc27332482da3",
    },
    {
      timestamp: "2024-06-27T03:09:28.819Z",
      message: "Scenario started",
      phaseKey: "scenario_started",
      favourite: false,
      performers: [],
      _id: "667cd7e846cbc27332482d96",
    },
  ]);

  const [observation, setObservation] = React.useState({
    synchronisations: [],
  });
  const [obsStartTime] = useState("2024-06-27T03:06:18.416Z");
  const [obsEndTime] = useState("2024-06-27T03:29:29.652Z");

  const [isDataReady] = React.useState(true);

  const value = {
    notes,
    observation,
    setObservation,
    obsStartTime,
    obsEndTime,
    isDataReady,
  };
  return (
    <ObservationContext.Provider value={value}>
      {children}
    </ObservationContext.Provider>
  );
}

function useObservation() {
  const context = React.useContext(ObservationContext);
  if (context === undefined) {
    throw new Error("useObservation must be used within a ObservationProvider");
  }
  return context;
}

export { ObservationProvider, useObservation };
