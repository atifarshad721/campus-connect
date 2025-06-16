import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero.jpg";

const Hero = () => {
  return (
    <section
      className="bg-light"
      style={{
        padding: "120px 0",
        background: "linear-gradient(to bottom, #eff6ff, #ffffff)",
      }}
    >
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col xs={12} lg={6} className="mb-5 text-start">
            <span className="badge bg-primary bg-opacity-10 text-primary small fw-normal px-3 py-2 rounded-2 mb-2">
              University Events Platform
            </span>
            <h1 className="display-5 fw-bold mb-3">
              Connect with Campus Life
            </h1>
            <p className="fs-5 text-muted mb-4">
              Discover, RSVP, and attend the best events happening on your
              university campus. Never miss out on workshops, seminars, sports,
              and social gatherings.
            </p>
            <Button
              as={Link}
              to="/events"
              className="btn btn-primary fs-6 px-4 py-2"
            >
              Browse Events
            </Button>
          </Col>

          <Col xs={12} lg={6} className="mb-5">
            <img src={heroImage} alt="Campus" className="img-fluid rounded-4" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
