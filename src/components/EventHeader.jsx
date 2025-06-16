import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import "../App.css";

const EventHeader = ({ isAdd }) => {
  const { id } = useParams(); // Get the event ID from the URL if needed
  return (
    <section className="container-fluid pt-5 pb-0">
      <Container>
        {isAdd ? (
          <Row>
            <Col>
              <Button
                as={Link}
                to="/events"
                variant="outline-secondary"
                className="btn btn-sm py-2 px-3 rounded-2 mb-4"
              >
                <ArrowLeft className="me-2" />
                Back to Events
              </Button>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              <Button
                as={Link}
                to={`/events/${id}`}
                variant="outline-secondary"
                className="btn btn-sm py-2 px-3 rounded-2 mb-4"
              >
                <ArrowLeft className="me-2" />
                Back to details
              </Button>
            </Col>
          </Row>
        )}

        <Row>
          <Col className="text-center">
            <h1 className="display-6 fw-bold mb-2">
              {isAdd ? "Post a New Event" : "Edit this Event"}
            </h1>
            <p className="text-muted lead">
              Share your event with the campus community
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EventHeader;
