import React, { useState } from "react";
import { Container, Row, Col, InputGroup, FormControl, Button, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import AllEventsSection from "../components/AllEventsSection";

function EventsPage() {
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { label: "All Events", value: "" },
    { label: "Workshops", value: "Workshop" },
    { label: "Seminars", value: "Seminar" },
    { label: "Social", value: "Social" },
    { label: "Academic", value: "Academic" },
    { label: "Sports", value: "Sports" },
  ];

  return (
    <>
      <section
      style={{
        padding: "60px 0 0 0",
        background: "linear-gradient(to bottom, #eff6ff, #ffffff)",
      }}
    >
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">Campus Events</h1>
          <p className="text-muted fs-5 mb-0">
            Discover and RSVP to upcoming events happening across campus
          </p>
        </div>

        <Row className="justify-content-center align-items-center mb-4">
          <Col xs={12} md={8} lg={6} className="mb-3 mb-md-0">
            <InputGroup>
              <InputGroup.Text className="bg-white border-end-0">
                <FontAwesomeIcon icon={faSearch} className="text-muted" />
              </InputGroup.Text>
              <FormControl
                type="text"
                className="border-start-0 py-2"
                placeholder="Search events by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ boxShadow: "none" }}
              />
            </InputGroup>
          </Col>
          <Col xs={12} md={4} lg={2} className="text-center px-0">
            <Button as={Link} to="/post-event" className="px-4 py-2 fw-semibold">
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              Add an Event
            </Button>
          </Col>
        </Row>

        <div className="d-flex justify-content-center">
          <Nav
            variant="pills"
            className="gap-2 p-2 bg-white rounded-pill shadow-sm justify-content-center"
            style={{ maxWidth: "700px" }}
          >
            {categories.map((cat) => (
              <Nav.Item key={cat.value}>
                <Nav.Link
                  onClick={() => setCategory(cat.value)}
                  active={category === cat.value}
                  className={`px-3 py-2 rounded-pill fw-medium ${
                    category !== cat.value ? "text-muted" : ""
                  }`}
                >
                  {cat.label}
                </Nav.Link>
              </Nav.Item>
            ))}
            {console.log(category)}
          </Nav>
        </div>
      </Container>
    </section>
      <AllEventsSection category={category} searchTerm={searchTerm} />
    </>
  );
}

export default EventsPage;
