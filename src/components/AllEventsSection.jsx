import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import EventCard from "./EventCard";
import "../App.css";

const AllEventsSection = ({ category, searchTerm }) => {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6); // initially visible cards

  // Fetch all events once
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:8080/events"); // replace with your endpoint
        const data = await res.json();
        setAllEvents(data);
        setFilteredEvents(data); // show all by default
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Filter based on category or search term
  useEffect(() => {
    let filtered = allEvents;

    if (category) {
      filtered = filtered.filter((event) => {
        event.type.toLowerCase().includes(category.toLowerCase());
      });
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.about.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
    setVisibleCount(6); // reset visible count on new filter
  }, [category, searchTerm, allEvents]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section style={{ padding: "100px 0" }}>
      <Container>
        <Row className="g-4">
          {filteredEvents.slice(0, visibleCount).map((event) => (
            <Col key={event.id} xs={12} md={6} lg={4}>
              <EventCard event={event} />
            </Col>
          ))}
        </Row>

        {visibleCount < filteredEvents.length && (
          <div className="text-center mt-5 pt-3">
            <Button
              className="button btn btn-sm px-3 py-2 rounded-2"
              onClick={handleLoadMore}
            >
              Load more Events
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default AllEventsSection;
