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
      timestamp: "2023-08-30T06:31:52.100Z",
      message: "Communicates effectively",
      phaseKey: "communicates_effectively",
      favourite: true,
      performers: [],
      _id: "64eee25879790f45d8c99a0e",
    },
    {
      timestamp: "2023-08-30T06:30:37.696Z",
      message: "Shares information",
      phaseKey: "shares_information",
      favourite: false,
      performers: [],
      _id: "64eee20e79790f45d8c99a09",
    },
    {
      timestamp: "2023-08-30T06:29:32.666Z",
      message: "Effectively working together",
      phaseKey: "effectively_working_together",
      favourite: true,
      performers: [],
      _id: "64eee1cd79790f45d8c99a00",
    },
    {
      timestamp: "2023-08-30T06:28:02.129Z",
      message: "Effectively working together",
      phaseKey: "effectively_working_together",
      favourite: true,
      performers: [],
      _id: "64eee17279790f45d8c999f3",
    },
    {
      timestamp: "2023-08-30T06:26:30.944Z",
      message: "Effectively working together- noticed ecg needed finishing",
      phaseKey: "effectively_working_together-_noticed_ecg_needed_finishing",
      favourite: true,
      performers: [],
      _id: "64eee11779790f45d8c999e0",
    },
    {
      timestamp: "2023-08-30T06:25:37.095Z",
      message: "Handover to doctor",
      phaseKey: "handover_to_doctor",
      favourite: false,
      performers: [],
      _id: "64eee0e179790f45d8c999d9",
    },
    {
      timestamp: "2023-08-30T06:25:17.075Z",
      message: "Doctor enters",
      phaseKey: "doctor_enters",
      favourite: false,
      performers: [],
      _id: "64eee0cd79790f45d8c999ca",
    },
    {
      timestamp: "2023-08-30T06:21:58.552Z",
      message: "Calls MET",
      phaseKey: "calls_met",
      favourite: false,
      performers: [],
      _id: "64eee00679790f45d8c999b1",
    },
    {
      timestamp: "2023-08-30T06:20:15.758Z",
      message: "Handover to secondary nurse",
      phaseKey: "handover_to_secondary_nurse",
      favourite: false,
      performers: [],
      _id: "64eedfa079790f45d8c999ac",
    },
    {
      timestamp: "2023-08-30T06:20:09.874Z",
      message: "Secondary nurse enters",
      phaseKey: "secondary_nurse_enters",
      favourite: false,
      performers: [],
      _id: "64eedf9a79790f45d8c999a7",
    },
    {
      timestamp: "2023-08-30T06:20:03.730Z",
      message: "Discusses call for help",
      phaseKey: "discusses_call_for_help",
      favourite: false,
      performers: [],
      _id: "64eedf9479790f45d8c999a2",
    },
    {
      timestamp: "2023-08-30T06:19:29.903Z",
      message: "Applies oxygen",
      phaseKey: "applies_oxygen",
      favourite: false,
      performers: [],
      _id: "64eedf7279790f45d8c9999b",
    },
    {
      timestamp: "2023-08-30T06:19:04.413Z",
      message: "Recognises deterioration",
      phaseKey: "recognises_deterioration",
      favourite: false,
      performers: [],
      _id: "64eedf5879790f45d8c99996",
    },
    {
      timestamp: "2023-08-30T06:18:23.680Z",
      message: "Verbalises concerns",
      phaseKey: "verbalises_concerns",
      favourite: false,
      performers: [],
      _id: "64eedf3079790f45d8c99991",
    },
    {
      timestamp: "2023-08-30T06:17:25.748Z",
      message: "Assesses Ruth",
      phaseKey: "assesses_ruth",
      favourite: false,
      performers: [],
      _id: "64eedef679790f45d8c9998c",
    },
    {
      timestamp: "2023-08-30T06:17:06.570Z",
      message: "Handover ends",
      phaseKey: "handover_ends",
      favourite: false,
      performers: [],
      _id: "64eedee279790f45d8c99987",
    },
    {
      timestamp: "2023-08-30T06:15:19.773Z",
      message: "Scenario started",
      phaseKey: "scenario_started",
      favourite: false,
      performers: [],
      _id: "64eede7879790f45d8c99978",
    },
  ]); // it is used to collect different phases
  const [observation, setObservation] = React.useState({
    synchronisations: [],
  });
  const [obsStartTime] = useState("2023-08-30T06:15:17.370Z");
  const [obsEndTime] = useState("2023-08-30T06:35:13.017Z");

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
