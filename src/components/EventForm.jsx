import { useState } from "react";
import {
  formatDateForDisplay,
  formatTimeWithAMPM,
  formatDateForInput,
  trimTime,
  uploadImageToCloudinary,
} from "../utils/utils";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Card,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import {
  Person,
  Envelope,
  CardText,
  Calendar3,
  GeoAlt,
  Building,
  Upload,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const EventForm = ({ isEditMode, event = {} }) => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({}); 

  const [formData, setFormData] = useState({
    name: event.name || "",
    email: event.email || "",
    pass: event.pass || "",
    title: event.title || "",
    type: event.type || "",
    date: event.date ? formatDateForInput(event.date) : "",
    startTime: event.startTime ? trimTime(event.startTime) : "",
    endTime: event.endTime ? trimTime(event.endTime) : "",
    location: event.location || "",
    capacity: event.capacity || "",
    about: event.about || "",
    image: event.image || "",
    organizer: event.organizer || "",
    rsvpCount: event.rsvpCount || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should not exceed 5MB.");
        e.target.value = "";
        return;
      }
      setSelectedImage(file);
    }
  };

  const validateTimes = () => {
    const newErrors = {};

    if (!formData.startTime || !formData.endTime) {
      return newErrors;
    }

    // Convert times to minutes
    const [startHours, startMinutes] = formData.startTime
      .split(":")
      .map(Number);
    const [endHours, endMinutes] = formData.endTime.split(":").map(Number);

    const startTotal = startHours * 60 + startMinutes;
    const endTotal = endHours * 60 + endMinutes;

    // Check if end time is after start time
    if (endTotal <= startTotal) {
      newErrors.time = "End time must be after start time";
    }
    // Check duration (2-8 hours)
    else {
      const duration = endTotal - startTotal;
      if (duration < 60) {
        newErrors.time = "Event must be at least 1 hour long";
      } else if (duration > 480) {
        newErrors.time = "Event cannot exceed 8 hours";
      }
    }

    return newErrors;
  };

  const tomorrow = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  })();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const timeErrors = validateTimes();
    if (Object.keys(timeErrors).length > 0) {
      setErrors(timeErrors);
      return;
    }

    setLoading(true);

    let inputData = { ...formData };

    // if there’s an image to upload, do it first and merge it into inputData
    if (selectedImage) {
      const imageUrl = await uploadImageToCloudinary(selectedImage);
      console.log("Image URL:", imageUrl);
      if (!imageUrl) {
        console.error("Image upload failed");
        setFailed(true);
        return;
      }
      inputData.image = imageUrl;
    }

    console.log("Pass: ", inputData.pass);

    inputData = {
      ...inputData,
      date: formatDateForDisplay(inputData.date),
      startTime: formatTimeWithAMPM(inputData.startTime),
      endTime: formatTimeWithAMPM(inputData.endTime),
      capacity: parseInt(inputData.capacity),
    };

    console.log("Image URL in inputData:", inputData.image);

    const method = isEditMode ? "PUT" : "POST";
    const endpoint = isEditMode ? `/api/events/${event.id}` : "/api/events";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      const newEventData = await res.json();

      if (isEditMode) {
        console.log("Event updated successfully!", newEventData);
      }

      setSuccess(true);
    } catch (error) {
      console.error("Event Save Error: ", error);
      setFailed(true);
    } finally {
      setLoading(false);
      setTimeout(() => {
        navigate(isEditMode ? `/events/${event.id}` : "/events");
      }, 2500); // Redirect after 2.5 seconds
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
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
            Event {isEditMode ? "Updated" : "Submitted"} Successfully!
          </h4>
          <p className="text-muted mb-0">
            Your event has been {isEditMode ? "updated" : "submitted"}. You will
            be redirected shortly.
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
          <h4 className="text-danger fw-bold mb-2">
            Event {isEditMode ? "Update" : "Submit"} Failed!
          </h4>
          <p className="text-muted mb-0">You will be redirected shortly.</p>
        </div>
      </div>
    );
  }

  const startTimeOptions = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ];

  const endTimeOptions = [
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
  ];

  return (
    <Row className="justify-content-center">
      <Col xs={12} sm={12} md={8} lg={6} className="px-0">
        <section className="container py-5 px-4">
          <div className="form-container">
            <Card className="shadow border-0 rounded-3">
              <Card.Body className="p-4 p-md-5">
                <Form onSubmit={handleSubmit}>
                  {/* Contact Info */}
                  <div className="mb-4">
                    <h4 className="fw-bold mb-4">Contact Information</h4>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Label className="fw-medium">
                          Your Name <span className="text-danger">*</span>
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="bg-white border-end-0">
                            <Person className="text-muted" />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={isEditMode}
                            style={{
                              cursor: isEditMode ? "not-allowed" : "auto",
                            }}
                            required
                          />
                        </InputGroup>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Label className="fw-medium">
                          Your Email <span className="text-danger">*</span>
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="bg-white border-end-0">
                            <Envelope className="text-muted" />
                          </InputGroup.Text>
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isEditMode}
                            style={{
                              cursor: isEditMode ? "not-allowed" : "auto",
                            }}
                            required
                          />
                        </InputGroup>
                      </Col>
                      {!isEditMode && <Col md={6} className="mb-3">
                        <Form.Label className="fw-medium">
                          Password <span className="text-danger">*</span>
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="bg-white border-end-0">
                            <Envelope className="text-muted" />
                          </InputGroup.Text>
                          <Form.Control
                            type="password"
                            name="pass"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                        </InputGroup>
                      </Col>}
                    </Row>
                  </div>
                  {/* Event Details */}
                  <div className="mb-4">
                    <h4 className="fw-bold mb-4">Event Details</h4>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">
                        Event Title <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-white border-end-0">
                          <CardText className="text-muted" />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="title"
                          placeholder="Enter event title"
                          value={formData.title}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">
                        Event Description <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Provide event details..."
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-medium">
                        Event Image
                        {/* <span className="text-danger">*</span> */}
                      </Form.Label>
                      <div
                        className="border-secondary-subtle border-2 rounded p-4 text-center bg-light"
                        style={{ cursor: "pointer", borderStyle: "dashed" }}
                      >
                        <Form.Label
                          htmlFor="image-upload"
                          className="w-100 mb-0"
                          style={{ cursor: "pointer" }}
                        >
                          <Upload className="mb-2" size={32} color="#6c757d" />
                          <div className="text-muted small">
                            Click to upload an image
                          </div>
                          <div className="text-muted small">
                            PNG, JPG or JPEG (MAX. 5MB)
                          </div>
                          {selectedImage && (
                            <div className="text-primary mt-2 small fw-semibold">
                              Image Selected: {selectedImage.name}
                            </div>
                          )}
                        </Form.Label>
                        <Form.Control
                          id="image-upload"
                          type="file"
                          className="d-none"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </div>
                    </Form.Group>

                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Label className="fw-medium">
                          Event Organizer <span className="text-danger">*</span>
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="bg-white border-end-0">
                            <Building className="text-muted" />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            name="organizer"
                            value={formData.organizer}
                            onChange={handleChange}
                            placeholder="e.g., Career Services Center"
                            required
                          />
                        </InputGroup>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Label className="fw-medium">
                          Event Type <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select type</option>
                          {[
                            "Workshop",
                            "Seminar",
                            "Social",
                            "Academic",
                            "Sports",
                          ].map((cap) => (
                            <option key={cap} value={cap}>
                              {cap}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Label className="fw-medium">
                          Event Capacity <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                          name="capacity"
                          value={formData.capacity}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select capacity</option>
                          {[10, 25, 50, 100, 200, 500, 501].map((cap) => (
                            <option key={cap} value={cap}>
                              {cap === 501
                                ? `More than 500 people`
                                : `Up to ${cap} people`}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Label className="fw-medium">
                          Event Date <span className="text-danger">*</span>
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="bg-white border-end-0">
                            <Calendar3 className="text-muted" />
                          </InputGroup.Text>
                          <Form.Control
                            type="date"
                            name="date"
                            min={tomorrow}
                            value={formData.date}
                            onChange={handleChange}
                            required
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Label className="fw-medium">
                          Event Start Time{" "}
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                          name="startTime"
                          value={formData.startTime}
                          onChange={handleChange}
                          required
                        >
                          <option>Select time</option>
                          {startTimeOptions.map((time) => (
                            <option key={time} value={time}>
                              {formatTimeWithAMPM(time)}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Label className="fw-medium">
                          Event End Time <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                          name="endTime"
                          value={formData.endTime}
                          onChange={handleChange}
                          required
                        >
                          <option>Select time</option>
                          {endTimeOptions.map((time) => (
                            <option key={time} value={time}>
                              {formatTimeWithAMPM(time)}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">
                        Location / Venue <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-white border-end-0">
                          <GeoAlt className="text-muted" />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="e.g., Room 204, Science Block"
                          required
                        />
                      </InputGroup>
                    </Form.Group>
                  </div>
                  {errors.time && (
                    <div className="alert alert-danger py-2 mb-4">
                      {errors.time}
                    </div>
                  )}
                  <Button type="submit" className="w-100 py-2 fw-semibold fs-6">
                    {isEditMode ? "Update" : "Submit"} Event
                  </Button>
                  <p className="text-center text-muted small mb-0 mt-3">
                    By submitting this form, you agree to our{" "}
                    <a href="#" className="text-decoration-none">
                      terms and conditions
                    </a>
                    .
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </section>
      </Col>
    </Row>
  );
};

export default EventForm;
