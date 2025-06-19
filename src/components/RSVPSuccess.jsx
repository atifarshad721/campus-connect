import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Calendar3, GeoAlt } from "react-bootstrap-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { sendEmailReminder } from "../utils/utils";

const RSVPSuccess = ({ event, setShowRSVPSuccess, name, email }) => {
  const buildGoogleCalendarUrl = () => {
    const formatToGoogleDateTime = (date, time) => {
      const [hourStr, minuteStr] = time.split(":");
      const dateObj = new Date(date);
      dateObj.setHours(parseInt(hourStr), parseInt(minuteStr), 0);
      return dateObj.toISOString().replace(/[-:]|\.\d{3}/g, "");
    };

    const start = formatToGoogleDateTime(event.date, event.startTime);
    const end = formatToGoogleDateTime(event.date, event.endTime);

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${start}/${end}&details=${encodeURIComponent(
      event.about || ""
    )}&location=${encodeURIComponent(event.location)}`;

    return url;
  };

  useEffect(() => {
    console.log("Sending email reminder to user:", name, email);
    if (name && email) {
      const sendEmail = async () => {
        try {
          const res = await sendEmailReminder(
            name,
            email,
            event.title,
            event.date,
            event.startTime,
            event.endTime,
            event.location,
            event.organizer,
            event.id
          );
          console.log("Email reminder sent successfully:", res);
        } catch (error) {
          console.error("Error sending email reminder:", error);
        }
      };

      sendEmail();
    }
  }, [event]);

  return (
    <div
      className="d-flex justify-content-center align-items-center py-5 mx-3"
      style={{ backgroundColor: "#f0f6ff", minHeight: "100vh" }}
    >
      <Card
        className="text-center shadow border-0 p-4 rounded-4"
        style={{ maxWidth: "480px", width: "100%" }}
      >
        <div
          className="mb-3"
          style={{
            fontSize: "2rem",
            color: "#198754",
          }}
        >
          ✅
        </div>
        <h4 className="fw-bold text-success">RSVP Successful!</h4>
        <p className="text-muted mb-3">You have successfully registered for:</p>
        <h5 className="fw-bold mb-4 fs-5 text-primary ">{event.title}</h5>

        <div className="text-start mb-3 ms-auto me-auto">
          <div className="d-flex align-items-center mb-2">
            <Calendar3 className="me-2 text-primary" />
            <span>{`${event.date} • ${event.startTime} - ${event.endTime}`}</span>
          </div>
          <div className="d-flex align-items-center">
            <GeoAlt className="me-2 text-primary" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="d-flex justify-content-center gap-2 mt-4 flex-wrap">
          <Button
            className="btn-sm py-2 px-3 rounded-2 me-2"
            variant="outline-secondary"
            onClick={() => setShowRSVPSuccess(false)}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            <span>Back to Event</span>
          </Button>
          <Button
            variant="primary"
            className="btn-sm py-2 px-3 rounded-2"
            href={buildGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faCalendarAlt} className="me-2 text-white" />{" "}
            Add to Calendar
          </Button>
        </div>

        <p className="text-muted small mt-4">
          A confirmation email has been sent to your email address.
        </p>
      </Card>
    </div>
  );
};

export default RSVPSuccess;
