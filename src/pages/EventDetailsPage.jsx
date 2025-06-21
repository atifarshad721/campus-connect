import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainDetails from "../components/MainDetails";
import AboutEvent from "../components/AboutEvent";
import RSVPForm from "../components/RSVPForm";
import RSVPSuccess from "../components/RSVPSuccess";
import { Spinner, Container, Row } from "react-bootstrap";

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPage, setShowPage] = useState(true);
  const [showRSVPSuccess, setShowRSVPSuccess] = useState(false);
  const [showDuplicateRSVP, setShowDuplicateRSVP] = useState(false);
  const [failed, setFailed] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${BASE_URL}/events/${id}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">Event not found.</p>
      </div>
    );
  }

  if (showDuplicateRSVP) {
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
          <h4 className="text-danger fw-bold mb-3">Duplicate RSVP</h4>
          <p className="text-muted mb-0">
            This event is already RSVP'd by the given Email. You will be
            redirected shortly.
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
          <h4 className="text-danger fw-bold mb-3">RSVP Failed</h4>
          <p className="text-muted mb-0">You will be redirected shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {showRSVPSuccess ? (
        <div
          className="d-flex justify-content-center align-items-center py-1"
          style={{ backgroundColor: "#f0f6ff", minHeight: "100vh" }}
        >
          <RSVPSuccess
            event={event}
            setShowRSVPSuccess={setShowRSVPSuccess}
            name={name}
            email={email}
          />
        </div>
      ) : (
        <>
          <MainDetails event={event} setShowPage={setShowPage} />
          {showPage && (
            <section className="pb-2">
              <Container>
                <Row>
                  <AboutEvent about={event.about} organizer={event.organizer} />
                  <RSVPForm
                    event={event}
                    setShowRSVPSuccess={setShowRSVPSuccess}
                    setShowDuplicateRSVP={setShowDuplicateRSVP}
                    setFailed={setFailed}
                    setEvent={setEvent}
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                  />
                </Row>
              </Container>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default EventDetailsPage;
