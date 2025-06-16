import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-top bg-white">
      <Container className="py-4">
        <Row className="align-items-center">
          <Col
            xs={12}
            md={4}
            className="text-center text-md-start mb-3 mb-md-0 order-2 order-md-1"
          >
            <span className="text-muted small">© 2025 Campus Connect, Inc</span>
          </Col>

          <Col
            xs={12}
            md={4}
            className="text-center mb-3 mb-md-0 order-1 order-md-2"
          >
            <img
              src={logo}
              alt="Campus Connect Logo"
              className="img-fluid"
              style={{ maxWidth: "90px" }}
            />
          </Col>

          <Col xs={12} md={4} className="order-3">
            <ul className="nav justify-content-center justify-content-md-end list-unstyled d-flex mb-0">
              <li className="ms-3">
                <a
                  className="text-muted"
                  href="https://www.instagram.com/totallyatificious/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
              </li>
              <li className="ms-3">
                <a
                  className="text-muted"
                  href="https://www.facebook.com/muhammad.atif.arshad.2025"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebook} size="lg" />
                </a>
              </li>
              <li className="ms-3">
                <a
                  className="text-muted"
                  href="https://x.com/AtifArs91298971"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
