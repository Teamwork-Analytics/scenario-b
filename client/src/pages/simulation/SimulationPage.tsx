/**
 * @file SimulationPage.tsx
 * @description This page is used by teachers while tagging and debriefing.
 * It consists of a sidebar and a main view. Main view can be switched
 * between different tools.
 */
import EmptyPlaceholder from "../../components/EmptyPlaceholder";
import { DebriefingProvider } from "../../projects/debriefing-projection/DebriefContext";
import { HiveProvider } from "../../projects/hive/HiveContext";
import { ObservationProvider } from "../../projects/observation/ObservationContext";
import MainLayout from "./layouts/MainLayout";
import {
  availableTools,
  useSimulation,
  SimProvider,
} from "./SimulationContext";

//Socket

const SimulationView = () => {
  const { tool } = useSimulation();

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <MainLayout>
        {availableTools[tool as keyof typeof String] ===
        undefined ? null : availableTools[tool as keyof typeof String]
            .mainView === undefined ? (
          <EmptyPlaceholder />
        ) : (
          availableTools[tool as keyof typeof String].mainView
        )}
      </MainLayout>
    </div>
  );
};

const VisualisationPage = () => {
  return (
    <SimProvider>
      {/* TODO: deal with multiple stack providers later! */}
      <ObservationProvider simulationId={350}>
        <DebriefingProvider simulationId={350}>
          <HiveProvider simulationId={350}>
            <SimulationView />
          </HiveProvider>
        </DebriefingProvider>
      </ObservationProvider>
    </SimProvider>
  );
};

export default VisualisationPage;
