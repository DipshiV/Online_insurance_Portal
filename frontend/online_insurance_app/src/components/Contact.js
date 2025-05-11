import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
const Contact = () => {
  const navigate=useNavigate();
  const purple = "#6f42c1";
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5800/api/contact', formData); // Update the URL to your backend
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to send message.');
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingTop: '60px' }}>
      <Container>
        <Row className="justify-content-center mb-5">
          <Col md={8} className="text-center">
            <h2 className="mb-3 fw-bold">Contact Us</h2>
            <p className="text-muted fs-5">
              We're here to assist you with your insurance needs. Fill out the form and we'll get back to you shortly.
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={7}>
            <Card className="p-4 shadow rounded-4 border-0">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label className="fw-semibold">Full Name</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label className="fw-semibold">Email Address</Form.Label>
                  <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your email address" />
                </Form.Group>

                <Form.Group controlId="subject" className="mb-3">
                  <Form.Label className="fw-semibold">Subject</Form.Label>
                  <Form.Control type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject of your message" />
                </Form.Group>

                <Form.Group controlId="message" className="mb-4">
                  <Form.Label className="fw-semibold">Message</Form.Label>
                  <Form.Control as="textarea" rows={5} name="message" value={formData.message} onChange={handleChange} placeholder="Write your message here..." />
                </Form.Group>

                <div className="text-center">
                  <Button type="submit" className="px-5 py-2 rounded-pill" style={{ backgroundColor: purple, border: "none" }}>
                    Send Message
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>

        {/* Contact Info */}
        <Row className="justify-content-center mt-5 text-center">
          <Col md={4} className="mb-4">
            <FaPhoneAlt className="mb-2 fs-4" style={{ color: purple }} />
            <h6 className="fw-bold">Phone</h6>
            <p className="text-muted">+91 98765 43210</p>
          </Col>
          <Col md={4} className="mb-4">
            <FaEnvelope className="mb-2 fs-4" style={{ color: purple }} />
            <h6 className="fw-bold">Email</h6>
            <p className="text-muted">support@onlineinsurance.com</p>
          </Col>
          <Col md={4} className="mb-4">
            <FaMapMarkerAlt className="mb-2 fs-4" style={{ color: purple }} />
            <h6 className="fw-bold">Address</h6>
            <p className="text-muted">2nd Floor, ABC Tower, Mumbai, India</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
