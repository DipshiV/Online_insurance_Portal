import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';

const MyAppliedPolicies = () => {
  const [appliedPolicies, setAppliedPolicies] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:5800/api/customer/my-applied-policies', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAppliedPolicies(data.appliedPolicies))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">My Applied Policies</h2>
      <Row>
        {appliedPolicies.length > 0 ? (
          <Col xs={12}>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Policy Name</th>
                  <th>Premium Amount</th>
                  <th>Applied On</th>
                </tr>
              </thead>
              <tbody>
                {appliedPolicies.map((policy, index) => (
                  <tr key={index}>
                    <td>{policy.policy_name}</td>
                    <td>₹{policy.premium_amount}</td>
                    <td>{new Date(policy.applied_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        ) : (
          <Col xs={12}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>No Policies Applied</Card.Title>
                <Card.Text>
                  You haven't applied for any policies yet. Please browse and apply for a policy.
                </Card.Text>
                <Button variant="primary" href="/browse-policies">
                  Browse Policies
                </Button>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default MyAppliedPolicies;
