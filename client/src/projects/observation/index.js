import ObservationView from "./ObservationView";

export { ObservationView };

export const sortNotesDescending = (observationObj) => {
  const { phases } = observationObj;
  phases.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  return phases;
};

/**
 * These phases are depending on the learning design.
 */
export const manualLabels = {
  phases: [
    { _id: "phaseId001", label: "Scenario started" },
    { _id: "phaseId002", label: "Handover ends" },
    { _id: "phaseId003", label: "Secondary nurse enters" },
    { _id: "phaseId004", label: "Doctor enters" },
    { _id: "phaseId005", label: "Teamwork actions" },
  ],
};
