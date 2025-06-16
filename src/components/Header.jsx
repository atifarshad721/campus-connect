import { Navbar, Container, Nav, Offcanvas, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {

  const linkClass = ({isActive}) => isActive ? "text-primary me-4 my-auto" : "my-auto me-4 text-secondary";

  const activeLinkStyle = {
    textDecoration: "none",
  };

  return (
    <header>
      <Navbar
        key="lg"
        expand="lg"
        className="bg-transparent border-bottom"
        sticky="top"
      >
        <Container>
          {/* Brand Logo */}
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              alt="brand-logo"
              height="35"
              style={{ margin: "5px 0" }}
            />
          </Navbar.Brand>

          {/* Toggle for Offcanvas */}
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" className="shadow-none border-0" />

          {/* Offcanvas Menu */}
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="start"
          >
            <Offcanvas.Header closeButton className="border-bottom shadow-sm justify-content-center">
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                <img
                  src={logo}
                  alt="brand-logo"
                  height="35"
                />
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="d-flex flex-column flex-lg-row">
              <Nav className="justify-content-center align-items-center flex-grow-1 fs-6">
                <NavLink as={Link} to="/" className={linkClass} style={activeLinkStyle}>
                  Home
                </NavLink>
                <NavLink as={Link} to="/events" className={linkClass} style={activeLinkStyle}>
                  Events
                </NavLink>
                <NavLink as={Link} to="/admin-panel" className={linkClass} style={activeLinkStyle}>
                  Admin
                </NavLink>
              </Nav>

              <div className="d-flex justify-content-center align-items-center mt-3 mt-lg-0">
                <Button
                  as={Link}
                  to="/post-event"
                  className="btn btn-sm btn-primary px-3 py-2"
                >
                  Add an Event
                </Button>
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
