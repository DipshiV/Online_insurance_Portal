import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPolicyForm = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    policyName: '',
    description: '',
    coverageAmount: '',
    premiumAmount: '',
  });

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5800/api/admin/add-policy',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Policy added successfully!');
      setFormData({
        policyName: '',
        description: '',
        coverageAmount: '',
        premiumAmount: '',
      });
      navigate('/admin-dashboard');
    
    } catch (error) {
      alert(
        error.response?.data?.error || 'Error while adding policy'
      );
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-lg">
            <h3 className="text-center mb-4">Add New Policy</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="policyName">
                <Form.Label>Policy Name</Form.Label>
                <Form.Control
                  type="text"
                  name="policyName"
                  value={formData.policyName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="coverageAmount">
                <Form.Label>Coverage Amount (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="coverageAmount"
                  value={formData.coverageAmount}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="premiumAmount">
                <Form.Label>Premium Amount (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="premiumAmount"
                  value={formData.premiumAmount}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button variant="primary" type="submit">
                  Add Policy
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPolicyForm;
