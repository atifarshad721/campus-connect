import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import {
  faCalendarAlt,
  faClock,
  faMapMarkerAlt,
  faUsers,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import eventImage from "../assets/hero.jpg";
import "../App.css";
import { getPreviousDay } from "../utils/utils";

const MainDetails = ({ event, setShowPage }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [disableRSVP, setDisableRSVP] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleRSVP = () => {
    const rsvpForm = document.getElementById("rsvp-form");
    rsvpForm.style.display = "block";
    window.scrollTo({
      top: rsvpForm.offsetTop,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadline = getPreviousDay(event.date);

    if (today >= deadline) {
      console.log("Event is past the deadline.");
      setDisableRSVP(true);
    } else {
      console.log("Event is within the RSVP deadline.");
    }

    if (event.rsvpCount >= event.capacity) {
      setDisableRSVP(true);
    }
  }, [event]);

  const handleDelete = () => {
    // setShow(false);
    setShowPage(false);
    setIsAuthenticated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Compare credentials
    if (
      (event.email === email && event.password === password) ||
      ("admin@events.com" === email && "admin" === password)
    ) {
      setIsAuthenticated(true);
      console.log("Login successful");

      try {
        const response = await fetch(`/api/events/${id}`, {
          method: "DELETE",
        });
        console.log("Event deleted successfully: ", response);
        setSuccess(true);
        setTimeout(() => {
          navigate("/events");
        }, 2500); // Redirect after 2.5 seconds
      } catch (error) {
        console.error("Error deleting event:", error);
        setFailed(true);
        setTimeout(() => {
          setFailed(false);
          isAuthenticated(true);
        }, 2500);
      }
    } else {
      console.error("Login failed");
      setIsAuthenticated(true);
      setFailed(true);
      setTimeout(() => {
        setFailed(false);
      }, 3000);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <div
          className="d-flex justify-content-start align-items-center pt-4"
          style={{ paddingLeft: "50px" }}
        >
          <Row>
            <Col>
              <Button
                variant="outline-secondary"
                className="btn btn-sm py-2 px-3 rounded-2"
                onClick={() => {
                  setShowPage(true);
                  setIsAuthenticated(true);
                }}
              >
                <ArrowLeft className="me-2" />
                Back to Events
              </Button>
            </Col>
          </Row>
        </div>
        <div className="d-flex justify-content-center align-items-center py-5 mb-3">
          <form
            className="bg-light p-4 rounded-3 w-100 shadow"
            style={{ maxWidth: 400 }}
            onSubmit={handleSubmit}
          >
            <h4 className="mb-3 text-center">Login Required</h4>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                autoComplete="username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </>
    );
  }

  if (success) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5 mb-3">
        <div className="text-center bg-success bg-opacity-10 p-5 rounded-3 w-75">
          <div
            className="mb-3"
            style={{
              fontSize: "2rem",
              color: "#198754",
            }}
          >
            ✅
          </div>
          <h4 className="text-success fw-bold mb-2">
            Event Deleted Successfully!
          </h4>
          <p className="text-muted mb-0">
            This event has been deleted. You will be redirected shortly.
          </p>
        </div>
      </div>
    );
  }

  if (failed) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5 mb-3">
        <div className="text-center bg-danger bg-opacity-10 p-5 rounded-3 w-75">
          <div
            className="mb-3"
            style={{
              fontSize: "2rem",
              color: "#ff4444",
            }}
          >
            ❌
          </div>
          <h4 className="text-danger fw-bold mb-2">Event Deletion Failed!</h4>
          <p className="text-muted mb-0">You will be redirected shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <section
      className="py-5"
      style={{
        padding: "120px 0",
        background: "linear-gradient(to bottom, #eff6ff, #ffffff)",
      }}
    >
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col lg={6} className="mb-5">
            <Link
              to="/events"
              className="btn-outline-secondary btn btn-sm py-2 px-3 rounded-2 mb-4 me-2"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              <span>Back to Events</span>
            </Link>
            <Link
              to={`/events/edit/${event.id}`}
              className="btn-outline-warning btn btn-sm py-2 px-3 rounded-2 mb-4 me-2"
            >
              <span>Edit Event</span>
            </Link>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleDelete}
              className="py-2 px-3 rounded-2 mb-4"
            >
              <span>Delete Event</span>
            </Button>

            <img
              src={event.image || eventImage}
              alt="Campus"
              className="img-fluid rounded-4"
              style={{ maxWidth: "95%" }}
            />
          </Col>
          <Col lg={6} className="mb-1 mt-sm-3">
            <span className="badge bg-primary bg-opacity-10 text-primary small fw-normal px-3 py-2 rounded-pill mb-2">
              {event.type}
            </span>
            <h1 className="display-6 fw-bold mb-4">{event.title}</h1>
            <div>
              <div className="d-flex align-items-center mb-3">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-primary fs-5"
                  style={{ marginRight: "17px", marginLeft: "5px" }}
                />
                <span className="text-dark fw-medium fs-6">{event.date}</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-primary fs-5"
                  style={{ marginRight: "16px", marginLeft: "3px" }}
                />
                <span className="text-dark fw-medium fs-6">
                  {event.startTime} - {event.endTime}
                </span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-primary fs-5"
                  style={{ marginRight: "18px", marginLeft: "6px" }}
                />
                <span className="text-dark fw-medium fs-6">
                  {event.location}
                </span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <FontAwesomeIcon
                  icon={faUsers}
                  className="text-primary fs-5"
                  style={{ marginRight: "14px" }}
                />
                <span className="text-dark fw-medium fs-6">
                  Capacity:{" "}
                  {event.capacity === 501 ? "More than 500" : event.capacity}{" "}
                  attendees
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center bg-light rounded-3 p-3 w-100 mt-4 gap-2 flex-wrap">
              <Button
                variant="primary"
                size="sm"
                className="py-2 px-3 rounded-2"
                onClick={handleRSVP}
                disabled={disableRSVP}
              >
                RSVP Now
              </Button>
              <div className="text-muted mb-0">✔️ {event.rsvpCount} RSVP'd</div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MainDetails;
