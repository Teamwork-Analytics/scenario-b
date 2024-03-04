import { TimelineProvider } from "./visualisationComponents/TimelineContext";
import { DebriefingProvider } from "../debriefing-projection/DebriefContext";
import { HiveProvider } from "../hive/HiveContext";
import DebriefingControllerView from "./DebriefingControllerView";

const DebriefingControllerModule = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TimelineProvider simulationId={350}>
        <DebriefingProvider simulationId={350}>
          <HiveProvider simulationId={350}>
            <DebriefingControllerView />
          </HiveProvider>
        </DebriefingProvider>
      </TimelineProvider>
    </div>
  );
};

export default DebriefingControllerModule;
