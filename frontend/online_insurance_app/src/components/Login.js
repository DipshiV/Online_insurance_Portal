import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, Row, Col, Button, Card, Form as BootstrapForm } from "react-bootstrap";
import * as Yup from "yup";
import axios from "axios";
import "./Login.css";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required").min(6, "Minimum 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://localhost:5800/api/login", values);
      console.log('res',response)

      // Save token and role to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("name", response.data.fullname);
      

      // Redirect to respective dashboard
      if (response.data.role === "admin") {
        navigate("/admin-dashboard");
      } else if (response.data.role === "user") {
        navigate("/user-dashboard");
      } else {
        console.error("Unknown role received");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Login failed. Check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container fluid className="login-page">
      <Row className="vh-100">
        {/* LEFT SECTION */}
        <Col md={6} className="left-panel d-none d-md-flex align-items-center justify-content-center">
          <div className="text-center text-white px-4">
            <h1 className="mb-3">Welcome Back</h1>
            <p className="mb-0">Access your insurance account, manage policies and more.</p>
          </div>
        </Col>

        {/* RIGHT SECTION (FORM) */}
        <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
          <Card className="p-4 shadow login-card" style={{ width: "100%", maxWidth: "400px" }}>
            <Card.Body>
              <h3 className="text-center mb-4">Login</h3>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <BootstrapForm.Group className="mb-3">
                      <BootstrapForm.Label>Email</BootstrapForm.Label>
                      <Field
                        name="email"
                        type="email"
                        as={BootstrapForm.Control}
                        placeholder="Enter email"
                      />
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </BootstrapForm.Group>

                    <BootstrapForm.Group className="mb-3">
                      <BootstrapForm.Label>Password</BootstrapForm.Label>
                      <Field
                        name="password"
                        type="password"
                        as={BootstrapForm.Control}
                        placeholder="Enter password"
                      />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </BootstrapForm.Group>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-100"
                      style={{ backgroundColor: "#6f42c1", border: "none" }}
                    >
                      {isSubmitting ? "Logging in..." : "Login"}
                    </Button>

                    <div className="mt-3 text-center">
                      <span>Don't have an account? </span>
                      <a href="/signup" style={{ color: '#6f42c1', textDecoration: 'none', fontWeight: 'bold' }}>Sign Up</a>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
