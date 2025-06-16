import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import "../App.css";

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("/api/events?_limit=3");
      const data = await res.json();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <section className="bg-white py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark mb-3">
            Upcoming Featured Events
          </h2>
          <p className="fs-5 text-muted">
            Check out these highlighted events happening soon on campus
          </p>
        </div>

        <Row className="g-4">
          {events.map((event) => (
            <Col key={event.id} md={12} lg={4}>
              <EventCard event={event} />
            </Col>
          ))}
        </Row>

        <div className="text-center mt-5 pt-3">
          <Button as={Link} to="/events" className="button btn btn-sm px-3 py-2 rounded-2">
            View all Events
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedEvents;
