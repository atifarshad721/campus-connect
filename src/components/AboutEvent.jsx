import { Col } from "react-bootstrap";

const About = ({ about, organizer }) => {
  return (
    <Col lg={8} className="mb-5">
      <div>
        <h2 className="mb-3 fw-bold h5">About this Event</h2>
        <div className="p-3 border rounded-3">
          <p className="mb-0">{about}</p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="mb-3 fw-bold h5">Organizer</h2>
        <div className="p-3 border rounded-3">{organizer}</div>
      </div>
    </Col>
  );
};

export default About;
