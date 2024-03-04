import { useEffect, useState } from "react";
import { Row, Col, Tab, Container } from "react-bootstrap";

import { BsInfoCircle } from "react-icons/bs";
import { useTimeline } from "./visualisationComponents/TimelineContext";
import { useObservation } from "./ObservationContext";
import { useParams } from "react-router-dom";
import {
  topTabVisualisations,
  bottomVisualisations,
} from "./visualisationComponents/VisualisationsList";
import VisualisationInfoModal from "./visualisationComponents/VisualisationInfoModal";
import ToolInPrep from "../../components/loadingComponents/ToolInPrep";

const debriefStyles = {
  activeTab: {
    backgroundColor: "white",
    color: "black",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "lightgrey",
    borderRadius: "0.25rem",
    fontSize: "14px",
    padding: "5px",
  },
  inactiveTab: { color: "gray", fontSize: "14px", padding: "5px" },
  addVisButton: {
    position: "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 100,
    fontSize: "13px",
    padding: "5px",
    // width: "80%",
    whiteSpace: "nowrap",
  },
  bottomTabContainer: {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "lightgrey",
    borderRadius: "10px",
    padding: "5px",
    minHeight: "34vh",
    backgroundColor: "white",
    height: "100%",
  },
};

const DebriefingControllerView = () => {
  const { simulationId } = useParams();
  const { range, simDuration, timelineTags } = useTimeline();
  const { isDataReady } = useObservation();

  // send selected Vis
  const handleConfirmProjection = (selectedVis) => {
    setShowPreviewModal(false);
  };

  // tabs default active
  const [topActiveTab] = useState("timeline");

  // visualisations selection
  const [selectedVis] = useState([]);

  // preview modal before projection
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const [isVideoTabActive] = useState(false);

  // info modal handler for each visualisation
  const [infoModalContent, setInfoModalContent] = useState(null);
  const [infoModalTitle, setInfoModalTitle] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const handleInfoClose = () => {
    setShowInfoModal(false);
    setInfoModalTitle(null);
    setInfoModalContent(null);
  };
  const handleInfoShow = (title, infoContent) => {
    setInfoModalTitle(title);
    setInfoModalContent(infoContent);
    setShowInfoModal(true);
  };

  useEffect(() => {
    handleConfirmProjection(selectedVis);
  }, [range]);

  return (
    <>
      <VisualisationInfoModal
        infoDiv={infoModalContent}
        show={showInfoModal}
        handleClose={handleInfoClose}
        vizTitle={infoModalTitle}
      />

      {/* Top row viz */}
      <Row style={{ minHeight: "35vh" }}>
        <Col style={{ padding: "1px" }}>
          <Container
            style={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "lightgrey",
              borderRadius: "10px",
              padding: "5px",
              minHeight: "34vh",
              width: "100%",
              maxWidth: "100%",
              position: "relative",
              backgroundColor: "white",
            }}
          >
            <Tab.Container activeKey={topActiveTab}>
              <Row>
                <Tab.Content style={{ position: "relative" }}>
                  {topTabVisualisations(range).map((tab, index) => (
                    <Tab.Pane eventKey={tab.eventKey} key={index}>
                      {tab.component(
                        debriefStyles.imageContainer,
                        isVideoTabActive
                      )}
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Row>
            </Tab.Container>
          </Container>
        </Col>
      </Row>
      {/* Bottom row viz */}
      <Row style={{ minHeight: "35vh", marginTop: "5px" }}>
        <Col style={{ padding: "1px" }}>
          <Container
            style={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "lightgrey",
              borderRadius: "10px",
              padding: "5px",
              minHeight: "34vh",
              width: "100%",
              maxWidth: "100%",
              position: "relative",
              backgroundColor: "white",
            }}
          >
            <div
              className="scrollable-div"
              style={{
                display: "flex",
                overflowX: "auto",
                whiteSpace: "nowrap",
                marginBottom: "5px",
              }}
            >
              {isDataReady ? (
                bottomVisualisations(range, showPreviewModal).map(
                  (tab, index) => (
                    <div
                      style={{
                        minWidth: "23rem",
                        margin: "5px",
                        padding: "5px",
                        borderStyle: "solid",
                        borderColor: "rgba(0, 0, 0, 0.176)",
                        borderRadius: "0.5rem",
                      }}
                      key={index}
                    >
                      <Row>
                        <Col xs="auto" style={{ margin: "auto" }}>
                          <div
                            style={{
                              marginTop: "10px",
                              marginBottom: "10px",
                              fontSize: "16px",
                              position: "relative",
                              paddingRight: "15px",
                            }}
                            onClick={() => {
                              handleInfoShow(tab.title, tab.info());
                            }}
                          >
                            {tab.title}
                            <BsInfoCircle
                              style={{
                                position: "absolute",
                                top: "0",
                                right: "0",
                              }}
                              size="0.7em"
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Container style={{ margin: "5px" }}>
                          {tab.component()}
                        </Container>
                      </Row>
                    </div>
                  )
                )
              ) : (
                <Container style={{ display: "flex", minHeight: "30vh" }}>
                  <ToolInPrep />
                </Container>
              )}
            </div>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default DebriefingControllerView;
