import { Col, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { formatDateForDisplay } from "../utils/utils";

const RSVPForm = ({
  event,
  setShowRSVPSuccess,
  setShowDuplicateRSVP,
  setFailed,
  setEvent,
  name,
  setName,
  email,
  setEmail,
}) => {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRSVPEntry = {
      eventId: event.id,
      title: event.title,
      dateRsvped: formatDateForDisplay(new Date()), // "YYYY-MM-DD"
    };

    try {
      // 1. Update the event RSVP count

      // 2. Check if user exists
      const userRes = await fetch(`https://hostapi-production-7546.up.railway.app/users?email=${email}`);
      const users = await userRes.json();

      if (users.length > 0) {
        const user = users[0];

        const alreadyRSVPed = user.rsvpedEvents.some(
          (e) => e.eventId === event.id
        );

        if (!alreadyRSVPed) {
          const response = await fetch(`https://hostapi-production-7546.up.railway.app/events/${event.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rsvpCount: event.rsvpCount + 1 }),
          });
          const updatedEvent = await response.json();
          setEvent(updatedEvent);
          await fetch(`https://hostapi-production-7546.up.railway.app/users/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              rsvpedEvents: [...user.rsvpedEvents, newRSVPEntry],
            }),
          });
          setShowRSVPSuccess(true);
        } else {
          setShowDuplicateRSVP(true);
          setTimeout(() => {
            setShowDuplicateRSVP(false);
          }, 3000); // Redirect after 3 seconds
        }
      } else {
        const response = await fetch(`https://hostapi-production-7546.up.railway.app/events/${event.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rsvpCount: event.rsvpCount + 1 }),
        });
        const updatedEvent = await response.json();
        setEvent(updatedEvent);
        // Create a new user
        await fetch("https://hostapi-production-7546.up.railway.app/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            rsvpedEvents: [newRSVPEntry],
          }),
        });
        setShowRSVPSuccess(true);
      }
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setFailed(true);
      setTimeout(() => {
        setFailed(false);
      }, 3000);
    }
  };

  return (
    <Col
      lg={4}
      className="mb-5 ps-lg-5"
      id="rsvp-form"
      style={{ display: "none" }}
    >
      <div className="p-4 border rounded-3 bg-white">
        <h2 className="mb-3 fw-bold h5">RSVP to This Event</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label className="fw-semibold small">Full Name</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-white border-end-0">
                <FontAwesomeIcon icon={faUser} className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                className="border-start-0"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="fw-semibold small">Email Address</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-white border-end-0">
                <FontAwesomeIcon icon={faEnvelope} className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                className="border-start-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          <button
            type="submit"
            className="btn btn-primary btn-sm py-2 px-3 rounded-2 w-100 fw-semibold"
          >
            RSVP Now
          </button>

          <p className="pt-3 mb-0 text-muted text-center small">
            By RSVPing, you agree to our terms and privacy policy.
          </p>
        </Form>
      </div>
    </Col>
  );
};

export default RSVPForm;
