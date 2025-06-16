import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faUserCheck,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import whyImage from "../assets/why.jpeg";

const WhyCampusConnect = () => {
  return (
    <section
      style={{ padding: "130px 0 80px", backgroundColor: "#eff6ff" }}
    >
      <Container>
        <Row className="align-items-center">
          <Col xs={12} lg={6} className="mb-5 px-lg-5">
            <img
              src={whyImage}
              alt="Why Campus Connect"
              className="img-fluid rounded-4 w-100"
            />
          </Col>

          <Col xs={12} lg={6} className="mb-5 ps-lg-5">
            <h2 className="fw-bold mb-4 display-5">Why Use Campus Connect?</h2>

            <div className="d-flex align-items-start mb-4">
              <div
                className="bg-primary-subtle text-primary d-flex align-items-center justify-content-center rounded-circle me-3"
                style={{ width: "48px", height: "48px", minWidth: "48px" }}
              >
                <FontAwesomeIcon icon={faCalendarAlt} />
              </div>
              <div>
                <h5 className="fw-bold mb-2">Never Miss an Event</h5>
                <p className="text-muted mb-0 small">
                  Stay updated with all campus activities and events in one
                  place
                </p>
              </div>
            </div>

            <div className="d-flex align-items-start mb-4">
              <div
                className="bg-primary-subtle text-primary d-flex align-items-center justify-content-center rounded-circle me-3"
                style={{ width: "48px", height: "48px", minWidth: "48px" }}
              >
                <FontAwesomeIcon icon={faUserCheck} />
              </div>
              <div>
                <h5 className="fw-bold mb-2">Easy RSVP</h5>
                <p className="text-muted mb-0 small">
                  Simple one-click registration for any campus event
                </p>
              </div>
            </div>

            <div className="d-flex align-items-start mb-4">
              <div
                className="bg-primary-subtle text-primary d-flex align-items-center justify-content-center rounded-circle me-3"
                style={{ width: "48px", height: "48px", minWidth: "48px" }}
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <div>
                <h5 className="fw-bold mb-2">Location Details</h5>
                <p className="text-muted mb-0 small">
                  Get precise location information for every event on campus
                </p>
              </div>
            </div>

            <Button
              as={Link}
              to="/events"
              className="btn btn-primary fs-6 px-4 py-2 mt-3"
            >
              Get Started
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WhyCampusConnect;
