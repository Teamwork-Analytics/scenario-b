import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SimulationPage from "../pages/simulation/SimulationPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TEAM_NAME } from "../data/manualLabels";

function App() {
  const styles = {
    footer: {
      height: "30px",
      textAlign: "center" as const,
      position: "fixed" as const,
      margin: "0 auto",
      background: "#222222",
      width: "100vw",
      color: "grey",
    },
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/scenario-b" element={<SimulationPage />} />
          <Route
            path="/visualisation/:simulationId"
            element={<SimulationPage />}
          />
          <Route path="*" element={<SimulationPage />} />
          <Route path="/" element={<SimulationPage />} />
        </Routes>
      </BrowserRouter>
      <footer style={styles.footer}>
        <small>
          by {TEAM_NAME} &copy; {new Date().getFullYear()}
        </small>
      </footer>
    </div>
  );
}

export default App;
