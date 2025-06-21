import { useEffect, useState } from "react";
import EventHeader from "../components/EventHeader";
import EventForm from "../components/EventForm";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import { Spinner, Button, Row, Col } from "react-bootstrap";

function EditEventPage() {
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${BASE_URL}/events/${id}`);
        const data = await response.json();
        setEvent(data);
        console.log("Fetched event:", data.email);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

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
    } else {
      console.error("Login failed");
      setFailed(true);
      setTimeout(() => {
        setFailed(false);
        navigate(`/events/${id}`);
      }, 3000);
    }
  };

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
          <h4 className="text-danger fw-bold mb-2">Login Failed!</h4>
          <p className="text-muted mb-0">Invalid email or password</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!event) {
    return <p className="text-center text-muted mt-5">Event not found.</p>;
  }

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
                as={Link}
                to={`/events/${id}`}
                variant="outline-secondary"
                className="btn btn-sm py-2 px-3 rounded-2"
              >
                <ArrowLeft className="me-2" />
                Back to Event
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

  return (
    <main
      style={{
        background: "linear-gradient(to bottom, #eff6ff, #ffffff)",
      }}
    >
      <EventHeader isAdd={false} />
      <EventForm isEditMode={true} event={event} />
    </main>
  );
}

export default EditEventPage;
