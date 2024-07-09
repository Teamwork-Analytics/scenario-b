import { Container } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import DebriefingControllerModule from "./DebriefingControllerModule";
import { useObservation } from "./ObservationContext";
import ToolInPrep from "../../components/loadingComponents/ToolInPrep";

const ObservationView = () => {
  const simulationId = 417;
  const { obsStartTime, obsEndTime } = useObservation();

  const styles = {
    outer: {
      position: "relative",
      margin: "0 auto",
      width: "90vw",
      maxWidth: "1440px",
      height: "100%",
      colour: "white",
    },
    backButton: {
      position: "absolute",
    },
    info: { width: "20vw", margin: "0 auto" },
  };

  return (
    <div style={styles.outer}>
      <h1>Demo Scenario B</h1>

      {obsStartTime && obsEndTime ? (
        <DebriefingControllerModule />
      ) : (
        <Container style={{ display: "flex", minHeight: "60vh" }}>
          <ToolInPrep />
        </Container>
      )}

      <ReactTooltip />
    </div>
  );
};

export default ObservationView;
