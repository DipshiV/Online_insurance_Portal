import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.js";
import './Dashboard.css'; // Ensure this is imported correctly

const Dashboard = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('name');


  const handleLogout = () => {
    localStorage.removeItem("token"); // assuming token is stored here
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="d-flex">
        <Sidebar />

        {/* Main Dashboard Content */}
        <Container className="mt-4">
          <h2 className="welcome-text text-center mb-4">Welcome, {name}</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 shadow">
                <Card.Body className="text-center">
                  <Card.Title>Applied Policy</Card.Title>
                  <Button className="custom-button" onClick={() => handleNavigation("/apply-policy")}>
                    Go
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow">
                <Card.Body className="text-center">
                  <Card.Title>View & Apply Policies</Card.Title>
                  <Button className="custom-button" onClick={() => handleNavigation("/view-policies")}>
                    View
                  </Button>
                </Card.Body>
              </Card>
            </Col>

         {/*   <Col md={4}>
              <Card className="h-100 shadow">
                <Card.Body className="text-center">
                  <Card.Title>Make Payment</Card.Title>
                  <Button className="custom-button" onClick={() => handleNavigation("/payment")}>
                    Pay
                  </Button>
                </Card.Body>
              </Card>
            </Col>*/}

            <Col md={4}>
              <Card className="h-100 shadow">
                <Card.Body className="text-center">
                  <Card.Title>About Us</Card.Title>
                  <Button className="custom-button" onClick={() => handleNavigation("/about")}>
                    Know More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
