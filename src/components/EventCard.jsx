import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import eventImage from "../assets/event-image.jpg";

const EventCard = ({ event }) => {
  const { title, type, date, startTime, location, id, image } = event;

  return (
    <Card className="h-100 border-0 shadow rounded-3">
      <Card.Img
        variant="top"
        src={image || eventImage}
        alt="Event"
        className="rounded-top-3"
      />
      <Card.Body className="p-4">
        <span
          className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 mb-3 fw-normal"
          style={{ fontSize: "70%" }}
        >   
          {type}
        </span>
        <Card.Title className="fw-bold mb-3">{title}</Card.Title>

        <div className="d-flex align-items-center mb-2">
          <FontAwesomeIcon icon={faCalendarAlt} className="text-muted me-2" />
          <span className="text-muted small">{date} • {startTime}</span>
        </div>
        <div className="d-flex align-items-center mb-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-muted me-2" />
          <span className="text-muted small">{location}</span>
        </div>

        <Button as={Link} to={`/events/${id}`} className="w-100 mt-3 btn-sm rounded-2 py-2">
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
