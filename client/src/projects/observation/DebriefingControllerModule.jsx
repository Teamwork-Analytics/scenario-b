import { TimelineProvider } from "./visualisationComponents/TimelineContext";
import { useParams } from "react-router-dom";
import { DebriefingProvider } from "../debriefing-projection/DebriefContext";
import { HiveProvider } from "../hive/HiveContext";
import DebriefingControllerView from "./DebriefingControllerView";

const DebriefingControllerModule = () => {
  const { simulationId } = useParams();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TimelineProvider simulationId={simulationId}>
        <DebriefingProvider simulationId={simulationId}>
          <HiveProvider simulationId={simulationId}>
            <DebriefingControllerView />
          </HiveProvider>
        </DebriefingProvider>
      </TimelineProvider>
    </div>
  );
};

export default DebriefingControllerModule;
