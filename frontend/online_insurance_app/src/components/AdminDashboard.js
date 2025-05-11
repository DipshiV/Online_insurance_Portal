import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar.js";
import './Dashboard.css';
import AdminContactMessages from "./AdminContactMessages.js";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('name');

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <Container className="mt-4">
        <h2 className="text-center mb-4 text-purple">Welcome, {name}</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 shadow">
              <Card.Body className="text-center">
                <Card.Title>Manage Users</Card.Title>
                <Button variant="outline-primary custom-button" onClick={() => handleNavigation("/manage-users")}>
                  Go
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow">
              <Card.Body className="text-center">
                <Card.Title>Manage Policies</Card.Title>
                <Button variant="outline-primary custom-button" onClick={() => handleNavigation("/manage-policies")}>
                  Manage
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow">
              <Card.Body className="text-center">
                <Card.Title>View Customer Messages</Card.Title>
                <Button variant="outline-primary custom-button" onClick={() => handleNavigation("/admin/contact-messages")}>
                  View
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;
